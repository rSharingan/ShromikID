import prisma from '../lib/prisma.js';

/**
 * Apply for a job (Worker only)
 */
export const applyForJob = async (req, res) => {
  try {
    const workerId = req.user.id;
    const { jobId, expectedSalary, coverNote } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'Job ID is required.' });
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    // Check if already applied
    const existing = await prisma.application.findFirst({
      where: { jobId, workerId },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an application for this job.',
      });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        workerId,
        expectedSalary: expectedSalary ? Number(expectedSalary) : null,
        coverNote,
        status: 'pending',
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            employer: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    // Create notification for employer
    await prisma.notification.create({
      data: {
        userId: job.employerId,
        title: 'New Job Application',
        message: `${req.user.name} applied for "${job.title}"`,
        type: 'application',
        link: `/employer/applications`,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: application,
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit job application',
      error: error.message,
    });
  }
};

/**
 * Get current worker's applications
 */
export const getMyApplications = async (req, res) => {
  try {
    const workerId = req.user.id;
    const { status } = req.query;

    const applications = await prisma.application.findMany({
      where: {
        workerId,
        ...(status && status !== 'all' ? { status } : {}),
      },
      include: {
        job: {
          include: {
            employer: {
              select: {
                id: true,
                name: true,
                avatar: true,
                employerProfile: true,
              },
            },
          },
        },
      },
      orderBy: { appliedAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error('Get my applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message,
    });
  }
};

/**
 * Get applications for a specific job (Employer only)
 */
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const employerId = req.user.id;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.employerId !== employerId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view these applications' });
    }

    const applications = await prisma.application.findMany({
      where: { jobId },
      include: {
        worker: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
            verificationStatus: true,
            workerProfile: {
              include: {
                skills: true,
                workExperiences: true,
                trainings: true,
              },
            },
          },
        },
      },
      orderBy: { appliedAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error('Get job applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch job applications',
      error: error.message,
    });
  }
};

/**
 * Update application status (Shortlist, Accept, Reject)
 */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!['pending', 'shortlisted', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, shortlisted, accepted, or rejected.',
      });
    }

    const application = await prisma.application.findUnique({
      where: { id },
      include: { job: true },
    });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.job.employerId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this application' });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status },
      include: {
        worker: { select: { id: true, name: true } },
        job: { select: { id: true, title: true } },
      },
    });

    // Notify worker
    await prisma.notification.create({
      data: {
        userId: application.workerId,
        title: `Application ${status.toUpperCase()}`,
        message: `Your application for "${application.job.title}" has been marked as ${status}.`,
        type: 'application',
        link: `/worker/applications`,
      },
    });

    return res.status(200).json({
      success: true,
      message: `Application status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error('Update application status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message,
    });
  }
};
