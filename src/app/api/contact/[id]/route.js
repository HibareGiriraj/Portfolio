import { deleteContact, updateContact, getContactById } from '@/lib/contacts';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// DELETE contact message
export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const deleted = await deleteContact(id);

        if (!deleted) {
            return Response.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        return Response.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Failed to delete message:', error);
        return Response.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        );
    }
}

// Mark as read
export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        const contact = await updateContact(id, { read: body.read });

        if (!contact) {
            return Response.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        return Response.json(contact);
    } catch (error) {
        console.error('Failed to update message:', error);
        return Response.json(
            { error: 'Failed to update message' },
            { status: 500 }
        );
    }
}
