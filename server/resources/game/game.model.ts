import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

interface GameDocument extends Document {
  lexicon: ObjectId;
  createdBy: ObjectId;
  updatedBy: ObjectId | string;
  name: string;
  mode: string;
  type: string;
  items: ObjectId[];
  results: Array<ObjectId & ResultResource>;
}

const gameSchema = new Schema<GameDocument, Model<GameDocument>>(
  {
    name: {
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
    mode: {
      type: String,
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
    items: {
      type: [{ type: SchemaTypes.ObjectId, ref: 'item', required: true }],
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
