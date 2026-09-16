import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import {
  issueOtp,
  verifyOtpCode,
  isPhoneVerified,
  consumePhoneVerification,
  normalizeBdPhone,
  toBanglaNumeral,
} from '../services/sms.service.js';

const JWT_SECRET = process.env.JWT_SECRET || 'shramikid_super_secret_jwt_key_2026_bd_secure_token';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate unique formatted ID: e.g. SHR-W-2026-001234
 */
const generateId = (role) => {
  const prefix = role === 'worker' ? 'W' : role === 'employer' ? 'E' : 'A';
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `SHR-${prefix}-${year}-${random}`;
};

/**
 * Sign JWT token with userId and role
 */
const signToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Login handler supporting Email or Phone with Password
 */
export const login = async (req, res) => {
  try {
    const { email, phone, password, role } = req.body;
    let identifier = (email || phone || '').trim();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'অনুগ্রহ করে ইমেইল/ফোন নম্বর এবং পাসওয়ার্ড প্রদান করুন।',
      });
    }

    // Try normalizing phone if identifier looks like a phone number
    const normalizedPhone = normalizeBdPhone(identifier);

    // Find user by either email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
          ...(normalizedPhone ? [{ phone: normalizedPhone }] : []),
        ],
      },
      include: {
        workerProfile: {
          include: {
            skills: true,
            workExperiences: true,
            trainings: true,
          },
        },
        employerProfile: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'ভুল তথ্য। এই ইমেইল বা ফোন নম্বরে কোনো অ্যাকাউন্ট পাওয়া যায়নি।',
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'পাসওয়ার্ডটি সঠিক নয়। অনুগ্রহ করে পুনরায় চেষ্টা করুন।',
      });
    }

    // Optional role validation check if requested
    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `অ্যাকাউন্টটি '${user.role}' হিসেবে নিবন্ধিত, '${role}' হিসেবে নয়।`,
      });
    }

    const token = signToken(user.id, user.role);
    const { passwordHash, ...sanitizedUser } = user;

    return res.status(200).json({
      success: true,
      message: 'লগইন সফল হয়েছে',
      token,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'লগইন করতে অভ্যন্তরীণ ত্রুটি হয়েছে।',
      error: error.message,
    });
  }
};

/**
 * Passwordless Login via Phone OTP
 */
export const loginOtp = async (req, res) => {
  try {
    const { phone, otp, role } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'মোবাইল নম্বর এবং ওটিপি (OTP) কোড আবশ্যক।',
      });
    }

    const normalizedPhone = normalizeBdPhone(phone);
    if (!normalizedPhone) {
      return res.status(400).json({
        success: false,
        message: 'সঠিক বাংলাদেশী মোবাইল নম্বর প্রদান করুন (যেমন: 017XXXXXXXX)।',
      });
    }

    // Verify submitted OTP
    const verification = verifyOtpCode(normalizedPhone, otp, 'LOGIN');
    if (!verification.success) {
      return res.status(400).json({
        success: false,
        message: verification.message,
      });
    }

    // Find User by Phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: normalizedPhone },
          { phone: phone.trim() },
        ],
      },
      include: {
        workerProfile: {
          include: {
            skills: true,
            workExperiences: true,
            trainings: true,
          },
        },
        employerProfile: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'এই মোবাইল নম্বরে কোনো নিবন্ধিত অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে আগে অ্যাকাউন্ট তৈরি করুন।',
      });
    }

    // Role check if requested
    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `এই অ্যাকাউন্টটি '${user.role}' হিসেবে নিবন্ধিত।`,
      });
    }

    // Consume OTP verification
    consumePhoneVerification(normalizedPhone);

    const token = signToken(user.id, user.role);
    const { passwordHash, ...sanitizedUser } = user;

    return res.status(200).json({
      success: true,
      message: 'ওটিপি যাচাই করে সফলভাবে লগইন করা হয়েছে।',
      token,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Login OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'ওটিপি লগইন প্রক্রিয়ায় সমস্যা হয়েছে।',
      error: error.message,
    });
  }
};

/**
 * Register a Worker with multi-step data
 */
export const registerWorker = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      otp,
      nidNumber,
      dob,
      gender,
      division,
      district,
      upazila,
      village,
      address,
      occupation,
      experienceYears,
      salaryExpected,
      salaryType,
      availability,
      bio,
      skills = [],
      experiences = [],
      trainings = [],
    } = req.body;

    if (!name || (!password && !otp) || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'নাম, যোগাযোগ নম্বর/ইমেইল এবং পাসওয়ার্ড অথবা ওটিপি প্রদান করুন।',
      });
    }

    const normalizedPhone = phone ? normalizeBdPhone(phone) : null;
    if (phone && !normalizedPhone) {
      return res.status(400).json({
        success: false,
        message: 'সঠিক বাংলাদেশী মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)।',
      });
    }

    // Optional direct OTP verification during registration if OTP code is passed
    if (normalizedPhone && otp) {
      const verification = verifyOtpCode(normalizedPhone, otp, 'REGISTRATION');
      if (!verification.success) {
        return res.status(400).json({
          success: false,
          message: verification.message,
        });
      }
    }

    // Check for existing user by email or normalized phone
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          ...(email ? [{ email: email.trim().toLowerCase() }] : []),
          ...(normalizedPhone ? [{ phone: normalizedPhone }] : []),
          ...(phone ? [{ phone: phone.trim() }] : []),
        ],
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'এই ইমেইল বা মোবাইল নম্বর দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট বিদ্যমান রয়েছে।',
      });
    }

    // Hash password (or generate random password if OTP passwordless registration)
    const effectivePassword = password || `Worker@${Math.floor(100000 + Math.random() * 900000)}`;
    const hashedPassword = await bcrypt.hash(effectivePassword, 10);
    const userId = generateId('worker');

    // Create user and profile in a transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: userId,
          role: 'worker',
          name: name.trim(),
          email: email ? email.trim().toLowerCase() : null,
          phone: normalizedPhone || phone || null,
          passwordHash: hashedPassword,
          verificationStatus: 'pending',
          profileCompletion: 80,
        },
      });

      const profile = await tx.workerProfile.create({
        data: {
          userId: user.id,
          nidNumber: nidNumber ? nidNumber.trim() : null,
          dob,
          gender,
          division,
          district,
          upazila,
          village,
          address,
          occupation: occupation || 'General Labor',
          experienceYears: Number(experienceYears) || 0,
          salaryExpected: salaryExpected ? Number(salaryExpected) : null,
          salaryType: salaryType || 'daily',
          availability: availability || 'immediately',
          bio,
        },
      });

      // Insert skills if provided
      if (skills && Array.isArray(skills) && skills.length > 0) {
        await tx.skill.createMany({
          data: skills.map((s) => ({
            workerProfileId: profile.id,
            name: typeof s === 'string' ? s : s.name,
            category: typeof s === 'object' ? s.category : null,
            proficiency: typeof s === 'object' ? s.proficiency || 'intermediate' : 'intermediate',
          })),
        });
      }

      // Insert work experiences
      if (experiences && Array.isArray(experiences) && experiences.length > 0) {
        await tx.workExperience.createMany({
          data: experiences.map((exp) => ({
            workerProfileId: profile.id,
            companyName: exp.companyName || exp.company || 'ক্লায়েন্ট কাজ',
            role: exp.role || exp.title || 'শ্রমিক',
            location: exp.location,
            startDate: exp.startDate,
            endDate: exp.endDate,
            description: exp.description,
          })),
        });
      }

      // Insert trainings
      if (trainings && Array.isArray(trainings) && trainings.length > 0) {
        await tx.training.createMany({
          data: trainings.map((t) => ({
            workerProfileId: profile.id,
            title: t.title || t.name,
            institute: t.institute || t.provider || 'টেকনিক্যাল ইনস্টিটিউট',
            year: t.year ? String(t.year) : null,
            duration: t.duration,
          })),
        });
      }

      return tx.user.findUnique({
        where: { id: user.id },
        include: {
          workerProfile: {
            include: {
              skills: true,
              workExperiences: true,
              trainings: true,
            },
          },
        },
      });
    });

    if (normalizedPhone) {
      consumePhoneVerification(normalizedPhone);
    }

    const token = signToken(newUser.id, newUser.role);
    const { passwordHash, ...sanitizedUser } = newUser;

    return res.status(201).json({
      success: true,
      message: 'শ্রমিক অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।',
      token,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Worker registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'শ্রমিক নিবন্ধন করতে ব্যর্থ হয়েছে।',
      error: error.message,
    });
  }
};

/**
 * Register an Employer
 */
export const registerEmployer = async (req, res) => {
  try {
    const {
      companyName,
      email,
      phone,
      password,
      businessType,
      industry,
      tradeLicenseNo,
      division,
      district,
      upazila,
      address,
      website,
      contactPerson,
      contactPhone,
      employeeCount,
      operationYears,
    } = req.body;

    if (!companyName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'প্রতিষ্ঠানের নাম, ইমেইল এবং পাসওয়ার্ড আবশ্যক।',
      });
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'এই ইমেইল ঠিকানা দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট খোলা হয়েছে।',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateId('employer');

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: userId,
          role: 'employer',
          name: contactPerson || companyName,
          email: email.trim().toLowerCase(),
          phone: phone || contactPhone || null,
          passwordHash: hashedPassword,
          verificationStatus: 'verified',
          profileCompletion: 85,
        },
      });

      await tx.employerProfile.create({
        data: {
          userId: user.id,
          companyName,
          businessType,
          industry,
          tradeLicenseNo,
          division,
          district,
          upazila,
          address,
          website,
          contactPerson,
          contactPhone: contactPhone || phone,
          employeeCount,
          operationYears: operationYears ? Number(operationYears) : 1,
        },
      });

      return tx.user.findUnique({
        where: { id: user.id },
        include: {
          employerProfile: true,
        },
      });
    });

    const token = signToken(newUser.id, newUser.role);
    const { passwordHash, ...sanitizedUser } = newUser;

    return res.status(201).json({
      success: true,
      message: 'নিয়োগকর্তা অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।',
      token,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Employer registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'নিয়োগকর্তা নিবন্ধন করতে সমস্যা হয়েছে।',
      error: error.message,
    });
  }
};

/**
 * Get current authenticated user details
 */
export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

/**
 * Update Profile
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, avatar, ...roleData } = req.body;

    const updatedUser = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          ...(name && { name }),
          ...(phone && { phone }),
          ...(avatar && { avatar }),
        },
      });

      if (req.user.role === 'worker') {
        await tx.workerProfile.upsert({
          where: { userId },
          create: {
            userId,
            ...roleData,
          },
          update: {
            ...roleData,
          },
        });
      } else if (req.user.role === 'employer') {
        await tx.employerProfile.upsert({
          where: { userId },
          create: {
            userId,
            companyName: roleData.companyName || name || 'Company',
            ...roleData,
          },
          update: {
            ...roleData,
          },
        });
      }

      return tx.user.findUnique({
        where: { id: userId },
        include: {
          workerProfile: {
            include: {
              skills: true,
              workExperiences: true,
              trainings: true,
            },
          },
          employerProfile: true,
        },
      });
    });

    const { passwordHash, ...sanitizedUser } = updatedUser;
    return res.status(200).json({
      success: true,
      message: 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে।',
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে।',
      error: error.message,
    });
  }
};

/**
 * Send OTP for Bangladeshi phone numbers (Supports REGISTRATION, LOGIN, VERIFICATION)
 */
export const sendOtp = async (req, res) => {
  try {
    const { phone, purpose = 'REGISTRATION' } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'মোবাইল নম্বর প্রদান করা আবশ্যক।',
      });
    }

    const normalizedPhone = normalizeBdPhone(phone);
    if (!normalizedPhone) {
      return res.status(400).json({
        success: false,
        message: 'সঠিক বাংলাদেশী ১১-সংখ্যার মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)।',
      });
    }

    // Business rule checks based on purpose
    if (purpose === 'REGISTRATION') {
      const existing = await prisma.user.findFirst({
        where: {
          OR: [
            { phone: normalizedPhone },
            { phone: phone.trim() },
          ],
        },
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'এই মোবাইল নম্বরটি দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট নিবন্ধিত রয়েছে। অনুগ্রহ করে সরাসরি লগইন করুন।',
        });
      }
    } else if (purpose === 'LOGIN') {
      const existing = await prisma.user.findFirst({
        where: {
          OR: [
            { phone: normalizedPhone },
            { phone: phone.trim() },
          ],
        },
      });
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: 'এই মোবাইল নম্বরে কোনো অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে প্রথমে অ্যাকাউন্ট তৈরি করুন।',
        });
      }
    }

    // Issue OTP via SMS Service
    const otpResult = await issueOtp(normalizedPhone, purpose);

    return res.status(200).json({
      success: true,
      message: `${normalizedPhone} নম্বরে ৬-সংখ্যার ওটিপি (OTP) পাঠানো হয়েছে। কোডটির মেয়াদ ৫ মিনিট।`,
      phone: normalizedPhone,
      purpose,
      expiresInSeconds: otpResult.expiresInSeconds,
      // For instant local development and live testing without SMS credits:
      demoOtp: otpResult.otpCode,
      gatewayProvider: otpResult.gateway?.provider || 'sandbox',
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(400).json({
      success: false,
      message: error.message || 'ওটিপি পাঠাতে সমস্যা হয়েছে।',
    });
  }
};

/**
 * Verify OTP Code handler
 */
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp, purpose = null } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'মোবাইল নম্বর এবং ওটিপি (OTP) কোড প্রদান করুন।',
      });
    }

    const normalizedPhone = normalizeBdPhone(phone);
    if (!normalizedPhone) {
      return res.status(400).json({
        success: false,
        message: 'সঠিক বাংলাদেশী মোবাইল নম্বর প্রদান করুন।',
      });
    }

    const result = verifyOtpCode(normalizedPhone, otp, purpose);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      phone: result.phone,
      verified: true,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'ওটিপি যাচাই করতে সমস্যা হয়েছে।',
      error: error.message,
    });
  }
};

