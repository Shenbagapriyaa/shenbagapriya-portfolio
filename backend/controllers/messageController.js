import Message from '../models/Message.js';
import nodemailer from 'nodemailer';


// CREATE MESSAGE (Contact Form)
export async function createMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body;


    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    // Create transporter after dotenv is loaded
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, ""),
      },
    });


    // Test email connection
    await transporter.verify();


    // Save message to MongoDB
    const doc = await Message.create({
      name,
      email,
      subject,
      message,
    });


    // Send email to portfolio owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 New Portfolio Contact - ${subject}`,
      html: `
        <h2>New Portfolio Contact</h2>

        <p><b>Name:</b> ${name}</p>

        <p><b>Email:</b> ${email}</p>

        <p><b>Subject:</b> ${subject}</p>

        <p><b>Message:</b></p>

        <p>${message}</p>
      `,
    });


    // Auto reply to sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me",
      html: `
        <h2>Hello ${name} 👋</h2>

        <p>
          Thank you for contacting me through my portfolio.
        </p>

        <p>
          I have received your message and will get back to you soon.
        </p>

        <br>

        <p>Regards,</p>
        <h3>Shenbagapriya</h3>
      `,
    });


    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: doc,
    });


  } catch (error) {

    console.log("CREATE MESSAGE ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}



// GET ALL MESSAGES (Admin)
export async function getMessages(req, res) {
  try {

    const docs = await Message
      .find()
      .sort({ createdAt: -1 });

    res.json(docs);

  } catch (error) {

    res.status(500).json({
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
        message: "Message not found",
      });
    }


    res.json(doc);

  } catch (error) {

    res.status(500).json({
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
        message: "Message not found",
      });
    }


    res.json({
      message: "Message deleted successfully",
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
}