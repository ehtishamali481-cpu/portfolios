import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPageView extends Document {
  deviceId: string;
  device: 'Mobile' | 'Desktop' | 'Tablet' | 'Other';
  browser: string;
  os: string;
  country: string;
  countryCode: string;
  city: string;
  ip: string;
  path: string;
  referrer: string;
  screenResolution: string;
  userAgent: string;
  sessionId: string;
  visitCount: number;
  lastVisitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PageViewSchema: Schema<IPageView> = new Schema(
  {
    deviceId: {
      type: String,
      default: '',
      trim: true,
    },
    device: {
      type: String,
      enum: ['Mobile', 'Desktop', 'Tablet', 'Other'],
      default: 'Desktop',
    },
    browser: {
      type: String,
      default: 'Other',
    },
    os: {
      type: String,
      default: 'Other',
    },
    country: {
      type: String,
      default: 'Unknown',
    },
    countryCode: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: 'Unknown',
    },
    ip: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '/',
    },
    referrer: {
      type: String,
      default: '',
    },
    screenResolution: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
    sessionId: {
      type: String,
      default: '',
    },
    visitCount: {
      type: Number,
      default: 1,
    },
    lastVisitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

PageViewSchema.index({ deviceId: 1 });
PageViewSchema.index({ createdAt: -1 });
PageViewSchema.index({ lastVisitedAt: -1 });
PageViewSchema.index({ device: 1 });
PageViewSchema.index({ country: 1 });
PageViewSchema.index({ ip: 1 });

const PageView: Model<IPageView> =
  mongoose.models.PageView || mongoose.model<IPageView>('PageView', PageViewSchema);

export default PageView;
