import prisma from '../lib/prisma.js';

/**
 * Get aggregated Admin Dashboard statistics
 */
export const getAdminStats = async (req, res) => {
  try {
    const [
      totalWorkers,
      totalEmployers,
      verifiedWorkers,
      pendingVerification,
      activeJobs,
      totalApplications,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'worker' } }),
      prisma.user.count({ where: { role: 'employer' } }),
      prisma.user.count({ where: { role: 'worker', verificationStatus: 'verified' } }),
      prisma.user.count({ where: { verificationStatus: 'pending' } }),
      prisma.job.count({ where: { status: 'active' } }),
      prisma.application.count(),
    ]);

    const recentActivities = await prisma.notification.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, role: true } },
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalWorkers,
          totalEmployers,
          verifiedWorkers,
          pendingVerification,
          activeJobs,
          totalApplications,
        },
        recentActivities,
      },
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch admin statistics',
      error: error.message,
    });
  }
};

/**
 * Get Verification Queue (Pending Workers & Employers)
 */
export const getVerificationQueue = async (req, res) => {
  try {
    const { role } = req.query;

    const pendingUsers = await prisma.user.findMany({
      where: {
        verificationStatus: 'pending',
        ...(role && { role }),
      },
      include: {
        workerProfile: {
          include: {
            skills: true,
            trainings: true,
          },
        },
        employerProfile: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const sanitized = pendingUsers.map(({ passwordHash, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitized,
    });
  } catch (error) {
    console.error('Get verification queue error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch verification queue',
      error: error.message,
    });
  }
};

/**
 * Approve or Reject Verification
 */
export const updateVerificationStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, remarks } = req.body; // status: 'verified' | 'rejected'

    if (!['verified', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be verified, rejected, or pending.',
      });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        verificationStatus: status,
      },
      include: {
        workerProfile: true,
        employerProfile: true,
      },
    });

    // Notify user
    await prisma.notification.create({
      data: {
        userId,
        title: `Verification ${status === 'verified' ? 'Approved' : 'Rejected'}`,
        message:
          status === 'verified'
            ? 'Congratulations! Your ShramikID profile has been verified.'
            : `Your verification request was rejected. ${remarks ? `Reason: ${remarks}` : ''}`,
        type: status === 'verified' ? 'success' : 'warning',
      },
    });

    const { passwordHash, ...sanitized } = updatedUser;

    return res.status(200).json({
      success: true,
      message: `User verification status updated to ${status}`,
      data: sanitized,
    });
  } catch (error) {
    console.error('Update verification status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update verification status',
      error: error.message,
    });
  }
};
