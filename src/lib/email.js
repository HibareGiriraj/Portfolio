import nodemailer from 'nodemailer';

// Create Nodemailer transporter for Outlook
const createTransporter = () => {
    const user = process.env.OUTLOOK_EMAIL;
    const pass = process.env.OUTLOOK_PASSWORD;

    if (!user || !pass) {
        return null;
    }

    return nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // TLS
        auth: {
            user: user,
            pass: pass,
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    });
};

/**
 * Send contact form email notification
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Sender's name
 * @param {string} contactData.email - Sender's email
 * @param {string} contactData.subject - Email subject
 * @param {string} contactData.message - Message content
 * @returns {Promise<Object>} Email send result
 */
export async function sendContactEmail({ name, email, subject, message }) {
    const transporter = createTransporter();

    // If Outlook is not configured, skip email but don't break the API
    if (!transporter) {
        console.warn('Outlook email not configured. Email will not be sent.');
        return { success: false, skipped: true, reason: 'Email service not configured' };
    }

    try {
        // Get recipient email from environment or use default
        const recipientEmail = process.env.OUTLOOK_EMAIL || 'girirajhibare@outlook.com';

        const emailSubject = subject
            ? `Portfolio Contact: ${subject}`
            : `Portfolio Contact from ${name}`;

        const mailOptions = {
            from: process.env.OUTLOOK_EMAIL,
            to: recipientEmail,
            replyTo: email,
            subject: emailSubject,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                        .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #06b6d4; }
                        .message-box { background: white; padding: 15px; border-left: 4px solid #06b6d4; margin-top: 10px; }
                        .footer { text-align: center; padding: 15px; color: #64748b; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>New Contact Form Submission</h2>
                        </div>
                        <div class="content">
                            <div class="field">
                                <span class="label">Name:</span> ${name}
                            </div>
                            <div class="field">
                                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                            </div>
                            ${subject ? `
                            <div class="field">
                                <span class="label">Subject:</span> ${subject}
                            </div>
                            ` : ''}
                            <div class="field">
                                <span class="label">Message:</span>
                                <div class="message-box">
                                    ${message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This email was sent from your portfolio contact form.</p>
                            <p>Reply directly to this email to respond to ${name}.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ''}
Message:
${message}

---
This email was sent from your portfolio contact form.
Reply directly to this email to respond to ${name}.
            `.trim(),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, data: info };
    } catch (error) {
        console.error('Error sending contact email:', error);
        throw error;
    }
}

/**
 * Send auto-reply confirmation email to the sender
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>} Email send result
 */
export async function sendAutoReply({ name, email }) {
    const transporter = createTransporter();

    // Check if Outlook is configured
    if (!transporter) {
        console.warn('Outlook email not configured. Auto-reply will not be sent.');
        return { success: false, error: 'Email service not configured' };
    }

    try {
        const mailOptions = {
            from: process.env.OUTLOOK_EMAIL,
            to: email,
            subject: 'Thank you for reaching out!',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                        .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
                        .footer { text-align: center; padding: 15px; color: #64748b; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Thank You for Your Message!</h2>
                        </div>
                        <div class="content">
                            <p>Hi ${name},</p>
                            <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
                            <p>I typically respond within 24-48 hours.</p>
                            <p>Best regards,<br><strong>Giriraj Hibare</strong><br>Full-Stack Developer</p>
                        </div>
                        <div class="footer">
                            <p>This is an automated confirmation email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
Hi ${name},

Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible.

I typically respond within 24-48 hours.

Best regards,
Giriraj Hibare
Full-Stack Developer

---
This is an automated confirmation email.
            `.trim(),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Auto-reply sent:', info.messageId);
        return { success: true, data: info };
    } catch (error) {
        console.error('Error sending auto-reply:', error);
        // Don't throw - auto-reply failure shouldn't break the form
        return { success: false, error };
    }
}


