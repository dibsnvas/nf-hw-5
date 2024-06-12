import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  date: Date;
  city: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  city: { type: String, required: true },
});

export default mongoose.model<IEvent>('Event', EventSchema);
