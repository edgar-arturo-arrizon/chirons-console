import express from 'express';
import pool from '../db.js';
import authorization from '../middleware/authorization.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', authorization, async (req, res) => {
  try {
    console.log('dashboardRouter: GET request', req.trainer)
    const trainer = await pool.query(
      "SELECT * FROM trainers WHERE trainer_id = $1",
      [req.trainer]
    );
    const clients = await pool.query(
      "SELECT * FROM clients WHERE trainer_id = $1", [req.trainer]
    );

    res.json([trainer.rows[0].first_name, clients.rows]);
  } catch (err) {
    console.error('Error at dashboard router, `/` GET route', err.message);
    res.status(500).send("Server error");
  }
});

dashboardRouter.post('/clients', authorization, async (req, res) => {
  try {
    console.log(req.body);
    const { first, last, email } = req.body;
    const newClient = await pool.query(
      "INSERT INTO clients (first_name, last_name, email, trainer_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [first, last, email, req.trainer]
    );

    res.json(newClient.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


export default dashboardRouter;