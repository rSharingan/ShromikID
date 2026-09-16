import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.join(__dirname, '..');
const prismaDir = path.join(serverRoot, 'prisma');

const targetProvider = (process.argv[2] || 'postgresql').toLowerCase();

console.log(`\n🔄 ShramikID Database Configuration Tool`);
console.log(`=========================================`);
console.log(`Target Database Provider: ${targetProvider.toUpperCase()}`);

if (targetProvider === 'postgresql' || targetProvider === 'postgres') {
  const pgSchema = path.join(prismaDir, 'schema.postgresql.prisma');
  const mainSchema = path.join(prismaDir, 'schema.prisma');

  if (fs.existsSync(pgSchema)) {
    fs.copyFileSync(pgSchema, mainSchema);
    console.log(`✅ Configured 'schema.prisma' with PostgreSQL provider & production indexes.`);
  }

  console.log(`\n📝 Next steps for PostgreSQL:`);
  console.log(`1. Ensure your PostgreSQL connection string is set in 'server/.env':`);
  console.log(`   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shramikid_db?schema=public"`);
  console.log(`   (Or your Cloud Supabase / Neon connection URL)`);
  console.log(`2. Push schema to PostgreSQL database:`);
  console.log(`   npm run prisma:push`);
  console.log(`3. Seed database with Bangladeshi workers & employers:`);
  console.log(`   npm run prisma:seed\n`);
} else if (targetProvider === 'sqlite') {
  const mainSchema = path.join(prismaDir, 'schema.prisma');
  const sqliteContent = `datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                 String            @id
  role               String            // 'worker' | 'employer' | 'admin'
  email              String?           @unique
  phone              String?           @unique
  passwordHash       String
  name               String
  avatar             String?
  verificationStatus String            @default("pending") // 'pending' | 'verified' | 'rejected'
  profileCompletion  Int               @default(30)
  createdAt          DateTime          @default(now())
  updatedAt          DateTime          @updatedAt

  workerProfile      WorkerProfile?
  employerProfile    EmployerProfile?
  applications       Application[]
  postedJobs         Job[]             @relation("EmployerJobs")
  notifications      Notification[]
  givenReviews       Review[]          @relation("GivenReviews")
  receivedReviews    Review[]          @relation("ReceivedReviews")
}

model WorkerProfile {
  id                 String            @id @default(cuid())
  userId             String            @unique
  user               User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  nidNumber          String?
  dob                String?
  gender             String?
  division           String?
  district           String?
  upazila            String?
  address            String?
  occupation         String?
  experienceYears    Int               @default(0)
  salaryExpected     Int?
  salaryType         String            @default("daily")
  availability       String            @default("immediately")
  bio                String?
  rating             Float             @default(5.0)
  totalReviews       Int               @default(0)
  totalJobsCompleted Int               @default(0)

  skills             Skill[]
  workExperiences    WorkExperience[]
  trainings          Training[]
}

model Skill {
  id                 String            @id @default(cuid())
  workerProfileId    String
  workerProfile      WorkerProfile     @relation(fields: [workerProfileId], references: [id], onDelete: Cascade)
  name               String
  category           String?
  proficiency        String            @default("intermediate")
  isVerified         Boolean           @default(false)
}

model WorkExperience {
  id                 String            @id @default(cuid())
  workerProfileId    String
  workerProfile      WorkerProfile     @relation(fields: [workerProfileId], references: [id], onDelete: Cascade)
  companyName        String
  role               String
  location           String?
  startDate          String?
  endDate            String?
  isCurrent          Boolean           @default(false)
  description        String?
}

model Training {
  id                 String            @id @default(cuid())
  workerProfileId    String
  workerProfile      WorkerProfile     @relation(fields: [workerProfileId], references: [id], onDelete: Cascade)
  title              String
  institute          String
  year               String?
  duration           String?
  certificateUrl     String?
  isVerified         Boolean           @default(false)
}

model EmployerProfile {
  id                 String            @id @default(cuid())
  userId             String            @unique
  user               User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  companyName        String
  businessType       String?
  industry           String?
  tradeLicenseNo     String?
  division           String?
  district           String?
  upazila            String?
  address            String?
  website            String?
  contactPerson      String?
  contactPhone       String?
  employeeCount      String?
  operationYears     Int?              @default(1)
}

model Job {
  id                 String            @id @default(cuid())
  employerId         String
  employer           User              @relation("EmployerJobs", fields: [employerId], references: [id], onDelete: Cascade)
  title              String
  category           String
  description        String
  requirements       String?
  vacancies          Int               @default(1)
  division           String?
  district           String?
  upazila            String?
  address            String?
  salaryMin          Int?
  salaryMax          Int?
  salaryType         String            @default("daily")
  employmentType     String            @default("full-time")
  status             String            @default("active")
  deadline           String?
  createdAt          DateTime          @default(now())
  updatedAt          DateTime          @updatedAt

  applications       Application[]
  reviews            Review[]
}

model Application {
  id                 String            @id @default(cuid())
  jobId              String
  job                Job               @relation(fields: [jobId], references: [id], onDelete: Cascade)
  workerId           String
  worker             User              @relation(fields: [workerId], references: [id], onDelete: Cascade)
  expectedSalary     Int?
  coverNote          String?
  status             String            @default("pending")
  appliedAt          DateTime          @default(now())
  updatedAt          DateTime          @updatedAt
}

model Review {
  id                 String            @id @default(cuid())
  jobId              String?
  job                Job?              @relation(fields: [jobId], references: [id], onDelete: SetNull)
  reviewerId         String
  reviewer           User              @relation("GivenReviews", fields: [reviewerId], references: [id], onDelete: Cascade)
  revieweeId         String
  reviewee           User              @relation("ReceivedReviews", fields: [revieweeId], references: [id], onDelete: Cascade)
  rating             Int               @default(5)
  comment            String?
  createdAt          DateTime          @default(now())
}

model Notification {
  id                 String            @id @default(cuid())
  userId             String
  user               User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  title              String
  message            String
  type               String            @default("info")
  isRead             Boolean           @default(false)
  link               String?
  createdAt          DateTime          @default(now())
}
`;
  fs.writeFileSync(mainSchema, sqliteContent);
  console.log(`✅ Configured 'schema.prisma' for local SQLite.`);
}
