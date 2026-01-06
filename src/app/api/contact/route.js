import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getAllContacts, addContact } from '@/lib/contacts';

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

        // Save to JSON file
        const contact = addContact({
            name,
            email,
            subject: subject || '',
            message
        });

        return Response.json({
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            data: contact
        });
    } catch (error) {
        console.error('Contact form error:', error);
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

        const contacts = getAllContacts().sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return Response.json(contacts);
    } catch (error) {
        console.error('Failed to fetch contacts:', error);
        return Response.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}
