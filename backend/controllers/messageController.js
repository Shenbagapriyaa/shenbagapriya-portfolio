import Message from '../models/Message.js';
import { BrevoClient } from '@getbrevo/brevo';


// =====================================================
// BREVO CONFIGURATION
// =====================================================

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});


// =====================================================
// CREATE MESSAGE
// =====================================================

export async function createMessage(req, res) {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;


    // =================================================
    // VALIDATION
    // =================================================

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }


    // =================================================
    // CHECK ENVIRONMENT VARIABLES
    // =================================================

    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is missing');

      return res.status(500).json({
        success: false,
        message: 'Brevo email service is not configured',
      });
    }


    if (!process.env.EMAIL_USER) {
      console.error('EMAIL_USER is missing');

      return res.status(500).json({
        success: false,
        message: 'Sender email is not configured',
      });
    }


    // =================================================
    // SAVE MESSAGE TO MONGODB
    // =================================================

    const doc = await Message.create({
      name,
      email,
      subject,
      message,
    });


    // =================================================
    // 1. SEND EMAIL TO PORTFOLIO OWNER
    // =================================================

    try {
      const ownerResult =
        await brevo.transactionalEmails.sendTransacEmail({

          sender: {
            name: 'Shenbagapriya Portfolio',
            email: process.env.EMAIL_USER,
          },

          to: [
            {
              email: process.env.EMAIL_USER,
              name: 'Shenbagapriya',
            },
          ],

          replyTo: {
            email: email,
            name: name,
          },

          subject: `📩 New Portfolio Contact - ${subject}`,

          htmlContent: `
            <div style="
              font-family: Arial, sans-serif;
              line-height: 1.6;
              max-width: 600px;
              margin: auto;
              padding: 20px;
            ">

              <h2>New Portfolio Contact</h2>

              <p>
                <strong>Name:</strong>
                ${name}
              </p>

              <p>
                <strong>Email:</strong>
                ${email}
              </p>

              <p>
                <strong>Subject:</strong>
                ${subject}
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
          `,
        });

      console.log(
        'Owner email sent successfully:',
        ownerResult
      );

    } catch (ownerError) {

      console.error(
        'OWNER EMAIL ERROR:',
        ownerError?.body ||
        ownerError?.message ||
        ownerError
      );

      return res.status(500).json({
        success: false,
        message:
          'Message was saved, but owner email could not be sent.',
      });
    }


    // =================================================
    // 2. AUTOMATIC THANK-YOU EMAIL TO VISITOR
    // =================================================

    let visitorEmailSent = false;

    try {
      const visitorResult =
        await brevo.transactionalEmails.sendTransacEmail({

          sender: {
            name: 'Shenbagapriya Portfolio',
            email: process.env.EMAIL_USER,
          },

          to: [
            {
              email: email,
              name: name,
            },
          ],

          replyTo: {
            email: process.env.EMAIL_USER,
            name: 'Shenbagapriya',
          },

          subject: 'Thank you for contacting me',

          htmlContent: `
            <div style="
              font-family: Arial, sans-serif;
              line-height: 1.6;
              max-width: 600px;
              margin: auto;
              padding: 20px;
            ">

              <h2>
                Hello ${name} 👋
              </h2>

              <p>
                Thank you for contacting me through my portfolio.
              </p>

              <p>
                I have received your message and will get back
                to you soon.
              </p>

              <br />

              <p>
                Regards,
              </p>

              <h3>
                Shenbagapriya
              </h3>

            </div>
          `,
        });

      console.log(
        'Visitor thank-you email sent successfully:',
        visitorResult
      );

      visitorEmailSent = true;

    } catch (visitorError) {

      console.error(
        'VISITOR THANK-YOU EMAIL ERROR:',
        visitorError?.body ||
        visitorError?.message ||
        visitorError
      );
    }


    // =================================================
    // SUCCESS
    // =================================================

    return res.status(201).json({

      success: true,

      message: visitorEmailSent
        ? 'Message sent successfully'
        : 'Message received, but thank-you email could not be sent.',

      visitorEmailSent,

      data: doc,

    });


  } catch (error) {

    console.error(
      'CREATE MESSAGE ERROR:',
      error?.body ||
      error?.message ||
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error?.message ||
        'Failed to send message',

    });
  }
}


// =====================================================
// GET ALL MESSAGES (ADMIN)
// =====================================================

export async function getMessages(req, res) {
  try {

    const docs = await Message
      .find()
      .sort({
        createdAt: -1,
      });

    return res.json(docs);

  } catch (error) {

    console.error(
      'GET MESSAGES ERROR:',
      error
    );

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

    const doc =
      await Message.findByIdAndUpdate(
        req.params.id,
        {
          read: true,
        },
        {
          new: true,
        }
      );

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.json(doc);

  } catch (error) {

    console.error(
      'MARK READ ERROR:',
      error
    );

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

    const doc =
      await Message.findByIdAndDelete(
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

    console.error(
      'DELETE MESSAGE ERROR:',
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}