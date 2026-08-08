import Message from '../models/Message.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


// CREATE MESSAGE (Contact Form)
export async function createMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing');

      return res.status(500).json({
        success: false,
        message: 'Email service is not configured',
      });
    }

    // Save message to MongoDB first
    const doc = await Message.create({
      name,
      email,
      subject,
      message,
    });

    // Send notification email to portfolio owner
    const ownerEmail = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [process.env.EMAIL_USER],
      replyTo: email,
      subject: `📩 New Portfolio Contact - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Portfolio Contact</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Subject:</strong> ${subject}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p>
            ${message}
          </p>
        </div>
      `,
    });

    console.log('Owner email result:', ownerEmail);

    // IMPORTANT:
    // Visitor auto-reply is disabled because
    // onboarding@resend.dev can only send testing
    // emails to the Resend account owner email.

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: doc,
    });

  } catch (error) {
    console.error('CREATE MESSAGE ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error?.message || 'Failed to send message',
    });
  }
}


// GET ALL MESSAGES (Admin)
export async function getMessages(req, res) {
  try {
    const docs = await Message
      .find()
      .sort({ createdAt: -1 });

    return res.json(docs);

  } catch (error) {
    console.error('GET MESSAGES ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


// MARK MESSAGE AS READ
export async function markRead(req, res) {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.json(doc);

  } catch (error) {
    console.error('MARK READ ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


// DELETE MESSAGE
export async function deleteMessage(req, res) {
  try {
    const doc = await Message.findByIdAndDelete(
      req.params.id
    );

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.json({
      success: true,
      message: 'Message deleted successfully',
    });

  } catch (error) {
    console.error('DELETE MESSAGE ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}