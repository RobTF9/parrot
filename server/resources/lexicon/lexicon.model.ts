import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

export interface LexiconDocument extends Document {
  language: {
    name: string;
    htmlCode: string;
    langCode: string;
  };
  createdBy: ObjectId;
  sharedWith: ObjectId[];
}

const lexiconsSchema = new Schema<LexiconDocument, Model<LexiconDocument>>(
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
    },
    sharedWith: [{ type: SchemaTypes.ObjectId }],
  },
  { timestamps: true }
);

const Lexicon = model<LexiconDocument>('lexicon', lexiconsSchema);
export default Lexicon;
