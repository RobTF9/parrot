import session from 'supertest-session';
import User from '../../../server/resources/user/user.model';
import Parrot from '../../../server/resources/parrot/parrot.model';
import { app } from '../../../server/server';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '../../../server/utils/constants';

let authSession;
let userId;

beforeEach(async () => {
  const user = await User.create({
    username: 'user',
    email: 'email@email.com',
    password: 'password',
  });

  userId = user._id.toString();

  authSession = await session(app);

  await authSession
    .post('/auth/signin')
    .send({ email: 'email@email.com', password: 'password' });
});

const language = {
  name: 'Bengali',
  htmlCode: 'bn',
  langCode: 'bn-BD',
};

describe('Parrot resource...', () => {
  test('can create a new parrot', async () => {
    const response = await authSession.post('/api/parrot').send({
      language,
    });

    expect(response.body.data.createdBy).toBe(userId);
    expect(response.body.data.language).toStrictEqual(language);
    expect(response.statusCode).toBe(201);
  });

  test('error if trying to create duplicate for language', async () => {
    await Parrot.create({
      createdBy: userId,
      language,
    });

    const response = await authSession.post('/api/parrot').send({
      language,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toStrictEqual(ERROR_MESSAGE.LEXICON_EXISTS);
  });

  test('can get an array of your parrots', async () => {
    const parrot = await Parrot.create({
      createdBy: userId,
      language,
    });

    const response = await authSession.get('/api/parrot');

    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].language).toStrictEqual(
      parrot.toObject().language
    );
  });

  test('can activate a session parrot', async () => {
    const parrot = await Parrot.create({
      createdBy: userId,
      language,
    });

    const response = await authSession.get(`/api/parrot/${parrot._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toStrictEqual(
      SUCCESS_MESSAGE.LEXICON_ACTIVATED
    );
    expect(response.body.parrot).toStrictEqual({
      _id: parrot._id.toString(),
      language,
    });
  });

  test('can share a parrot with another user', async () => {
    await User.create({
      username: 'other',
      email: 'other@email.com',
      password: 'password',
    });

    const parrot = await Parrot.create({
      createdBy: userId,
      language,
    });

    const response = await authSession
      .put(`/api/parrot/${parrot._id}`)
      .send({ email: 'other@email.com' });

    expect(response.body.message).toStrictEqual(SUCCESS_MESSAGE.LEXICON_SHARED);
    expect(response.statusCode).toBe(200);
  });

  test('error if share parrot without email', async () => {
    const response = await authSession.put(`/api/parrot/id`).send();

    expect(response.body.message).toStrictEqual(
      ERROR_MESSAGE.EMAIL_ADDRESS_REQUIRED
    );
    expect(response.statusCode).toBe(400);
  });

  test('error if share parrot without non existent user', async () => {
    const response = await authSession
      .put(`/api/parrot/id`)
      .send({ email: 'bob@bob.com' });

    expect(response.body.message).toStrictEqual(
      ERROR_MESSAGE.EMAIL_ADDRESS_DOESNT_EXIST
    );
    expect(response.statusCode).toBe(400);
  });

  test('error if share parrot with self', async () => {
    const parrot = await Parrot.create({
      createdBy: userId,
      language,
    });

    const response = await authSession
      .put(`/api/parrot/${parrot._id}`)
      .send({ email: 'email@email.com' });

    expect(response.body.message).toStrictEqual(
      ERROR_MESSAGE.CANT_SHARE_WITH_SELF
    );
    expect(response.statusCode).toBe(400);
  });

  test('cant share parrot twice with same user', async () => {
    const user = await User.create({
      username: 'other',
      email: 'other@email.com',
      password: 'password',
    });

    const parrot = await Parrot.create({
      createdBy: userId,
      language,
      sharedWith: [`${user._id}`],
    });

    const response = await authSession
      .put(`/api/parrot/${parrot._id}`)
      .send({ email: 'other@email.com' });

    expect(response.body.message).toStrictEqual(ERROR_MESSAGE.ALREADY_SHARED);
    expect(response.statusCode).toBe(400);
  });

  test('error if parrot doesnt exist', async () => {
    await User.create({
      username: 'other',
      email: 'other@email.com',
      password: 'password',
    });

    const response = await authSession
      .put(`/api/parrot/12345`)
      .send({ email: 'other@email.com' });

    expect(response.statusCode).toBe(500);
  });

  test('can get all parrots shared with you', async () => {
    const user = await User.create({
      username: 'other',
      email: 'other@email.com',
      password: 'password',
    });

    await Parrot.create({
      createdBy: user._id,
      language,
      sharedWith: [`${userId}`],
    });

    const response = await authSession.get(`/api/parrot/shared`);
    expect(response.statusCode).toBe(200);
  });
});
