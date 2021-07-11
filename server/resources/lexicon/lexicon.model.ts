import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

interface LexiconDocument extends Document {
  language: {
    name: string;
    htmlCode: string;
    langCode: string;
  };
  createdBy: ObjectId;
  sharedWith: ObjectId[];
  goals: {
    words: number;
    games: number;
  };
}

const lexiconSchema = new Schema<LexiconDocument, Model<LexiconDocument>>(
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
      words: Number,
      games: Number,
    },
    sharedWith: [{ type: SchemaTypes.ObjectId, ref: 'user' }],
  },
  { timestamps: true }
);

lexiconSchema.index({ createdBy: 1, language: { name: 1 } }, { unique: true });

const Lexicon = model<LexiconDocument>('lexicon', lexiconSchema);

export default Lexicon;
