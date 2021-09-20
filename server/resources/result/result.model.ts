import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

interface ResultDocument extends Document {
  parrot: ObjectId;
  createdBy: ObjectId;
  createdAt: Date;
  game: ObjectId & GameResource;
  score: {
    correct: ObjectId[];
    total: number;
  };
  finished: boolean;
  phrases: {
    _id: ObjectId;
    phrase: ObjectId;
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
    parrot: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'parrot',
    },
    game: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'game',
    },
    score: {
      correct: [{ type: SchemaTypes.ObjectId, required: true, ref: 'phrase' }],
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
    phrases: [
      {
        phrase: {
          type: SchemaTypes.ObjectId,
          required: true,
          ref: 'phrase',
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
