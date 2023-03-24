const app = require('../app');
const request = require('supertest');

const seed = require('../db/seed');
const testData = require('../db/data/test-data/index');
const db = require('../db/connection');

beforeEach(() => seed(testData));

afterAll(() => db.end());

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
});
