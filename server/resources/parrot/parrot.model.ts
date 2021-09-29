import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

interface ParrotDocument extends Document {
  language: {
    name: string;
    htmlCode: string;
    langCode: string;
  };
  createdBy: ObjectId;
  sharedWith: ObjectId[];
  goals: {
    phrase: number;
    games: number;
  };
  streak: {
    date: string;
    number: number;
  };
}

const parrotSchema = new Schema<ParrotDocument, Model<ParrotDocument>>(
  {
    language: {
      name: {
        type: String,
        required: true,
      },
      htmlCode: {
        type: String,
        required: true,
      },
      langCode: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    goals: {
      phrase: { type: Number, required: true },
      games: { type: Number, required: true },
    },
    streak: {
      date: { type: String },
      number: { type: Number },
    },
    sharedWith: [{ type: SchemaTypes.ObjectId, ref: 'user' }],
  },
  { timestamps: true }
);

parrotSchema.index({ createdBy: 1, language: { name: 1 } }, { unique: true });

const Parrot = model<ParrotDocument>('parrot', parrotSchema);

export default Parrot;
