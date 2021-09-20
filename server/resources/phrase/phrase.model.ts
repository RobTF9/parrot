import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

export interface PhraseDocument extends Document {
  lang: string;
  pron: string;
  tran: string;
  lexicon: ObjectId;
  createdBy: ObjectId;
  createdAt: Date;
  updatedBy: ObjectId | string;
  tags: ObjectId[];
}

const phraseSchema = new Schema<PhraseDocument, Model<PhraseDocument>>(
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
    updatedBy: {
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
  { timestamps: true, discriminatorKey: 'type', collection: 'phrase' }
);

phraseSchema.index({ createdBy: 1, lang: 1 }, { unique: true });

const Phrase = model<PhraseDocument>('phrase', phraseSchema);

export default Phrase;
