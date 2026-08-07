import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  organization: { type: String, default: '' },
  date: { type: String, default: '' },
  type: { type: String, enum: ['award', 'hackathon', 'paper', 'publication'], default: 'award' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Achievement', achievementSchema);
