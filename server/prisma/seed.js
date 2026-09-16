import bcrypt from 'bcryptjs';
import prisma from '../src/lib/prisma.js';

async function main() {
  console.log('🌱 Starting Bengali database seed for ShramikID...');

  // Clean existing records
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.training.deleteMany();
  await prisma.workExperience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.workerProfile.deleteMany();
  await prisma.employerProfile.deleteMany();
  await prisma.user.deleteMany();

  const defaultPassword = await bcrypt.hash('Worker@123', 10);
  const employerPassword = await bcrypt.hash('Employer@123', 10);
  const adminPassword = await bcrypt.hash('Admin@123', 10);

  // 1. Create Admin
  const admin = await prisma.user.create({
    data: {
      id: 'SHR-A-2026-000001',
      role: 'admin',
      name: 'সেন্ট্রাল অ্যাডমিন',
      email: 'admin@shramikid.demo',
      passwordHash: adminPassword,
      verificationStatus: 'verified',
      profileCompletion: 100,
    },
  });
  console.log(`✅ Seeded Admin: ${admin.email}`);

  // 2. Create Employers
  const employer1 = await prisma.user.create({
    data: {
      id: 'SHR-E-2026-000101',
      role: 'employer',
      name: 'প্রকৌশলী ফারহান চৌধুরী',
      email: 'abc@demo.shramikid.local',
      phone: '01811112233',
      passwordHash: employerPassword,
      verificationStatus: 'verified',
      profileCompletion: 95,
      employerProfile: {
        create: {
          companyName: 'এবিসি কনস্ট্রাকশন অ্যান্ড ডেভেলপমেন্ট লি.',
          businessType: 'প্রাইভেট লিমিটেড',
          industry: 'নির্মাণ ও সিভিল ইঞ্জিনিয়ারিং',
          tradeLicenseNo: 'TRAD/DSCC/019283/2024',
          division: 'Dhaka',
          district: 'Dhaka',
          upazila: 'Gulshan',
          address: 'বাড়ি ৪২, রোড ১১, বনানী, ঢাকা-১২১৩',
          website: 'https://abc-construction.demo',
          contactPerson: 'প্রকৌশলী ফারহান চৌধুরী',
          contactPhone: '01811112233',
          employeeCount: '৫০-১০০ জন',
          operationYears: 8,
        },
      },
    },
  });

  const employer2 = await prisma.user.create({
    data: {
      id: 'SHR-E-2026-000102',
      role: 'employer',
      name: 'তানভীর হাসান',
      email: 'meghna@demo.shramikid.local',
      phone: '01922334455',
      passwordHash: employerPassword,
      verificationStatus: 'verified',
      profileCompletion: 90,
      employerProfile: {
        create: {
          companyName: 'মেঘনা এগ্রো অ্যান্ড ইন্ডাস্ট্রিয়াল মিলস',
          businessType: 'কর্পোরেশন',
          industry: 'ম্যানুফ্যাকচারিং ও কৃষি শিল্প',
          tradeLicenseNo: 'TRAD/CCC/992811/2023',
          division: 'Chittagong',
          district: 'Chittagong',
          upazila: 'Pahartali',
          address: 'প্লট ১৮, বিসিক শিল্প নগরী, পাহাড়তলী, চট্টগ্রাম',
          website: 'https://meghna-mills.demo',
          contactPerson: 'তানভীর হাসান',
          contactPhone: '01922334455',
          employeeCount: '১০০+ জন',
          operationYears: 12,
        },
      },
    },
  });
  console.log(`✅ Seeded Employers: এবিসি কনস্ট্রাকশন, মেঘনা এগ্রো`);

  // 3. Create Workers
  const worker1 = await prisma.user.create({
    data: {
      id: 'SHR-W-2026-000201',
      role: 'worker',
      name: 'মো. রহিম উদ্দিন',
      email: 'rahim@demo.shramikid.local',
      phone: '01700000001',
      passwordHash: defaultPassword,
      verificationStatus: 'verified',
      profileCompletion: 90,
      workerProfile: {
        create: {
          nidNumber: '19892691234567890',
          dob: '1989-05-12',
          gender: 'male',
          division: 'Dhaka',
          district: 'Dhaka',
          upazila: 'Mirpur',
          village: 'সেকশন ১০',
          address: 'রোড ৪, ব্লক ডি, মিরপুর-১০, ঢাকা',
          occupation: 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
          experienceYears: 7,
          salaryExpected: 900,
          salaryType: 'daily',
          availability: 'immediately',
          bio: '৩-ফেজ ওয়্যারিং, জেনারেটর সার্ভিসিং ও সোলার ইনভার্টার সেটআপে ৭+ বছরের অভিজ্ঞ সার্টিফাইড ইলেকট্রিশিয়ান।',
          rating: 4.9,
          totalReviews: 28,
          totalJobsCompleted: 45,
          skills: {
            create: [
              { name: '৩-ফেজ ইন্ডাস্ট্রিয়াল ওয়্যারিং', proficiency: 'expert', isVerified: true },
              { name: 'সার্কিট ব্রেকার ও ডিবি বোর্ড সেটআপ', proficiency: 'expert', isVerified: true },
              { name: 'সোলার ইনভার্টার স্থাপন', proficiency: 'intermediate', isVerified: true },
              { name: 'এইচভিএসি কন্ট্রোল ট্রাবলশুটিং', proficiency: 'intermediate', isVerified: false },
            ],
          },
          workExperiences: {
            create: [
              {
                companyName: 'বেক্সিমকো ইন্ডাস্ট্রিয়াল পার্ক',
                role: 'মেইনটেন্যান্স ইলেকট্রিশিয়ান',
                location: 'Gazipur',
                startDate: '2021-01',
                endDate: '2024-03',
                description: 'শিফট ইলেকট্রিক্যাল মেইনটেন্যান্স ও মোটর রিওয়াইন্ডিং তত্ত্বাবধান।',
              },
            ],
          },
          trainings: {
            create: [
              {
                title: 'ন্যাশনাল স্কিল স্ট্যান্ডার্ড বেসিক (এনএসএসবি) - ইলেকট্রিক্যাল',
                institute: 'বিটিইবি / ঢাকা পলিটেকনিক ইনস্টিটিউট',
                year: '২০১৯',
                duration: '৬ মাস',
                isVerified: true,
              },
            ],
          },
        },
      },
    },
  });

  const worker2 = await prisma.user.create({
    data: {
      id: 'SHR-W-2026-000202',
      role: 'worker',
      name: 'করিমা বেগম',
      email: 'karima@demo.shramikid.local',
      phone: '01700000002',
      passwordHash: defaultPassword,
      verificationStatus: 'verified',
      profileCompletion: 85,
      workerProfile: {
        create: {
          nidNumber: '19932691234567891',
          dob: '1993-08-20',
          gender: 'female',
          division: 'Chittagong',
          district: 'Chittagong',
          upazila: 'Agrabad',
          village: 'চৌধুরী পাড়া',
          address: 'বাড়ি ১২, আগ্রাবাদ এক্সেস রোড, চট্টগ্রাম',
          occupation: 'মাস্টার টেইলার ও প্যাটার্ন মেকার',
          experienceYears: 5,
          salaryExpected: 800,
          salaryType: 'daily',
          availability: 'immediately',
          bio: 'প্যাটার্ন কাটিং, ইন্ডাস্ট্রিয়াল ওভারলক/ফ্ল্যাটলক মেশিন ও এক্সপোর্ট কোয়ালিটি পোশাকে ৫ বছরের বাস্তব অভিজ্ঞতা।',
          rating: 4.8,
          totalReviews: 19,
          totalJobsCompleted: 34,
          skills: {
            create: [
              { name: 'ইন্ডাস্ট্রিয়াল প্যাটার্ন কাটিং', proficiency: 'expert', isVerified: true },
              { name: 'ওভারলক ও ফ্ল্যাটলক মেশিন চালনা', proficiency: 'expert', isVerified: true },
              { name: 'কোয়ালিটি কন্ট্রোল ও ফিনিশিং', proficiency: 'intermediate', isVerified: true },
            ],
          },
        },
      },
    },
  });

  const worker3 = await prisma.user.create({
    data: {
      id: 'SHR-W-2026-000203',
      role: 'worker',
      name: 'আবুল হোসেন',
      email: 'abul@demo.shramikid.local',
      phone: '01700000003',
      passwordHash: defaultPassword,
      verificationStatus: 'pending', // Pending verification for admin queue testing
      profileCompletion: 70,
      workerProfile: {
        create: {
          nidNumber: '19852691234567892',
          dob: '1985-02-14',
          gender: 'male',
          division: 'Sylhet',
          district: 'Sylhet',
          upazila: 'Kotwali',
          village: 'জিন্দাবাজার',
          address: 'স্টেশন রোড, জিন্দাবাজার, সিলেট',
          occupation: 'স্যানিটারি ও পাইপ ফিটিং মিস্ত্রি',
          experienceYears: 6,
          salaryExpected: 750,
          salaryType: 'daily',
          availability: 'within-week',
          bio: 'পিভিসি/সিপিভিসি পাইপ ফিটিং, সাবমার্সিবল পাম্প ইনস্টলেশন ও আন্ডারগ্রাউন্ড ড্রেনেজ লেআউট তৈরিতে দক্ষ।',
          rating: 4.7,
          totalReviews: 12,
          totalJobsCompleted: 22,
          skills: {
            create: [
              { name: 'পিপিআর ও সিপিভিসি পাইপ ফিটিং', proficiency: 'expert', isVerified: false },
              { name: 'সাবমার্সিবল পাম্প সংযোগ', proficiency: 'intermediate', isVerified: false },
              { name: 'স্যানিটারি লিকেজ ডায়াগনস্টিক', proficiency: 'expert', isVerified: false },
            ],
          },
        },
      },
    },
  });
  console.log(`✅ Seeded Workers: রহিম উদ্দিন, করিমা বেগম, আবুল হোসেন`);

  // 4. Seed Jobs in 100% Native Bengali
  const job1 = await prisma.job.create({
    data: {
      employerId: employer1.id,
      title: 'বাণিজ্যিক ভবনের জন্য সিনিয়র ইলেকট্রিশিয়ান আবশ্যক',
      category: 'Electrical & Electronics',
      description: '১৪ তলা বাণিজ্যিক ভবনের জন্য সাবস্টেশন সংযোগ, বাসবার ট্রাঙ্কিং ও ফ্লোরভিত্তিক ডিস্ট্রিবিউশন বোর্ড ওয়্যারিং করার জন্য ২ জন দক্ষ সিনিয়র ইলেকট্রিশিয়ান প্রয়োজন।',
      requirements: 'ন্যূনতম ৫ বছরের বাস্তব কাজের অভিজ্ঞতা থাকতে হবে। সেফটি প্রটোকল ও ইলেকট্রিক্যাল সার্কিট ডায়াগ্রাম বোঝার সক্ষমতা বাধ্যতামূলক।',
      vacancies: 2,
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Gulshan',
      address: 'গুলশান অ্যাভিনিউ, ঢাকা',
      salaryMin: 900,
      salaryMax: 1200,
      salaryType: 'daily',
      employmentType: 'contract',
      status: 'active',
      deadline: '2026-10-15',
    },
  });

  const job2 = await prisma.job.create({
    data: {
      employerId: employer1.id,
      title: 'অভিজ্ঞ সিভিল রাজমিস্ত্রি ও প্রিমিয়াম টাইলস ফিটিং স্পেশালিস্ট',
      category: 'Construction & Masonry',
      description: 'উত্তরায় রেসিডেন্সিয়াল প্রজেক্টে ইতালিয়ান মার্বেল টাইলস বসানো, ব্রিকওয়ার্ক ফিনিশিং ও প্লাস্টারিং কাজের জন্য ৪ জন অভিজ্ঞ রাজমিস্ত্রি প্রয়োজন।',
      requirements: 'লেজার লেভেল ব্যবহারের অভিজ্ঞতা সম্পন্নদের অগ্রাধিকার দেওয়া হবে। প্রজেক্ট সাইটে সকল উন্নত সরঞ্জাম সরবরাহ করা হবে।',
      vacancies: 4,
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Uttara',
      address: 'সেক্টর ৭, উত্তরা, ঢাকা',
      salaryMin: 800,
      salaryMax: 1000,
      salaryType: 'daily',
      employmentType: 'daily',
      status: 'active',
      deadline: '2026-10-01',
    },
  });

  const job3 = await prisma.job.create({
    data: {
      employerId: employer2.id,
      title: 'রপ্তানিমুখী পোশাক কারখানায় মাস্টার টেইলার ও স্যাম্পল মেকার',
      category: 'Tailoring & Garments',
      description: 'বিসিক শিল্প নগরীতে অবস্থিত শতভাগ রপ্তানিমুখী নিটওয়্যার কারখানার জন্য দক্ষ স্যাম্পল মেকার ও মাস্টার টেইলার আবশ্যক।',
      requirements: 'প্যাটার্ন অনুযায়ী নিখুঁত ও দ্রুত সেলাই করার দক্ষতা। ইউরোপিয়ান সাইজিং চার্ট বোঝার জ্ঞান থাকতে হবে।',
      vacancies: 3,
      division: 'Chittagong',
      district: 'Chittagong',
      upazila: 'Pahartali',
      address: 'বিসিক গার্মেন্টস কমপ্লেক্স, পাহাড়তলী, চট্টগ্রাম',
      salaryMin: 22000,
      salaryMax: 28000,
      salaryType: 'monthly',
      employmentType: 'full-time',
      status: 'active',
      deadline: '2026-09-30',
    },
  });

  const job4 = await prisma.job.create({
    data: {
      employerId: employer2.id,
      title: 'হেভি ট্রাক ও কন্টেইনার ক্রেন ড্রাইভার / অপারেটর',
      category: 'Transport & Driving',
      description: 'চট্টগ্রাম বন্দর থেকে ডিপো পর্যন্ত কন্টেইনার পরিবহনের জন্য বিআরটিএ পেশাদার ড্রাইভিং লাইসেন্সধারী হেভি ভেহিকেল ড্রাইভার ও ক্রেন অপারেটর আবশ্যক।',
      requirements: 'ক্লিন ড্রাইভিং রেকর্ড এবং ন্যূনতম ৪ বছরের হেভি যান চালনার বাস্তব অভিজ্ঞতা থাকতে হবে।',
      vacancies: 2,
      division: 'Chittagong',
      district: 'Chittagong',
      upazila: 'Bandar',
      address: 'পোর্ট এক্সেস রোড, বন্দর, চট্টগ্রাম',
      salaryMin: 25000,
      salaryMax: 32000,
      salaryType: 'monthly',
      employmentType: 'full-time',
      status: 'active',
      deadline: '2026-10-10',
    },
  });
  console.log(`✅ Seeded Jobs: 4 realistic Bangla job postings`);

  // 5. Seed Applications
  await prisma.application.create({
    data: {
      jobId: job1.id,
      workerId: worker1.id,
      expectedSalary: 950,
      coverNote: 'বাণিজ্যিক ভবনের ৩-ফেজ ইলেকট্রিক্যাল লাইনে আমার ৭ বছরের অভিজ্ঞতা রয়েছে। আমি অবিলম্বে কাজে যোগদানে প্রস্তুত।',
      status: 'shortlisted',
    },
  });

  await prisma.application.create({
    data: {
      jobId: job3.id,
      workerId: worker2.id,
      expectedSalary: 25000,
      coverNote: 'সিইপিজেড গার্মেন্টসে স্যাম্পল মেকার হিসেবে কাজের দীর্ঘ অভিজ্ঞতা রয়েছে। দ্রুত ও নিখুঁত প্যাটার্ন কাটিংয়ে পারদর্শী।',
      status: 'accepted',
    },
  });
  console.log(`✅ Seeded Sample Applications`);

  // 6. Seed Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: worker1.id,
        title: 'আবেদন বাছাইকৃত (শর্টলিস্টেড)',
        message: 'এবিসি কনস্ট্রাকশন আপনার "সিনিয়র ইলেকট্রিশিয়ান" পদের আবেদন শর্টলিস্ট করেছে।',
        type: 'application',
        link: '/worker/applications',
      },
      {
        userId: admin.id,
        title: 'নতুন ভেরিফিকেশন অনুরোধ',
        message: 'শ্রমিক আবুল হোসেন এনআইডি ভেরিফিকেশনের জন্য নথি জমা দিয়েছেন।',
        type: 'warning',
        link: '/admin/workers',
      },
    ],
  });
  console.log(`✅ Seeded Notifications`);

  console.log('🎉 Bengali database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
