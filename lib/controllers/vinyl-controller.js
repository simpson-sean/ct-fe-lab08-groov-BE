import { Router } from 'express';
import vinyl_model from '../models/vinyl-model.js';
import Vinyl from '../models/vinyl-model.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const vinyl =await Vinyl.insert(req.body);

            res.send(vinyl);
        }
        catch(err) {
            next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
             const vinylById = await vinyl_model.getById(id);

             res.send(vinylById);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const vinyl = await vinyl_model.getAllVinyl();

            res.send(vinyl);
        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { artist, album, rel_year, label } = req.body;

            const updatedVinyl = await vinyl_model.updateVinylById(id, { artist, album, rel_year, label });

            res.send(updatedVinyl);
        } catch(err) {
            next(err);
        }
    })

