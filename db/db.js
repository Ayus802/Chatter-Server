const mongoose = require('mongoose');
require('dotenv').config();

// Build a list of candidate URIs to try. The app will prefer the explicit
// MONGO_URI environment variable if provided, then try common fallbacks.
const dbName = process.env.MONGO_DB_NAME || 'chatterDb';
const envUri = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : null;
const candidates = [];
if (envUri) candidates.push(envUri);
// When running inside Docker on Windows/Mac, host.docker.internal can be used
// to reach services running on the host machine.
candidates.push(`mongodb://host.docker.internal:27017/${dbName}`);
// Try IPv4 loopback before hostnames that may resolve to IPv6 (::1)
candidates.push(`mongodb://127.0.0.1:27017/${dbName}`);
candidates.push(`mongodb://localhost:27017/${dbName}`);

async function tryConnect(uri, attempts = 3, delayMs = 2000) {
    for (let i = 1; i <= attempts; i++) {
        try {
            console.log(`Attempt ${i}/${attempts} connecting to MongoDB at ${uri}...`);
            // Mongoose v6+ sets sensible defaults; explicit options may be added if needed.
            await mongoose.connect(uri);
            console.log(`MongoDB connected successfully to ${uri}`);
            return;
        } catch (err) {
            console.error(`Connection attempt ${i} to ${uri} failed: ${err.message}`);
            if (i < attempts) {
                await new Promise((res) => setTimeout(res, delayMs));
            }
        }
    }
    throw new Error(`Failed to connect to MongoDB at ${uri} after ${attempts} attempts`);
}

async function connectDB() {
    const tried = new Set();
    for (const uri of candidates) {
        if (!uri || tried.has(uri)) continue;
        tried.add(uri);
        try {
            await tryConnect(uri);
            // Connected successfully, done.
            return;
        } catch (err) {
            // Try the next candidate
            console.warn(err.message);
        }
    }

    console.error('MongoDB connection failed: tried all candidate URIs.');
    console.error('Recommendations:');
    console.error('- Ensure MongoDB is running on the expected host and port (default 27017).');
    console.error("- If you run this app inside Docker: start a MongoDB container and use a docker network (e.g. set MONGO_URI=mongodb://mongo:27017/<db>),");
    console.error("  or set MONGO_URI to 'mongodb://host.docker.internal:27017/<db>' to connect from Docker to a MongoDB running on the host (Windows/Mac).");
    process.exit(1);
}

module.exports = connectDB;