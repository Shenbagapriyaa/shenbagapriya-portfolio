import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  originalName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Resume', resumeSchema);
