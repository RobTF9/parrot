import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

interface ResultDocument extends Document {
  lexicon: ObjectId;
  createdBy: ObjectId;
  game: ObjectId | string;
  score: {
    correct: ObjectId[];
    total: number;
  };
  finished: boolean;
  items: {
    item: ObjectId;
    attempts: number;
    correct: boolean;
    skipped: boolean;
  }[];
}

const resultSchema = new Schema<ResultDocument, Model<ResultDocument>>(
  {
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
    game: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'game',
    },
    score: {
      correct: [{ type: SchemaTypes.ObjectId, required: true, ref: 'item' }],
      total: {
        type: Number,
        required: true,
      },
    },
    finished: {
      type: Boolean,
      required: true,
      default: false,
    },
    items: [
      {
        item: {
          type: SchemaTypes.ObjectId,
          required: true,
          ref: 'item',
        },
        attempts: {
          type: Number,
          required: true,
          default: 0,
        },
        correct: {
          type: Boolean,
          required: true,
          default: false,
        },
        skipped: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Result = model<ResultDocument>('result', resultSchema);

export default Result;
