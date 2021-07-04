import { Document, Model, model, Schema } from 'mongoose';

interface TokenDocument extends Document {
  value: string;
  createdAt: Date;
}

const tokenSchema = new Schema<TokenDocument, Model<TokenDocument>>({
  value: {
    type: String,
  },
  createdAt: {
    default: Date.now,
    type: Date,
    expires: 3600,
  },
});

const Token = model('token', tokenSchema);

export default Token;
