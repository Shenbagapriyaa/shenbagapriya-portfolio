import Message from '../models/Message.js';
import brevo from '@getbrevo/brevo';


// Brevo configuration
const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);


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

    // Check Brevo API key
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is missing');

      return res.status(500).json({
        success: false,
        message: 'Email service is not configured',
      });
    }

    // Save message to MongoDB
    const doc = await Message.create({
      name,
      email,
      subject,
      message,
    });


    // =====================================================
    // 1. SEND EMAIL TO PORTFOLIO OWNER
    // =====================================================

    const ownerEmail = new brevo.SendSmtpEmail();

    ownerEmail.sender = {
      name: 'Shenbagapriya Portfolio',
      email: process.env.EMAIL_USER,
    };

    ownerEmail.to = [
      {
        email: process.env.EMAIL_USER,
        name: 'Shenbagapriya',
      },
    ];

    ownerEmail.replyTo = {
      email: email,
      name: name,
    };

    ownerEmail.subject = `📩 New Portfolio Contact - ${subject}`;

    ownerEmail.htmlContent = `
      <div style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        max-width: 600px;
        margin: auto;
      ">

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

        <div style="
          padding: 15px;
          background: #f5f5f5;
          border-radius: 8px;
        ">
          ${message}
        </div>

      </div>
    `;

    const ownerResult = await apiInstance.sendTransacEmail(ownerEmail);

    console.log('Owner email sent:', ownerResult);


    // =====================================================
    // 2. AUTOMATIC THANK-YOU EMAIL TO VISITOR
    // =====================================================

    const visitorEmail = new brevo.SendSmtpEmail();

    visitorEmail.sender = {
      name: 'Shenbagapriya Portfolio',
      email: process.env.EMAIL_USER,
    };

    visitorEmail.to = [
      {
        email: email,
        name: name,
      },
    ];

    visitorEmail.replyTo = {
      email: process.env.EMAIL_USER,
      name: 'Shenbagapriya',
    };

    visitorEmail.subject = 'Thank you for contacting me';

    visitorEmail.htmlContent = `
      <div style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        max-width: 600px;
        margin: auto;
      ">

        <h2>Hello ${name} 👋</h2>

        <p>
          Thank you for contacting me through my portfolio.
        </p>

        <p>
          I have received your message and will get back to you soon.
        </p>

        <br />

        <p>Regards,</p>

        <h3>Shenbagapriya</h3>

      </div>
    `;

    const visitorResult =
      await apiInstance.sendTransacEmail(visitorEmail);

    console.log('Visitor thank-you email sent:', visitorResult);


    // =====================================================
    // SUCCESS
    // =====================================================

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: doc,
    });


  } catch (error) {

    console.error(
      'CREATE MESSAGE ERROR:',
      error?.response?.body || error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.response?.body?.message ||
        error?.message ||
        'Failed to send message',
    });
  }
}


// =====================================================
// GET ALL MESSAGES
// =====================================================

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


// =====================================================
// MARK MESSAGE AS READ
// =====================================================

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


// =====================================================
// DELETE MESSAGE
// =====================================================

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