const app = require('../app');
const request = require('supertest');

const seed = require('../db/seed');
const testData = require('../db/data/test-data/index');
const db = require('../db/connection');

beforeEach(() => seed(testData));

afterAll(() => db.end());

test('404 - path not found', async () => {
  const {
    body: { msg }
  } = await request(app).get('/api/gibberish').expect(404);
  expect(msg).toBe('path not found');
});

describe('/api/genres', () => {
  describe('GET', () => {
    test('200 - array of genre objects - sorted by genre ascending by default', async () => {
      const {
        body: { genres }
      } = await request(app).get('/api/genres').expect(200);
      expect(genres).toHaveLength(9);
      genres.forEach((genre) => {
        expect(genre).toHaveProperty('genre', expect.any(String));
      });
      expect(genres).toBeSortedBy('genre');
    });
    describe('accepts order query', () => {
      test('200 - asc', async () => {
        const {
          body: { genres }
        } = await request(app)
          .get('/api/genres')
          .query({ order: 'asc' })
          .expect(200);
        expect(genres).toHaveLength(9);
        expect(genres).toBeSortedBy('genre');
      });
      test('200 - desc', async () => {
        const {
          body: { genres }
        } = await request(app)
          .get('/api/genres')
          .query({ order: 'desc' })
          .expect(200);
        expect(genres).toHaveLength(9);
        expect(genres).toBeSortedBy('genre', { descending: true });
      });
      test('400 - invalid order value', async () => {
        const {
          body: { msg }
        } = await request(app)
          .get('/api/genres')
          .query({ order: 'random_stuff' })
          .expect(400);
        expect(msg).toBe('bad request');
      });
    });
  });
  describe('POST', () => {
    test('201 - accepts new genre and responds', async () => {
      const newGenre = {
        genre: 'test_genre'
      };
      const {
        body: { genre }
      } = await request(app).post('/api/genres').send(newGenre).expect(201);
      expect(genre).toHaveProperty('genre', 'test_genre');
      expect(genre).toHaveProperty('genre_id', 10);
    });
    test('400 - missing request body properties', async () => {
      const newGenre = {};
      const {
        body: { msg }
      } = await request(app).post('/api/genres').send(newGenre).expect(400);
      expect(msg).toBe('bad request');
    });
  });
  test('405 - method not allowed', async () => {
    const invalidMethods = ['put', 'patch', 'delete'];
    const invalidMethodPromises = invalidMethods.map(async (method) => {
      const {
        body: { msg }
      } = await request(app)[method]('/api/genres').expect(405);
      expect(msg).toBe('method not allowed');
    });
    await Promise.all(invalidMethodPromises);
  });
});

describe('/api/genres/:genre_id', () => {
  describe('GET', () => {
    test('200 - genre object', async () => {
      const {
        body: { genre }
      } = await request(app).get('/api/genres/1').expect(200);
      expect(genre).toHaveProperty('genre_id', 1);
      expect(genre).toHaveProperty('genre', 'adventure');
    });
    test('404 - genre not found', async () => {
      const {
        body: { msg }
      } = await request(app).get('/api/genres/1000').expect(404);
      expect(msg).toBe('genre not found');
    });
    test('400 - invalid genre_id', async () => {
      const {
        body: { msg }
      } = await request(app).get('/api/genres/invalid').expect(400);
      expect(msg).toBe('bad request');
    });
  });
  describe('PATCH', () => {
    test('200 - accepts updated genre and responds', async () => {
      const updatedGenre = {
        genre: 'test_updated_genre'
      };
      const {
        body: { genre }
      } = await request(app)
        .patch('/api/genres/1')
        .send(updatedGenre)
        .expect(200);
      expect(genre).toHaveProperty('genre', 'test_updated_genre');
      expect(genre).toHaveProperty('genre_id', 1);
    });
    test('200 - ignores additional properties', async () => {
      const updatedGenre = {
        genre: 'test_updated_genre',
        randomVal: true
      };
      const {
        body: { genre }
      } = await request(app)
        .patch('/api/genres/7')
        .send(updatedGenre)
        .expect(200);
      expect(genre).toHaveProperty('genre', 'test_updated_genre');
      expect(genre).toHaveProperty('genre_id', 7);
    });
    test('200 - responds with original genre if no new genre is provided', async () => {
      const updatedGenre = {};
      const {
        body: { genre }
      } = await request(app)
        .patch('/api/genres/1')
        .send(updatedGenre)
        .expect(200);
      expect(genre).toHaveProperty('genre', 'adventure');
      expect(genre).toHaveProperty('genre_id', 1);
    });
    test('404 - genre not found', async () => {
      const updatedGenre = {
        genre: 'test_updated_genre'
      };
      const {
        body: { msg }
      } = await request(app)
        .patch('/api/genres/1000')
        .send(updatedGenre)
        .expect(404);
      expect(msg).toBe('genre not found');
    });
    test('400 - invalid genre+id', async () => {
      const updatedGenre = {
        genre: 'test_updated_genre'
      };
      const {
        body: { msg }
      } = await request(app)
        .patch('/api/genres/invalid')
        .send(updatedGenre)
        .expect(400);
      expect(msg).toBe('bad request');
    });
  });
  test('405 - method not allowed', async () => {
    const invalidMethods = ['post', 'put', 'delete'];
    const invalidMethodPromises = invalidMethods.map(async (method) => {
      const {
        body: { msg }
      } = await request(app)[method]('/api/genres/1').expect(405);
      expect(msg).toBe('method not allowed');
    });
    await Promise.all(invalidMethodPromises);
  });
});

describe('/api/certificates', () => {
  describe('GET', () => {
    test('200 - certificate objects', async () => {
      const {
        body: { certificates }
      } = await request(app).get('/api/certificates').expect(200);
      expect(certificates).toEqual([
        { certificate_id: 1, certificate: 'U' },
        { certificate_id: 2, certificate: 'PG' },
        { certificate_id: 3, certificate: '12' },
        { certificate_id: 4, certificate: '15' },
        { certificate_id: 5, certificate: '18' }
      ]);
    });
  });
  test('405 - method not allowed', async () => {
    const invalidMethods = ['post', 'put', 'patch', 'delete'];
    const invalidMethodPromises = invalidMethods.map(async (method) => {
      const {
        body: { msg }
      } = await request(app)[method]('/api/certificates').expect(405);
      expect(msg).toBe('method not allowed');
    });
    await Promise.all(invalidMethodPromises);
  });
});

describe('/api/movies', () => {});
