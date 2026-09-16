import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Button, Input, Select, Card } from '../../components/common';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const RegisterPage = () => {
  const [userType, setUserType] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Common fields
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Worker fields
    fullName: '',
    nid: '',
    dateOfBirth: '',
    address: '',
    district: '',
    upazila: '',
    occupation: '',
    
    // Employer fields
    companyName: '',
    ownerName: '',
    businessType: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (userType === 'worker') {
      if (step === 1) {
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.email) newErrors.email = 'Email is required';
      } else if (step === 2) {
        if (!formData.nid) newErrors.nid = 'NID is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.district) newErrors.district = 'District is required';
      } else if (step === 3) {
        if (!formData.upazila) newErrors.upazila = 'Upazila is required';
        if (!formData.occupation) newErrors.occupation = 'Occupation is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (userType === 'employer') {
      if (step === 1) {
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.ownerName) newErrors.ownerName = 'Owner name is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.email) newErrors.email = 'Email is required';
      } else if (step === 2) {
        if (!formData.businessType) newErrors.businessType = 'Business type is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      if (userType === 'worker') {
        navigate('/worker/dashboard');
      } else {
        navigate('/employer/dashboard');
      }
    }
  };

  const districts = ['Dhaka', 'Gazipur', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barisal'];
  const upazilas = ['Gulshan', 'Dhanmondi', 'Mirpur', 'Uttara', 'Motijheel'];
  const occupations = ['Rajmistri', 'Electrician', 'Plumber', 'Painter', 'Tailor', 'Driver', 'Housekeeper'];
  const businessTypes = ['Construction', 'Electrical Services', 'Plumbing', 'Cleaning', 'Consulting'];

  if (!userType) {
    return (
      <PublicLayout>
        <section className="py-12 sm:py-20 lg:py-28 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Account</h1>
              <p className="text-lg text-gray-600">Choose your account type to get started</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card
                hover
                className="cursor-pointer border-2 border-transparent hover:border-primary-600 transition-all"
                onClick={() => {
                  setUserType('worker');
                  setStep(1);
                }}
              >
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">I'm a Worker</h2>
                    <p className="text-gray-600">Create your digital identity and find job opportunities</p>
                  </div>
                  <Button fullWidth>Create Worker Account</Button>
                </div>
              </Card>

              <Card
                hover
                className="cursor-pointer border-2 border-transparent hover:border-primary-600 transition-all"
                onClick={() => {
                  setUserType('employer');
                  setStep(1);
                }}
              >
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m0 0h5.581m0 0a2.5 2.5 0 110-5h.581m-.581 5a2.5 2.5 0 110-5h.581m0 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">I'm an Employer</h2>
                    <p className="text-gray-600">Find and hire verified workers for your projects</p>
                  </div>
                  <Button fullWidth>Create Employer Account</Button>
                </div>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  // Worker Registration
  if (userType === 'worker') {
    return (
      <PublicLayout>
        <section className="py-12 sm:py-20 bg-gray-50 min-h-screen">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="w-full">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setUserType(null)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    ← Back
                  </button>
                  <div className="text-sm text-gray-600">Step {step} of 3</div>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map(s => (
                    <div
                      key={s}
                      className={`flex-1 h-2 rounded-full transition-colors ${
                        s <= step ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                      <p className="text-gray-600 text-sm">Let's start with your personal details</p>
                    </div>

                    <Input
                      label="Full Name"
                      type="text"
                      name="fullName"
                      placeholder="e.g., Rahim Uddin"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      error={errors.fullName}
                      required
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      placeholder="+880..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      required
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                    />
                  </div>
                )}

                {/* Step 2: Identity & Location */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity & Location</h2>
                      <p className="text-gray-600 text-sm">Verify your identity and location</p>
                    </div>

                    <Input
                      label="National ID (NID)"
                      type="text"
                      name="nid"
                      placeholder="Enter your NID"
                      value={formData.nid}
                      onChange={handleInputChange}
                      error={errors.nid}
                      required
                    />

                    <Input
                      label="Date of Birth"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      error={errors.dateOfBirth}
                      required
                    />

                    <Input
                      label="Address"
                      type="text"
                      name="address"
                      placeholder="Your address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={errors.address}
                      required
                    />

                    <Select
                      label="District"
                      options={districts.map(d => ({ value: d, label: d }))}
                      value={formData.district}
                      onChange={(e) => handleInputChange({ target: { name: 'district', value: e.target.value } })}
                      error={errors.district}
                      required
                    />
                  </div>
                )}

                {/* Step 3: Skills & Password */}
                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Skills & Security</h2>
                      <p className="text-gray-600 text-sm">Define your primary occupation and set a password</p>
                    </div>

                    <Select
                      label="Upazila"
                      options={upazilas.map(u => ({ value: u, label: u }))}
                      value={formData.upazila}
                      onChange={(e) => handleInputChange({ target: { name: 'upazila', value: e.target.value } })}
                      error={errors.upazila}
                      required
                    />

                    <Select
                      label="Primary Occupation"
                      options={occupations.map(o => ({ value: o, label: o }))}
                      value={formData.occupation}
                      onChange={(e) => handleInputChange({ target: { name: 'occupation', value: e.target.value } })}
                      error={errors.occupation}
                      required
                    />

                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      error={errors.password}
                      required
                    />

                    <Input
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      error={errors.confirmPassword}
                      required
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      fullWidth
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      type="button"
                      fullWidth
                      onClick={handleNext}
                    >
                      Next
                      <ArrowRight size={18} />
                    </Button>
                  ) : (
                    <Button type="submit" fullWidth>
                      Create Account
                      <CheckCircle2 size={18} />
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </section>
      </PublicLayout>
    );
  }

  // Employer Registration (Step 1-2)
  if (userType === 'employer') {
    return (
      <PublicLayout>
        <section className="py-12 sm:py-20 bg-gray-50 min-h-screen">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="w-full">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setUserType(null)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    ← Back
                  </button>
                  <div className="text-sm text-gray-600">Step {step} of 2</div>
                </div>
                <div className="flex gap-2">
                  {[1, 2].map(s => (
                    <div
                      key={s}
                      className={`flex-1 h-2 rounded-full transition-colors ${
                        s <= step ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Company Info */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h2>
                      <p className="text-gray-600 text-sm">Tell us about your business</p>
                    </div>

                    <Input
                      label="Company/Business Name"
                      type="text"
                      name="companyName"
                      placeholder="Your business name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      error={errors.companyName}
                      required
                    />

                    <Input
                      label="Owner Name"
                      type="text"
                      name="ownerName"
                      placeholder="Your name"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      error={errors.ownerName}
                      required
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      placeholder="+880..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      required
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                    />
                  </div>
                )}

                {/* Step 2: Business Details */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Details</h2>
                      <p className="text-gray-600 text-sm">Additional information about your business</p>
                    </div>

                    <Select
                      label="Business Type"
                      options={businessTypes.map(t => ({ value: t, label: t }))}
                      value={formData.businessType}
                      onChange={(e) => handleInputChange({ target: { name: 'businessType', value: e.target.value } })}
                      error={errors.businessType}
                      required
                    />

                    <Input
                      label="Address"
                      type="text"
                      name="address"
                      placeholder="Business address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={errors.address}
                      required
                    />

                    <Select
                      label="District"
                      options={districts.map(d => ({ value: d, label: d }))}
                      value={formData.district}
                      onChange={(e) => handleInputChange({ target: { name: 'district', value: e.target.value } })}
                      error={errors.district}
                      required
                    />

                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      error={errors.password}
                      required
                    />

                    <Input
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      error={errors.confirmPassword}
                      required
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      fullWidth
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                  )}
                  {step < 2 ? (
                    <Button
                      type="button"
                      fullWidth
                      onClick={handleNext}
                    >
                      Next
                      <ArrowRight size={18} />
                    </Button>
                  ) : (
                    <Button type="submit" fullWidth>
                      Create Account
                      <CheckCircle2 size={18} />
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </section>
      </PublicLayout>
    );
  }
};

export default RegisterPage;
