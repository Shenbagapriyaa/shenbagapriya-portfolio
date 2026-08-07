import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  companyLogo: { type: String, default: '' },
  startDate: { type: String, required: true },
  endDate: { type: String, default: 'Present' },
  responsibilities: [{ type: String }],
  technologies: [{ type: String }],
  achievements: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
