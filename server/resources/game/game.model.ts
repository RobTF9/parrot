import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

interface GameDocument extends Document {
  parrot: ObjectId;
  createdBy: ObjectId;
  updatedBy: ObjectId | string;
  phrases: ObjectId[];
  results: Array<ObjectId & ResultResource>;
}

const gameSchema = new Schema<GameDocument, Model<GameDocument>>(
  {
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
    parrot: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'parrot',
    },
    phrases: {
      type: [{ type: SchemaTypes.ObjectId, ref: 'phrase', required: true }],
      required: true,
    },
    results: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'result',
      },
    ],
  },
  {
    discriminatorKey: 'type',
    collection: 'game',
    timestamps: true,
  }
);

const Game = model<GameDocument>('game', gameSchema);

export default Game;
