import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  duration: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Experience = (mongoose.models.Experience ||
  mongoose.model<IExperience>('Experience', ExperienceSchema)) as mongoose.Model<IExperience>;
