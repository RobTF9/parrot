import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

interface TagDocument extends Document {
  tag: string;
  createdBy: ObjectId;
  lexicon: ObjectId;
  color: string;
}

const tagSchema = new Schema<TagDocument, Model<TagDocument>>(
  {
    tag: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: 'blue',
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
  },
  { timestamps: true }
);

tagSchema.index({ createdBy: 1, tag: 1 }, { unique: true });

const Tag = model<TagDocument>('tag', tagSchema);

export default Tag;
