/**
 * ShramikID Unified API Service
 * Manages HTTP communication between React Frontend and Express Backend
 */

const API_BASE_URL = '/api';

/**
 * Core Request Helper
 */
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('shramik_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // If unauthorized, optional token clearing
      if (response.status === 401 && token) {
        // Token expired
        localStorage.removeItem('shramik_token');
        localStorage.removeItem('shramik_user');
      }
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

// ----------------------------------------------------
// 1. Auth Services
// ----------------------------------------------------
export const authService = {
  login: async ({ email, phone, password, role }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, phone, password, role }),
    });
  },

  loginOtp: async ({ phone, otp, role }) => {
    return apiRequest('/auth/login-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp, role }),
    });
  },

  registerWorker: async (workerData) => {
    return apiRequest('/auth/register/worker', {
      method: 'POST',
      body: JSON.stringify(workerData),
    });
  },

  registerEmployer: async (employerData) => {
    return apiRequest('/auth/register/employer', {
      method: 'POST',
      body: JSON.stringify(employerData),
    });
  },

  getMe: async () => {
    return apiRequest('/auth/me');
  },

  updateProfile: async (profileData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  sendOtp: async (phone, purpose = 'REGISTRATION') => {
    return apiRequest('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, purpose }),
    });
  },

  verifyOtp: async (phone, otp, purpose = null) => {
    return apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp, purpose }),
    });
  },
};

// ----------------------------------------------------
// 2. Jobs Services
// ----------------------------------------------------
export const jobsService = {
  getJobs: async (params = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== '' && v !== null)
    ).toString();
    return apiRequest(`/jobs${queryString ? `?${queryString}` : ''}`);
  },

  getJobById: async (id) => {
    return apiRequest(`/jobs/${id}`);
  },

  createJob: async (jobData) => {
    return apiRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  updateJob: async (id, jobData) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  },

  deleteJob: async (id) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'DELETE',
    });
  },

  getCategories: async () => {
    return apiRequest('/jobs/categories');
  },
};

// ----------------------------------------------------
// 3. Workers Services
// ----------------------------------------------------
export const workersService = {
  getWorkers: async (params = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== '' && v !== null)
    ).toString();
    return apiRequest(`/workers${queryString ? `?${queryString}` : ''}`);
  },

  getWorkerById: async (id) => {
    return apiRequest(`/workers/${id}`);
  },

  getWorkerStats: async () => {
    return apiRequest('/workers/stats');
  },

  updateSkills: async (skills) => {
    return apiRequest('/workers/skills', {
      method: 'PUT',
      body: JSON.stringify({ skills }),
    });
  },
};

// ----------------------------------------------------
// 4. Employers Services
// ----------------------------------------------------
export const employersService = {
  getEmployers: async (params = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== '' && v !== null)
    ).toString();
    return apiRequest(`/employers${queryString ? `?${queryString}` : ''}`);
  },

  getEmployerById: async (id) => {
    return apiRequest(`/employers/${id}`);
  },

  getEmployerStats: async () => {
    return apiRequest('/employers/stats');
  },
};

// ----------------------------------------------------
// 5. Applications Services
// ----------------------------------------------------
export const applicationsService = {
  applyForJob: async ({ jobId, expectedSalary, coverNote }) => {
    return apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify({ jobId, expectedSalary, coverNote }),
    });
  },

  getMyApplications: async (status) => {
    return apiRequest(`/applications/my-applications${status ? `?status=${status}` : ''}`);
  },

  getJobApplications: async (jobId) => {
    return apiRequest(`/applications/job/${jobId}`);
  },

  updateStatus: async (applicationId, status) => {
    return apiRequest(`/applications/${applicationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// ----------------------------------------------------
// 6. Admin Services
// ----------------------------------------------------
export const adminService = {
  getStats: async () => {
    return apiRequest('/admin/stats');
  },

  getVerificationQueue: async (role) => {
    return apiRequest(`/admin/verification-queue${role ? `?role=${role}` : ''}`);
  },

  updateVerification: async (userId, status, remarks) => {
    return apiRequest(`/admin/verify/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, remarks }),
    });
  },
};
