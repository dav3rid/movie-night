const app = require('../app');
const request = require('supertest');

const seed = require('../db/seed');
const testData = require('../db/data/test-data/index');
const db = require('../db/connection');

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe('/api/genres', () => {
  describe('GET', () => {
    test('200 - array of genre objects', async () => {
      const {
        body: { genres }
      } = await request(app).get('/api/genres').expect(200);
      expect(genres).toHaveLength(9);
      genres.forEach((genre) => {
        expect(genre).toHaveProperty('genre', expect.any(String));
      });
    });
  });
});
