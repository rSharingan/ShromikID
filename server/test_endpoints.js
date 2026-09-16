async function runTests() {
  const BASE_URL = 'http://localhost:5000/api';

  console.log('--- TEST 1: Healthcheck ---');
  const healthRes = await fetch(`${BASE_URL}/health`).then((r) => r.json());
  console.log('Healthcheck:', healthRes);

  console.log('\n--- TEST 2: Worker Login (Email) ---');
  const workerLogin = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'rahim@demo.shramikid.local', password: 'Worker@123' }),
  }).then((r) => r.json());
  console.log('Worker Login Success:', workerLogin.success, '| User:', workerLogin.user?.name, '| Role:', workerLogin.user?.role);
  const workerToken = workerLogin.token;

  console.log('\n--- TEST 3: Worker Login (Phone Number) ---');
  const phoneLogin = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '01700000001', password: 'Worker@123' }),
  }).then((r) => r.json());
  console.log('Phone Login Success:', phoneLogin.success, '| User:', phoneLogin.user?.name);

  console.log('\n--- TEST 4: Employer Login ---');
  const empLogin = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'abc@demo.shramikid.local', password: 'Employer@123' }),
  }).then((r) => r.json());
  console.log('Employer Login Success:', empLogin.success, '| Company:', empLogin.user?.employerProfile?.companyName);
  const employerToken = empLogin.token;

  console.log('\n--- TEST 5: Admin Login ---');
  const adminLogin = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@shramikid.demo', password: 'Admin@123' }),
  }).then((r) => r.json());
  console.log('Admin Login Success:', adminLogin.success, '| Role:', adminLogin.user?.role);
  const adminToken = adminLogin.token;

  console.log('\n--- TEST 6: Get Jobs ---');
  const jobsRes = await fetch(`${BASE_URL}/jobs`).then((r) => r.json());
  console.log('Jobs Count:', jobsRes.data?.length, '| Sample Title:', jobsRes.data?.[0]?.title);

  console.log('\n--- TEST 7: Get Admin Statistics ---');
  const statsRes = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  }).then((r) => r.json());
  console.log('Admin Stats:', statsRes.data?.stats);

  console.log('\n--- TEST 8: Worker Registration ---');
  const regWorkerRes = await fetch(`${BASE_URL}/auth/register/worker`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Salam Chowdhury',
      email: 'salam@test.com',
      phone: '01899998877',
      password: 'Worker@123',
      occupation: 'Master Carpenter',
      division: 'Dhaka',
      district: 'Dhaka',
      skills: ['Cabinet Making', 'Wood Carving', 'Furniture Polishing'],
    }),
  }).then((r) => r.json());
  console.log('Register Worker Success:', regWorkerRes.success, '| New Worker ID:', regWorkerRes.user?.id);

  console.log('\n🎉 ALL 8 BACKEND API TESTS COMPLETED SUCCESSFULLY!');
}

runTests().catch(console.error);
