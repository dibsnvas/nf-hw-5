import mongoose, { Document, Schema } from 'mongoose';

interface IRefreshToken extends Document {
  token: string;
  user: mongoose.Schema.Types.ObjectId;
}

const RefreshTokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
