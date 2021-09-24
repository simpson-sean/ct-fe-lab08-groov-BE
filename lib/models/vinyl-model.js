import pool from "../utils/pool.js";

export default class vinyl_model {
    id;
    artist;
    album;
    rel_year;
    label;

    constructor(row) {
        this.id = row.id;
        this.artist = row.artist;
        this.album = row.album;
        this.rel_year = row.rel_year;
        this.label = row.label

    }

    static async insert({ artist, album, rel_year, label }) {
        const { rows } = await pool.query(
            'INSERT INTO vinyl (artist, album, rel_year, label) VALUES ($1, $2, $3, $4) RETURNING *',
            [artist, album, rel_year, label]
        );

        return new vinyl_model(rows[0]);
    };

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM vinyl WHERE id=$1', [id]);

        return new vinyl_model(rows[0]);
    };

    static async getAllVinyl() {
        const { rows } = await pool.query('SELECT * FROM vinyl');

        return rows.map((row) => new vinyl_model(row));
    }





} // <--- END ROOT CODE BLOCK
