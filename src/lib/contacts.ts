import { ObjectId } from 'mongodb';
import { getContactsCollection } from './mongodb';

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Helper to map MongoDB document to Contact interface
function mapDocToContact(doc: any): Contact {
  return {
    id: (doc._id || doc.id).toString(),
    name: doc.name,
    email: doc.email,
    subject: doc.subject || '',
    message: doc.message,
    read: doc.read ?? false,
    createdAt: doc.createdAt || new Date().toISOString(),
  };
}

// Read all contacts from MongoDB
export async function getAllContacts(): Promise<Contact[]> {
  try {
    const collection = await getContactsCollection();
    const docs = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return docs.map(mapDocToContact);
  } catch (error) {
    console.error('Error fetching contacts from MongoDB:', error);
    return [];
  }
}

// Get contact by ID
export async function getContactById(id: string): Promise<Contact | null> {
  try {
    const collection = await getContactsCollection();
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    return doc ? mapDocToContact(doc) : null;
  } catch (error) {
    console.error('Error fetching contact by id from MongoDB:', error);
    return null;
  }
}

// Add a new contact
export async function addContact(
  contact: Omit<Contact, 'id' | 'read' | 'createdAt'>
): Promise<Contact> {
  const newContact: Omit<Contact, 'id'> = {
    ...contact,
    read: false,
    createdAt: new Date().toISOString(),
  };

  try {
    const collection = await getContactsCollection();
    const result = await collection.insertOne({
      ...newContact,
      createdAt: newContact.createdAt,
    });

    return {
      ...newContact,
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error('Error adding contact to MongoDB:', error);
    // Fallback: return contact with a generated id so the API still responds
    return {
      ...newContact,
      id: new ObjectId().toString(),
    };
  }
}

// Update a contact (e.g., mark as read)
export async function updateContact(
  id: string,
  updates: Partial<Contact>
): Promise<Contact | null> {
  try {
    const collection = await getContactsCollection();
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    const updated = await collection.findOne({ _id: new ObjectId(id) });
    return updated ? mapDocToContact(updated) : null;
  } catch (error) {
    console.error('Error updating contact in MongoDB:', error);
    return null;
  }
}

// Delete a contact
export async function deleteContact(id: string): Promise<boolean> {
  try {
    const collection = await getContactsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  } catch (error) {
    console.error('Error deleting contact from MongoDB:', error);
    return false;
  }
}
