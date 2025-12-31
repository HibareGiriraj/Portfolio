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

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'contacts.json');

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
    const contacts = getAllContacts();
    const newId = (Math.max(...contacts.map(c => parseInt(c.id)), 0) + 1).toString();
    const newContact: Contact = {
        ...contact,
        id: newId,
        read: false,
        createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 4));
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
