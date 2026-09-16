import prisma from '../lib/prisma.js';

/**
 * Get all jobs with filters and pagination
 */
export const getJobs = async (req, res) => {
  try {
    const {
      search,
      category,
      division,
      district,
      employmentType,
      salaryType,
      minSalary,
      maxSalary,
      status = 'active',
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {
      ...(status && status !== 'all' ? { status } : {}),
      ...(category && category !== 'All' ? { category } : {}),
      ...(division && { division }),
      ...(district && { district }),
      ...(employmentType && { employmentType }),
      ...(salaryType && { salaryType }),
      ...(minSalary && { salaryMin: { gte: Number(minSalary) } }),
      ...(maxSalary && { salaryMax: { lte: Number(maxSalary) } }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { category: { contains: search } },
          { district: { contains: search } },
          { employer: { employerProfile: { companyName: { contains: search } } } },
        ],
      }),
    };

    const [total, jobs] = await Promise.all([
      prisma.job.count({ where }),
      prisma.job.findMany({
        where,
        skip,
        take,
        include: {
          employer: {
            select: {
              id: true,
              name: true,
              avatar: true,
              verificationStatus: true,
              employerProfile: {
                select: {
                  companyName: true,
                  industry: true,
                  district: true,
                  division: true,
                },
              },
            },
          },
          _count: {
            select: { applications: true },
          },
        },
        orderBy: {
          [sortBy]: order.toLowerCase(),
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message,
    });
  }
};

/**
 * Get single job by ID
 */
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
            verificationStatus: true,
            employerProfile: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job posting not found' });
    }

    // If user is authenticated worker, check if they already applied
    let hasApplied = false;
    let userApplication = null;
    if (req.user && req.user.role === 'worker') {
      userApplication = await prisma.application.findFirst({
        where: {
          jobId: id,
          workerId: req.user.id,
        },
      });
      hasApplied = !!userApplication;
    }

    return res.status(200).json({
      success: true,
      data: {
        ...job,
        hasApplied,
        userApplication,
      },
    });
  } catch (error) {
    console.error('Get job by id error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch job details',
      error: error.message,
    });
  }
};

/**
 * Create a new job posting (Employer only)
 */
export const createJob = async (req, res) => {
  try {
    const employerId = req.user.id;
    const {
      title,
      category,
      description,
      requirements,
      vacancies,
      division,
      district,
      upazila,
      address,
      salaryMin,
      salaryMax,
      salaryType,
      employmentType,
      deadline,
    } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and description are required.',
      });
    }

    const job = await prisma.job.create({
      data: {
        employerId,
        title,
        category,
        description,
        requirements,
        vacancies: vacancies ? Number(vacancies) : 1,
        division,
        district,
        upazila,
        address,
        salaryMin: salaryMin ? Number(salaryMin) : null,
        salaryMax: salaryMax ? Number(salaryMax) : null,
        salaryType: salaryType || 'daily',
        employmentType: employmentType || 'full-time',
        deadline,
        status: 'active',
      },
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            employerProfile: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: job,
    });
  } catch (error) {
    console.error('Create job error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create job posting',
      error: error.message,
    });
  }
};

/**
 * Update job posting
 */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingJob = await prisma.job.findUnique({ where: { id } });
    if (!existingJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Only creator or admin can update
    if (existingJob.employerId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this job' });
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: req.body,
    });

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob,
    });
  } catch (error) {
    console.error('Update job error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: error.message,
    });
  }
};

/**
 * Delete / Close job posting
 */
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingJob = await prisma.job.findUnique({ where: { id } });
    if (!existingJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (existingJob.employerId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this job' });
    }

    await prisma.job.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Delete job error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: error.message,
    });
  }
};

/**
 * Get distinct job categories with counts
 */
export const getJobCategories = async (req, res) => {
  try {
    const categories = await prisma.job.groupBy({
      by: ['category'],
      where: { status: 'active' },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: categories.map((c) => ({
        category: c.category,
        count: c._count.id,
      })),
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message,
    });
  }
};
