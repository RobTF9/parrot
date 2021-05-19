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
}

const tagSchema = new Schema<TagDocument, Model<TagDocument>>({
  tag: {
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
});

tagSchema.index({ createdBy: 1, tag: 1 }, { unique: true });

const Tag = model<TagDocument>('tag', tagSchema);

export default Tag;
