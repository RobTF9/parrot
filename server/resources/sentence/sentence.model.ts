import { Model, Schema } from 'mongoose';
import Item, { ItemDocument } from '../item/item.model';

const Sentence = Item.discriminator(
  'sentence',
  new Schema<ItemDocument, Model<ItemDocument>>()
);

export default Sentence;
