import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  grade: { type: String, default: '' },
  date: { type: String, default: '' },
  certificateFile: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
