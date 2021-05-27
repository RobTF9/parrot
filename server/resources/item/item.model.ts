import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

export interface ItemDocument extends Document {
  lang: string;
  pron: string;
  tran: string;
  lexicon: ObjectId;
  createdBy: ObjectId;
  updatedBy: ObjectId | string;
  tags: ObjectId[];
}

const itemSchema = new Schema<ItemDocument, Model<ItemDocument>>(
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
  { timestamps: true, discriminatorKey: 'type', collection: 'item' }
);

itemSchema.index({ createdBy: 1, lang: 1 }, { unique: true });

const Item = model<ItemDocument>('item', itemSchema);

export default Item;
