import prisma from '../lib/prisma.js';

/**
 * Get all employers with search and pagination
 */
export const getEmployers = async (req, res) => {
  try {
    const { search, division, district, page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {
      role: 'employer',
      employerProfile: {
        ...(division && { division }),
        ...(district && { district }),
      },
      ...(search && {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          {
            employerProfile: {
              companyName: { contains: search },
            },
          },
        ],
      }),
    };

    const [total, employers] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take,
        include: {
          employerProfile: true,
          postedJobs: {
            where: { status: 'active' },
            select: { id: true, title: true, category: true, vacancies: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const sanitized = employers.map(({ passwordHash, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitized,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Get employers error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch employers',
      error: error.message,
    });
  }
};

/**
 * Get single employer by ID
 */
export const getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;

    const employer = await prisma.user.findFirst({
      where: { id, role: 'employer' },
      include: {
        employerProfile: true,
        postedJobs: {
          where: { status: 'active' },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!employer) {
      return res.status(404).json({ success: false, message: 'Employer not found' });
    }

    const { passwordHash, ...sanitized } = employer;
    return res.status(200).json({ success: true, data: sanitized });
  } catch (error) {
    console.error('Get employer by id error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch employer details',
      error: error.message,
    });
  }
};

/**
 * Get Employer Dashboard Statistics
 */
export const getEmployerStats = async (req, res) => {
  try {
    const employerId = req.user.id;

    const [totalJobs, activeJobs, totalApplications, hiredCount] = await Promise.all([
      prisma.job.count({ where: { employerId } }),
      prisma.job.count({ where: { employerId, status: 'active' } }),
      prisma.application.count({
        where: {
          job: { employerId },
        },
      }),
      prisma.application.count({
        where: {
          job: { employerId },
          status: 'accepted',
        },
      }),
    ]);

    const recentJobs = await prisma.job.findMany({
      where: { employerId },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    const recentApplications = await prisma.application.findMany({
      where: {
        job: { employerId },
      },
      take: 6,
      orderBy: { appliedAt: 'desc' },
      include: {
        worker: {
          select: {
            id: true,
            name: true,
            avatar: true,
            workerProfile: true,
          },
        },
        job: {
          select: { id: true, title: true, category: true },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalJobs,
          activeJobs,
          totalApplications,
          hiredCount,
          verificationStatus: req.user.verificationStatus,
        },
        recentJobs,
        recentApplications,
      },
    });
  } catch (error) {
    console.error('Get employer stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch employer stats',
      error: error.message,
    });
  }
};
