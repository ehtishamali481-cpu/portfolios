import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  image?: string;
  tech: string[];
  github?: string;
  link?: string;
  testCasesLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, default: 'Full Stack' },
    image: { type: String, trim: true, default: '' },
    tech: { type: [String], default: [] },
    github: { type: String, trim: true, default: '' },
    link: { type: String, trim: true, default: '' },
    testCasesLink: { type: String, trim: true, default: '' },
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

export const Project = (mongoose.models.Project ||
  mongoose.model<IProject>('Project', ProjectSchema)) as mongoose.Model<IProject>;
