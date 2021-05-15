import session from 'supertest-session';
import User from '../../../server/resources/user/user.model';
import { app } from '../../../server/server';
import { SUCCESS_MESSAGE } from '../../../server/utils/constants';

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

describe('User resource...', () => {
  test('can get the active user', async () => {
    const response = await authSession.get('/api/user');

    expect(response.body.data._id).toBe(userId);
    expect(response.statusCode).toBe(200);
  });

  test('can update the active user', async () => {
    const response = await authSession
      .put('/api/user')
      .send({ email: 'updated@email.com', password: 'updated' });

    expect(response.body.message).toStrictEqual(SUCCESS_MESSAGE.USER_UPDATED);
    expect(response.body.data.email).toBe('updated@email.com');
    expect(response.statusCode).toBe(200);
  });
});
