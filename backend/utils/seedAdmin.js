// Run with: npm run seed:admin
// Creates (or updates) the single admin user from ADMIN_EMAIL / ADMIN_PASSWORD in .env
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

async function run() {
  await connectDB();
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.');
    process.exit(1);
  }

  let user = await User.findOne({ email });
  if (user) {
    user.password = password;
    await user.save();
    console.log(`Updated password for existing admin: ${email}`);
  } else {
    user = await User.create({ name: 'Shenbagapriya N', email, password, role: 'admin' });
    console.log(`Created admin user: ${email}`);
  }
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
