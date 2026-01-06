import fs from 'fs';
import path from 'path';

export interface Contact {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
}

// Use process.cwd() for production, but handle both dev and production paths
const getDataFilePath = () => {
    const basePath = process.cwd();
    // Try multiple possible paths
    const possiblePaths = [
        path.join(basePath, 'src', 'data', 'contacts.json'),
        path.join(basePath, 'data', 'contacts.json'),
        path.join(basePath, '.next', 'server', 'src', 'data', 'contacts.json'),
    ];
    
    // Return the first path that exists, or the first one as default
    for (const filePath of possiblePaths) {
        if (fs.existsSync(filePath)) {
            return filePath;
        }
    }
    // Default to the standard path
    return path.join(basePath, 'src', 'data', 'contacts.json');
};

const DATA_FILE = getDataFilePath();

// Read all contacts from JSON file
export function getAllContacts(): Contact[] {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading contacts file:', error);
        return [];
    }
}

// Get contact by ID
export function getContactById(id: string): Contact | undefined {
    return getAllContacts().find(c => c.id === id);
}

// Add a new contact
export function addContact(contact: Omit<Contact, 'id' | 'read' | 'createdAt'>): Contact {
    const newId = Date.now().toString();
    const newContact: Contact = {
        ...contact,
        id: newId,
        read: false,
        createdAt: new Date().toISOString()
    };
    
    try {
        const contacts = getAllContacts();
        // Update ID to be sequential if possible
        const maxId = Math.max(...contacts.map(c => parseInt(c.id) || 0), 0);
        newContact.id = (maxId + 1).toString();
        
        contacts.push(newContact);
        
        // Ensure directory exists
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            try {
                fs.mkdirSync(dir, { recursive: true });
            } catch (mkdirError) {
                console.warn('Could not create directory:', mkdirError);
            }
        }
        
        // Try to write file - may fail in serverless environments
        try {
            fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 4), 'utf-8');
        } catch (writeError) {
            // In production/serverless, file writes may not work
            // Log the error but don't fail - the contact object is still valid
            console.warn('Could not write to contacts file (this is normal in serverless environments):', writeError);
            console.log('Contact data (consider using a database or email service):', JSON.stringify(newContact, null, 2));
        }
    } catch (error) {
        console.error('Error in addContact:', error);
        // Return the contact anyway - it's valid data even if we can't save it
    }
    
    return newContact;
}

// Update a contact (e.g., mark as read)
export function updateContact(id: string, updates: Partial<Contact>): Contact | null {
    const contacts = getAllContacts();
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) return null;

    contacts[index] = { ...contacts[index], ...updates };
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 4));
    return contacts[index];
}

// Delete a contact
export function deleteContact(id: string): boolean {
    const contacts = getAllContacts();
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) return false;

    contacts.splice(index, 1);
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 4));
    return true;
}
