import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../server/utils/constants';

const users = [
  {
    email: 'email@email.com',
    password: 'password',
  },
];

let parrots = [];

export const signUpAndCreateParrot = [
  rest.get('/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        auth: false,
      })
    );
  }),

  rest.post('/auth/signup', (req, res, ctx) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
      return res(
        ctx.json({
          message: ERROR_MESSAGE.NEED_EMAIL_AND_PASSWORD,
          auth: false,
        })
      );
    }

    users.push(req.body);

    return res(
      ctx.json({ auth: true, message: SUCCESS_MESSAGE.SIGN_UP_SUCCESSFUL })
    );
  }),

  rest.get('/api/parrot', (req, res, ctx) => {
    return res(
      ctx.json({
        data: parrots,
      })
    );
  }),

  rest.get('/api/parrot/undefined', (req, res, ctx) => {
    return res(
      ctx.json({
        parrot: {
          ...parrots[0],
          _id: 1,
        },
      })
    );
  }),

  rest.post('/api/parrot', (req, res, ctx) => {
    parrots = [...parrots, { ...req.body, _id: 1 }];
    return res(
      ctx.json({
        data: {
          ...req.body,
        },
      })
    );
  }),

  rest.get('/api/progress', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          phrase: {
            goal: 10,
            added: 0,
          },
          games: {
            goal: 1,
            finished: 0,
          },
        },
      })
    );
  }),

  rest.get('/api/user', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          ...users[0],
        },
      })
    );
  }),

  rest.get('/api/phrase', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [],
      })
    );
  }),

  rest.post('/api/translate', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [['Fish', 'মাছ']],
      })
    );
  }),

  rest.post('/api/phrase', (req, res, ctx) => {
    return res(
      ctx.json({
        data: { ...req.body },
      })
    );
  }),
];

export const authServer = setupServer(...signUpAndCreateParrot);
