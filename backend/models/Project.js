import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  features: [{ type: String }],
  image: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
