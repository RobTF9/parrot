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
  sentences: ObjectId[];
  words?: ObjectId[];
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
    results: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'results',
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

export const Conversation = Game.discriminator(
  'conversation',
  new Schema<GameDocument, Model<GameDocument>>({
    sentences: [
      { type: SchemaTypes.ObjectId, required: true, ref: 'sentence' },
    ],
  })
);

export const List = Game.discriminator(
  'list',
  new Schema<GameDocument, Model<GameDocument>>({
    sentences: [
      { type: SchemaTypes.ObjectId, required: true, ref: 'sentence' },
    ],
    words: [{ type: SchemaTypes.ObjectId, required: true, ref: 'word' }],
  })
);

export default Game;
