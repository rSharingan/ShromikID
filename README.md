# শ্রমিক আইডি (ShramikID) - ডিজিটাল ওয়ার্কার আইডেন্টিটি ও কর্মসংস্থান প্ল্যাটফর্ম

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

**শ্রমিক আইডি (ShramikID)** হলো বাংলাদেশের অসংগঠিত খাতের দক্ষ ও অপ্রাতিষ্ঠানিক শ্রমিকদের জন্য একটি জাতীয় ডিজিটাল আইডেন্টিটি, স্কিল পাসপোর্ট এবং যাচাইকৃত কর্মসংস্থান নেটওয়ার্ক।

---

## 🌟 মূল বৈশিষ্ট্যসমূহ (Core Features)

### ১. 👷 শ্রমিক পোর্টাল ও ডিজিটাল স্কিল পাসপোর্ট (Worker Portal & Skill Passport)
- **স্মার্ট কিউআর আইডি কার্ড:** কিউআর কোডসহ ডাউনলোডযোগ্য ও প্রিন্টযোগ্য অফিসিয়াল পরিচয়পত্র (`SHR-W-2026-XXXXX`)।
- **মোবাইল এসএমএস ওটিপি ভেরিফিকেশন:** রেজিস্ট্রেশন ও লগইন উভয় ক্ষেত্রে তাৎক্ষণিক ৬-সংখ্যার এসএমএস কোড যাচাই।
- **পাসওয়ার্ডলেস লগইন:** পাসওয়ার্ড মনে না রেখে সরাসরি মোবাইল নম্বর + OTP দিয়ে লগইন।
- **কাজের আবেদন ট্র্যাকিং:** লাইভ সার্কুলারে আবেদন, ইন্টারভিউ ট্র্যাকিং ও ক্লায়েন্ট রিভিউ।

### ২. 🏢 নিয়োগকর্তা ড্যাশবোর্ড (Employer Portal)
- **কাজের সার্কুলার পোস্ট:** পদবী, বিভাগ, মজুরি ও প্রয়োজনীয় যোগ্যতা দিয়ে লাইভ বিজ্ঞপ্তি প্রকাশ।
- **প্রার্থী শর্টলিস্টিং ও নিয়োগ অনুমোদন:** আবেদনকারীদের যাচাইকৃত স্কিল পাসপোর্ট পর্যালোচনা ও ১-ক্লিকে নিয়োগ অনুমোদন।
- **কর্মী ডিরেক্টরি থেকে সরাসরি কল ও অফার:** কর্মীদের সাথে সরাসরি ফোন কল (`tel:`), হোয়াটসঅ্যাপ চ্যাট ও ইনস্ট্যান্ট জব অফার প্রেরণ।

### ৩. 🛡️ অ্যাডমিন ও মডারেশন প্যানেল (Admin Panel)
- **এনআইডি যাচাইকরণ কিউ:** জাতীয় পরিচয়পত্র ও তথ্যাদি পর্যালোচনা করে ১-ক্লিকে অনুমোদন বা পূর্বাবস্থায় আনা (Undo)।
- **সার্কুলার ও কন্টেন্ট নিয়ন্ত্রণ:** আপত্তিকর সার্কুলার চিহ্নিত ও স্থায়ীভাবে মুছে ফেলার ক্ষমতা।
- **অ্যানালিটিক্স ও ডাটাবেজ এক্সপোর্ট:** জাতীয় শ্রমিক পরিসংখ্যান, ডিভিশনভিত্তিক ডেটা ও অফিসিয়াল পিডিএফ/সিএসভি রিপোর্ট ডাউনলোড।

---

## 🛠️ প্রযুক্তি কাঠামো (Tech Stack)

- **Frontend:** React 18, Vite, TailwindCSS, Lucide React (১০০% ইমোজি-মুক্ত প্রফেশনাল আইকন)।
- **Backend API:** Node.js, Express.js REST API, JWT Authentication, bcryptjs।
- **Database & ORM:** Prisma ORM, Local SQLite (`dev.db`) / Production PostgreSQL।
- **SMS Gateway:** Greenweb BD, BulkSMSBD, SSL Wireless & Built-in Dev Sandbox।

---

## 🚀 লোকাল সেটআপ ও ইনস্টলেশন (Quick Start)

### ১. রিপোজিটরি ক্লোন করুন
```bash
git clone https://github.com/rSharingan/ShromikID.git
cd ShromikID
```

### ২. ডিপেন্ডেন্সি ইনস্টল করুন
```bash
# রুট ফ্রন্টএন্ড প্যাকেজ
npm install

# ব্যাকএন্ড সার্ভার প্যাকেজ
npm --prefix server install
```

### ৩. ডাটাবেজ প্রিপারেশন ও সিডিং
```bash
# SQLite ডাটাবেজ সেটআপ ও ডেমো ডেটা সিডিং
npm run db:setup:sqlite
```

### ৪. পরিবেশ কনফিগারেশন (`server/.env`)
`server/.env.example` কপি করে `server/.env` তৈরি করুন:
```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="shramikid_super_secret_jwt_key_2026_bd_secure_token"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
SMS_GATEWAY_PROVIDER="sandbox" # অথবা "greenweb" বা "bulksmsbd"
```

### ৫. সার্ভার ও অ্যাপ্লিকেশন চালু করুন
```bash
# টার্মিনাল ১: ব্যাকএন্ড এপিআই সার্ভার (Port 5000)
npm run server

# টার্মিনাল ২: ফ্রন্টএন্ড ওয়েব অ্যাপ্লিকেশন (Port 5173)
npm run dev
```

ব্রাউজারে ওপেন করুন: `http://localhost:5173`

---

## 🔑 ডেমো লগইন ক্রেডেনশিয়ালস (Demo Accounts)

| ভূমিকা (Role) | লগইন পাথ | ইউজারনেম / মোবাইল | পাসওয়ার্ড |
| :--- | :--- | :--- | :--- |
| **১. নিবন্ধিত শ্রমিক (Worker)** | `/login` | `01700000001` / `rahim@demo.shramikid.local` | `Worker@123` (অথবা সরাসরি OTP) |
| **২. নিয়োগকর্তা (Employer)** | `/login` | `abc@demo.shramikid.local` | `Employer@123` |
| **৩. সিস্টেম অ্যাডমিন (Admin)** | `/admin/login` | `admin@shramikid.demo` | `Admin@123` |

---

## 📁 প্রজেক্ট ফোল্ডার স্ট্রাকচার

```
ShromikID/
├── server/                    # Node.js & Express REST Backend
│   ├── prisma/                # Prisma Schema & Database Seeds
│   │   ├── schema.prisma      # SQLite & PostgreSQL Schemas
│   │   └── seed.js            # Comprehensive BD Demo Data
│   └── src/
│       ├── controllers/       # Auth, Worker, Employer, Job, Admin Controllers
│       ├── middleware/        # JWT Authentication Middleware
│       ├── routes/            # REST API Route Declarations
│       └── services/          # Bangladeshi SMS Gateway & OTP Services
├── src/                       # React Frontend Application
│   ├── components/            # UI Components & Navigation
│   ├── contexts/              # Authentication State Management
│   ├── pages/                 # Worker, Employer, Admin, Public Pages
│   ├── services/              # API Communication Client
│   └── utils/                 # Bengali Formatters & Digit Converters
├── package.json
└── README.md
```

---

## 📄 লাইসেন্স (License)

এই প্রজেক্টটি **MIT License** এর অধীনে উন্মুক্ত।
