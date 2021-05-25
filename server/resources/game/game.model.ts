import { model, Schema, SchemaTypes } from 'mongoose';

const gameSchema = new Schema(
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
  },
  {
    discriminatorKey: 'type',
    collection: 'game',
    timestamps: true,
  }
);

const Game = model('game', gameSchema);

// Conversation mode
export const Conversation = Game.discriminator(
  'conversation',
  new Schema({
    sentences: [
      { type: SchemaTypes.ObjectId, required: true, ref: 'sentence' },
    ],
  })
);

// Grid or Sequence mode
export const List = Game.discriminator(
  'list',
  new Schema({
    sentences: [
      { type: SchemaTypes.ObjectId, required: true, ref: 'sentence' },
    ],
    words: [{ type: SchemaTypes.ObjectId, required: true, ref: 'word' }],
  })
);

export default Game;
// ? When you're looking at results don't worry about maintaing two seperate arrays
// ? Best bet would be to just dump the data as it was during that specific instance of game
