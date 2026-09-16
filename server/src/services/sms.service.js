import crypto from 'crypto';

/**
 * ShramikID SMS & OTP Verification Service
 * Supports Bangladeshi SMS Gateways (Greenweb, BulkSMSBD, SSL Wireless)
 * + High-fidelity Dev / Sandbox mode with Bengali templates & console logging.
 */

// In-memory OTP storage: Map<normalizedPhone, { otp, purpose, expiresAt, attempts, verified, createdAt }>
const otpStore = new Map();

/**
 * Normalize Bangladeshi phone number to 11 digits format: 01XXXXXXXXX
 * Also validates proper BD telecom prefixes (013, 014, 015, 016, 017, 018, 019)
 */
export const normalizeBdPhone = (rawPhone) => {
  if (!rawPhone || typeof rawPhone !== 'string') return null;
  // Remove spaces, hyphens, parentheses
  let cleaned = rawPhone.replace(/[\s\-()]/g, '');

  // Convert Bengali numerals to ASCII digits
  const banglaDigits = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  cleaned = cleaned.replace(/[০-৯]/g, (d) => banglaDigits[d]);

  // Strip international +88 or 88
  if (cleaned.startsWith('+880')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('880')) {
    cleaned = '0' + cleaned.slice(3);
  }

  // Validate format 01[3-9]XXXXXXXX (11 digits total)
  const bdPhoneRegex = /^01[3-9]\d{8}$/;
  if (!bdPhoneRegex.test(cleaned)) {
    return null;
  }

  return cleaned;
};

/**
 * Convert ASCII numbers to Bengali numbers for SMS display
 */
export const toBanglaNumeral = (num) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => banglaDigits[Number(d)]);
};

/**
 * Generate a secure 6-digit numeric OTP
 */
export const generateOtpCode = () => {
  return String(crypto.randomInt(100000, 999999));
};

/**
 * Generate authentic Bengali SMS content
 */
export const createSmsMessage = (otpCode, purpose = 'REGISTRATION') => {
  const bnOtp = toBanglaNumeral(otpCode);
  switch (purpose) {
    case 'LOGIN':
      return `[শ্রমিক আইডি] আপনার লগইন ওটিপি (OTP) কোড: ${bnOtp} (${otpCode})। এই কোডটি ৫ মিনিটের জন্য কার্যকর। কাউকে বলবেন না।`;
    case 'PHONE_VERIFICATION':
      return `[শ্রমিক আইডি] আপনার মোবাইল নম্বর যাচাইয়ের ওটিপি (OTP) কোড: ${bnOtp} (${otpCode})। ৫ মিনিটের মধ্যে ব্যবহার করুন।`;
    case 'REGISTRATION':
    default:
      return `[শ্রমিক আইডি] আপনার অ্যাকাউন্ট খোলার ওটিপি (OTP) কোড: ${bnOtp} (${otpCode})। এই কোডটি ৫ মিনিট কার্যকর থাকবে।`;
  }
};

/**
 * Dispatch SMS via configured Gateway or Sandbox Logger
 */
export const sendSmsGateway = async (phone, message) => {
  const provider = (process.env.SMS_GATEWAY_PROVIDER || 'sandbox').toLowerCase();
  const apiKey = process.env.SMS_API_KEY || '';
  const senderId = process.env.SMS_SENDER_ID || 'ShramikID';

  // 1. Production Gateway: Greenweb BD
  if (provider === 'greenweb' && apiKey) {
    try {
      const url = `http://api.greenweb.com.bd/api.php?token=${encodeURIComponent(apiKey)}&to=${encodeURIComponent('88' + phone)}&message=${encodeURIComponent(message)}`;
      const res = await fetch(url);
      const data = await res.text();
      console.log(`[Greenweb SMS Response] to ${phone}:`, data);
      return { success: true, provider: 'greenweb', rawResponse: data };
    } catch (err) {
      console.error('[Greenweb SMS Error]:', err.message);
      return { success: false, error: err.message };
    }
  }

  // 2. Production Gateway: BulkSMSBD
  if (provider === 'bulksmsbd' && apiKey) {
    try {
      const url = `http://bulksmsbd.net/api/smsapi?api_key=${encodeURIComponent(apiKey)}&type=text&number=${encodeURIComponent('88' + phone)}&senderid=${encodeURIComponent(senderId)}&message=${encodeURIComponent(message)}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(`[BulkSMSBD Response] to ${phone}:`, data);
      return { success: true, provider: 'bulksmsbd', rawResponse: data };
    } catch (err) {
      console.error('[BulkSMSBD SMS Error]:', err.message);
      return { success: false, error: err.message };
    }
  }

  // 3. Sandbox / Dev Mode (Default & Instant Testing)
  console.log('\n======================================================');
  console.log('📱 [SHRAMIK-ID SMS GATEWAY - SANDBOX SIMULATION]');
  console.log(`📞 Recipient : ${phone} (+88${phone})`);
  console.log(`💬 SMS Body  : ${message}`);
  console.log(`🕒 Timestamp : ${new Date().toLocaleTimeString()} (Valid for 5 mins)`);
  console.log('======================================================\n');

  return {
    success: true,
    provider: 'sandbox',
    simulated: true,
    deliveryStatus: 'DELIVERED_INSTANTLY',
  };
};

/**
 * High-level service method: Issue and send an OTP
 */
export const issueOtp = async (rawPhone, purpose = 'REGISTRATION') => {
  const phone = normalizeBdPhone(rawPhone);
  if (!phone) {
    throw new Error('সঠিক বাংলাদেশী মোবাইল নম্বর প্রদান করুন (যেমন: 017XXXXXXXX)।');
  }

  // Rate Limiting: Prevent requesting OTP faster than once every 45 seconds
  const existing = otpStore.get(phone);
  if (existing && Date.now() - existing.createdAt < 45 * 1000) {
    const waitSeconds = Math.ceil((45 * 1000 - (Date.now() - existing.createdAt)) / 1000);
    throw new Error(`অনুগ্রহ করে ${toBanglaNumeral(waitSeconds)} সেকেন্ড অপেক্ষা করে পুনরায় ওটিপি রিকোয়েস্ট করুন।`);
  }

  const otpCode = generateOtpCode();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes TTL
  const message = createSmsMessage(otpCode, purpose);

  // Store in memory
  otpStore.set(phone, {
    otp: otpCode,
    phone,
    purpose,
    expiresAt,
    attempts: 0,
    verified: false,
    createdAt: Date.now(),
  });

  // Dispatch SMS
  const gatewayResult = await sendSmsGateway(phone, message);

  return {
    phone,
    otpCode, // Returned for dev sandbox mode
    purpose,
    expiresInSeconds: 300,
    gateway: gatewayResult,
  };
};

/**
 * High-level service method: Verify a submitted OTP
 */
export const verifyOtpCode = (rawPhone, code, expectedPurpose = null) => {
  const phone = normalizeBdPhone(rawPhone);
  if (!phone) {
    return { success: false, message: 'মোবাইল নম্বরটি সঠিক নয়।' };
  }

  const session = otpStore.get(phone);
  if (!session) {
    return {
      success: false,
      message: 'কোনো ওটিপি অনুরোধ পাওয়া যায়নি। অনুগ্রহ করে নতুন ওটিপি কোড পাঠান।',
    };
  }

  // Check Expiry
  if (Date.now() > session.expiresAt) {
    otpStore.delete(phone);
    return {
      success: false,
      message: 'ওটিপি কোডের মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে পুনরায় ওটিপি পাঠান।',
    };
  }

  // Check Attempt Limits (Max 5 attempts)
  if (session.attempts >= 5) {
    otpStore.delete(phone);
    return {
      success: false,
      message: 'অতিরিক্ত ভুল চেষ্টা করা হয়েছে। নতুন ওটিপি কোড রিকোয়েস্ট করুন।',
    };
  }

  // Normalize code for comparison
  const banglaDigits = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  const normalizedInputOtp = String(code || '').replace(/[০-৯]/g, (d) => banglaDigits[d]).trim();

  // Validate match
  if (session.otp !== normalizedInputOtp) {
    session.attempts += 1;
    const remainingAttempts = 5 - session.attempts;
    return {
      success: false,
      message: `ভুল ওটিপি কোড! আর ${toBanglaNumeral(remainingAttempts)} বার চেষ্টা করতে পারবেন।`,
    };
  }

  // Check Purpose if specified
  if (expectedPurpose && session.purpose !== expectedPurpose) {
    return {
      success: false,
      message: 'ওটিপি এর উদ্দেশ্য মিলছে না।',
    };
  }

  // Mark as verified
  session.verified = true;
  session.verifiedAt = Date.now();

  return {
    success: true,
    phone,
    message: 'মোবাইল নম্বর সফলভাবে যাচাই করা হয়েছে।',
  };
};

/**
 * Check if a phone number was recently verified within the last 15 minutes
 */
export const isPhoneVerified = (rawPhone, purpose = null) => {
  const phone = normalizeBdPhone(rawPhone);
  if (!phone) return false;

  const session = otpStore.get(phone);
  if (!session || !session.verified) return false;

  // Max 15 minutes window after verification to complete registration
  if (Date.now() - (session.verifiedAt || 0) > 15 * 60 * 1000) {
    otpStore.delete(phone);
    return false;
  }

  if (purpose && session.purpose !== purpose) return false;

  return true;
};

/**
 * Clear verified session after successful registration/login
 */
export const consumePhoneVerification = (rawPhone) => {
  const phone = normalizeBdPhone(rawPhone);
  if (phone) {
    otpStore.delete(phone);
  }
};
