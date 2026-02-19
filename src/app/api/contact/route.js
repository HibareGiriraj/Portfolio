import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getAllContacts, addContact } from '@/lib/contacts';
import { sendContactEmail, sendAutoReply } from '@/lib/email';

export async function POST(request) {
    try {
        const body = await request.json();

        const { name, email, subject, message, website } = body;

        // Honeypot spam protection - if website field is filled, it's a bot
        if (website && website.trim() !== '') {
            // Silently reject without error to avoid revealing the honeypot
            return Response.json(
                { success: true, message: 'Thank you for your message! I will get back to you soon.' },
                { status: 200 }
            );
        }

        // Validate required fields
        if (!name || !email || !message) {
            return Response.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Basic spam detection - check for common spam patterns
        const spamPatterns = [
            /http[s]?:\/\//i,
            /www\./i,
            /\[url\]/i,
            /<a\s+href/i,
        ];
        
        const messageLower = message.toLowerCase();
        const hasSpamLinks = spamPatterns.some(pattern => pattern.test(message));
        
        // If message contains suspicious links, log for review but don't block
        // You can enhance this with more sophisticated spam detection (e.g., reCAPTCHA)
        if (hasSpamLinks) {
            console.log('Potential spam detected in contact form:', { email, subject });
        }

        // STEP 1: Save to MongoDB - MANDATORY (this is the source of truth)
        // If this fails, the API must fail - no data loss allowed
        let contact = null;
        try {
            contact = await addContact({
                name,
                email,
                subject: subject || '',
                message
            });
            console.log('✅ Contact saved to MongoDB');
        } catch (dbError) {
            console.error('❌ Failed to save contact to MongoDB:', dbError);
            console.error('Database error details:', {
                message: dbError.message,
                stack: dbError.stack
            });
            // If MongoDB fails, the API must fail - no data loss allowed
            return Response.json(
                { error: 'Failed to save your message. Please try again or contact directly via email.' },
                { status: 500 }
            );
        }

        // STEP 2: Send email notification - OPTIONAL (just a notification)
        // If email fails, we still return success because data is already saved
        let emailSent = false;
        try {
            const emailResult = await sendContactEmail({
                name,
                email,
                subject: subject || '',
                message
            });

            if (emailResult?.success) {
                emailSent = true;
                console.log('✅ Contact email sent successfully to:', process.env.CONTACT_EMAIL || process.env.ADMIN_EMAIL);
            } else {
                console.warn('⚠️ Contact email not sent:', emailResult?.reason || 'Unknown reason');
            }
        } catch (emailErr) {
            console.error('❌ Failed to send contact email:', emailErr);
            console.error('Email error details:', {
                message: emailErr.message,
                stack: emailErr.stack
            });
            // Email is optional - don't fail the request if it doesn't send
        }

        // Send auto-reply to sender (optional, don't fail if this errors)
        try {
            await sendAutoReply({ name, email });
            console.log('✅ Auto-reply sent to sender');
        } catch (autoReplyError) {
            console.warn('⚠️ Auto-reply failed (non-critical):', autoReplyError.message);
        }

        // Log contact for debugging
        console.log('📧 Contact form submission summary:', {
            name,
            email,
            subject: subject || '',
            emailSent,
            savedInDb: true,
            timestamp: new Date().toISOString()
        });

        return Response.json({
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            data: contact
        });
    } catch (error) {
        console.error('Contact form error:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        return Response.json(
            { error: 'Failed to submit contact form. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const contacts = await getAllContacts();
        return Response.json(contacts);
    } catch (error) {
        console.error('Failed to fetch contacts:', error);
        return Response.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}
