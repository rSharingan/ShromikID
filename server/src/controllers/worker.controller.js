import prisma from '../lib/prisma.js';

/**
 * Get all workers with search, filters (occupation, division, district, verificationStatus), and pagination
 */
export const getWorkers = async (req, res) => {
  try {
    const {
      search,
      occupation,
      division,
      district,
      status,
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build filter conditions
    const where = {
      role: 'worker',
      ...(status && { verificationStatus: status }),
      workerProfile: {
        ...(occupation && {
          occupation: { contains: occupation },
        }),
        ...(division && { division }),
        ...(district && { district }),
      },
      ...(search && {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
          {
            workerProfile: {
              occupation: { contains: search },
            },
          },
        ],
      }),
    };

    const [total, workers] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take,
        include: {
          workerProfile: {
            include: {
              skills: true,
              workExperiences: true,
              trainings: true,
            },
          },
        },
        orderBy: {
          [sortBy]: order.toLowerCase(),
        },
      }),
    ]);

    const sanitizedWorkers = workers.map(({ passwordHash, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedWorkers,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Get workers error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch workers',
      error: error.message,
    });
  }
};

/**
 * Get single worker profile by ID (Skill Passport)
 */
export const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const worker = await prisma.user.findFirst({
      where: {
        id,
        role: 'worker',
      },
      include: {
        workerProfile: {
          include: {
            skills: true,
            workExperiences: true,
            trainings: true,
          },
        },
        receivedReviews: {
          include: {
            reviewer: {
              select: { id: true, name: true, avatar: true },
            },
          },
        },
      },
    });

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found',
      });
    }

    const { passwordHash, ...sanitizedWorker } = worker;

    return res.status(200).json({
      success: true,
      data: sanitizedWorker,
    });
  } catch (error) {
    console.error('Get worker by id error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch worker details',
      error: error.message,
    });
  }
};

/**
 * Get authenticated worker's dashboard statistics
 */
export const getWorkerStats = async (req, res) => {
  try {
    const workerId = req.user.id;

    const [totalApplications, acceptedApplications, pendingApplications, completedJobs] = await Promise.all([
      prisma.application.count({ where: { workerId } }),
      prisma.application.count({ where: { workerId, status: 'accepted' } }),
      prisma.application.count({ where: { workerId, status: 'pending' } }),
      prisma.job.count({
        where: {
          applications: {
            some: { workerId, status: 'accepted' },
          },
          status: 'closed',
        },
      }),
    ]);

    const recentApplications = await prisma.application.findMany({
      where: { workerId },
      take: 5,
      orderBy: { appliedAt: 'desc' },
      include: {
        job: {
          include: {
            employer: {
              select: { id: true, name: true, employerProfile: true },
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalApplications,
          acceptedApplications,
          pendingApplications,
          completedJobs,
          profileCompletion: req.user.profileCompletion || 75,
          verificationStatus: req.user.verificationStatus,
        },
        recentApplications,
      },
    });
  } catch (error) {
    console.error('Get worker stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch worker statistics',
      error: error.message,
    });
  }
};

/**
 * Add or Update Skills for Worker
 */
export const updateSkills = async (req, res) => {
  try {
    const userId = req.user.id;
    const { skills = [] } = req.body;

    const workerProfile = await prisma.workerProfile.findUnique({
      where: { userId },
    });

    if (!workerProfile) {
      return res.status(404).json({ success: false, message: 'Worker profile not found' });
    }

    // Replace skills in transaction
    await prisma.$transaction([
      prisma.skill.deleteMany({ where: { workerProfileId: workerProfile.id } }),
      prisma.skill.createMany({
        data: skills.map((s) => ({
          workerProfileId: workerProfile.id,
          name: typeof s === 'string' ? s : s.name,
          category: typeof s === 'object' ? s.category : null,
          proficiency: typeof s === 'object' ? s.proficiency || 'intermediate' : 'intermediate',
        })),
      }),
    ]);

    const updatedSkills = await prisma.skill.findMany({
      where: { workerProfileId: workerProfile.id },
    });

    return res.status(200).json({
      success: true,
      message: 'Skills updated successfully',
      data: updatedSkills,
    });
  } catch (error) {
    console.error('Update skills error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update skills',
      error: error.message,
    });
  }
};
