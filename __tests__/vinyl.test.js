import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import vinyl_model from '../lib/models/vinyl-model.js';

// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE

describe('vinyl routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    // Creates an Album via POST ----------------
    it('creates an album', async () => {
        const firstVinylEntry = { artist: 'future islands', album: 'in evening air', rel_year: 2010, label: '4AD' };
        const res = await request(app).post('/api/v1/vinyl').send(firstVinylEntry);

        expect(res.body).toEqual({
            id: '1',
            ...firstVinylEntry,
        });
    });

    it('gets vinyl by ID', async () => {
        const vinyl = await vinyl_model.insert({
            artist: 'The Cure',
            album: 'Wish',
            rel_year: 1992,
            label: 'Elektra',
        })

        const res = await request(app).get(`/api/v1/vinyl/${vinyl.id}`);

        expect(res.body).toEqual(vinyl);
    })







}) // <--END OF ROOT CODE BLOCK