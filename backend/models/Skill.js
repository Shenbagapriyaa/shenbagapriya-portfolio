import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Programming, Frontend, Backend, Database, Tools
  name: { type: String, required: true },
  proficiency: { type: Number, min: 0, max: 100, default: 70 },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
