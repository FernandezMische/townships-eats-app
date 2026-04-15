// backend/controllers/contactController.js
import pool from '../config/database.js';

export const submitContactForm = async (req, res) => {
  try {
    const { 
      senderId, 
      senderRole, 
      senderName, 
      senderEmail, 
      receiverType, 
      receiverId, 
      subject, 
      message,
      timestamp 
    } = req.body;

    // Validation
    if (!senderName || !senderEmail || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Save to database with context
    const [result] = await pool.execute(
      `INSERT INTO contact_messages 
       (sender_id, sender_role, sender_name, sender_email, 
        receiver_type, receiver_id, subject, message, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'unread', NOW())`,
      [
        senderId || null, 
        senderRole || 'guest', 
        senderName, 
        senderEmail, 
        receiverType || 'support', 
        receiverId || null, 
        subject, 
        message
      ]
    );

    console.log(`✅ Message from ${senderRole} saved with ID:`, result.insertId);

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
      messageId: result.insertId
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
};