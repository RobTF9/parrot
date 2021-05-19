import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

interface WordDocument extends Document {
  lang: string;
  pron: string;
  tran: string;
  lexicon: ObjectId;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  tags: ObjectId[];
}

const wordSchema = new Schema<WordDocument, Model<WordDocument>>(
  {
    lang: {
      type: String,
      required: true,
    },
    pron: {
      type: String,
      required: true,
    },
    tran: {
      type: String,
      required: true,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    lexicon: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'lexicon',
    },
    tags: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'tag',
      },
    ],
  },
  { timestamps: true }
);

wordSchema.index({ createdBy: 1, lang: 1 }, { unique: true });

const Word = model<WordDocument>('word', wordSchema);

export default Word;
