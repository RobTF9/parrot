import {
  Document,
  Model,
  model,
  ObjectId,
  Schema,
  SchemaTypes,
} from 'mongoose';

interface TagDocument extends Document {
  value: string;
  parrot: ObjectId;
  phrases: ObjectId[];
}

const tagSchema = new Schema<TagDocument, Model<TagDocument>>(
  {
    value: {
      type: String,
      required: true,
    },
    parrot: {
      type: SchemaTypes.ObjectId,
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
    phrases: [
      {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'phrase',
      },
    ],
  },
  { timestamps: true, discriminatorKey: 'type', collection: 'tag' }
);

const Tag = model('tags', tagSchema);

export default Tag;
