const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');


//Get all approved admins
exports.getApprovedAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin', isApprovedAdmin: true }).select('-password');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved admins' });
  }
};

// Get pending admin requests
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await User.find({ requestedAdmin: true, isApprovedAdmin: false });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching requests', error: error.message });
  }
};

// Approve a user as admin
exports.approveAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role === 'admin' || user.role === 'master') {
      return res.status(400).json({ msg: 'User is already an admin or master' });
    }

    user.role = 'admin';
    user.isApprovedAdmin = true;
    user.requestedAdmin = false;
    await user.save();

    // Send approval email
    await sendEmail(
      user.email,
      'Admin Access Approved',
      `<p>Hi ${user.name},</p><p>Your request to become an admin has been approved! You now have admin access to Deshi Food Villa.</p>`
    );

    res.status(200).json({ msg: 'User successfully promoted to admin' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to promote user', error: error.message });
  }
};

// Delete an admin (or reject a pending request)
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    if (admin.role === 'master') {
      return res.status(403).json({ msg: 'Cannot delete the master admin' });
    }

    const isRequestRejected = admin.requestedAdmin && !admin.isApprovedAdmin;

    await User.findByIdAndDelete(req.params.id);

    // Send email for rejection or removal
    await sendEmail(
      admin.email,
      isRequestRejected ? 'Admin Access Rejected' : 'Admin Access Removed',
      `<p>Hi ${admin.name},</p><p>Your ${
        isRequestRejected ? 'request to become an admin was not approved' : 'admin access has been removed'
      } by the master admin.</p>`
    );

    res.status(200).json({ msg: isRequestRejected ? 'Admin request rejected' : 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to delete admin', error: error.message });
  }
};
