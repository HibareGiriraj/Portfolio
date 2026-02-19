import { MongoClient, Db, Collection } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// Use exact case from environment variable to avoid case-sensitivity issues
// MongoDB is case-sensitive: "Portfolio" != "portfolio"
const DEFAULT_DB_NAME = process.env.MONGODB_DB || 'Portfolio';

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db(DEFAULT_DB_NAME);
  return cachedDb;
}

export async function getContactsCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection('contacts');
}


