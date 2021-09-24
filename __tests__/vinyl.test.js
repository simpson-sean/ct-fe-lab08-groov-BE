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

    it('gets all vinyl', async () => {
        const firstVinyl = await vinyl_model.insert({
            artist: 'Chevelle',
            album: 'Wonder whats next',
            rel_year: 2002,
            label: 'Epic',
        })
        const secondVinyl = await vinyl_model.insert({
            artist: 'The Knife',
            album: 'Deep Cuts',
            rel_year: 2002,
            label: 'Rabid',
        })
        const thirdVinyl = await vinyl_model.insert({
            artist: 'Silversun Pickups',
            album: 'Swoon',
            rel_year: 2010,
            label: 'Danger Bird',
        })

        return request(app)
            .get('/api/v1/vinyl/')
            .then((res) => {
                expect(res.body).toEqual([firstVinyl, secondVinyl, thirdVinyl ]);
            });

    })

    it('updates vinyl by ID', async () => {
        const vinyl = await vinyl_model.insert({
            artist: 'Nirvana',
            album: 'Nevermind',
            rel_year: 2001,
            label: 'DGC Records',
        });

        const res = await request(app)
            .put(`/api/v1/vinyl/${vinyl.id}`)
            .send({ rel_year: 1991 })
        
        expect(res.body).toEqual({ ...vinyl, rel_year: 1991});
    });

    it('deletes vinyl by id', async () => {
        const vinyl = await vinyl_model.insert({
            artist: '311',
            album: '311',
            rel_year: 1995,
            label: 'Capricorn',
        });

        const res = await request(app).delete(`/api/v1/vinyl/${vinyl.id}`);

        expect(res.body).toEqual({
            message: `${vinyl.artist} - ${vinyl.album} has been removed from the catalog.`
        });
    })







}) // <--END OF ROOT CODE BLOCK