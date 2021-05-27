import { Model, Schema } from 'mongoose';
import Item, { ItemDocument } from '../item/item.model';

export const Word = Item.discriminator(
  'word',
  new Schema<ItemDocument, Model<ItemDocument>>()
);

export default Word;
