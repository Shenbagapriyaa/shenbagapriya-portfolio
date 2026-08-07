import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Shenbagapriya N' },
  tagline: { type: String, default: 'Software Developer' },
  roles: [{ type: String }],
  bio: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  leetcode: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  openToWork: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
