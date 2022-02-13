import express from 'express';
import pool from '../db.js';
import authorization from '../middleware/authorization.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', authorization, async (req, res) => {
  try {
    // console.log('dashboardRouter: GET request', req.trainer)
    const trainer = await pool.query(
      "SELECT * FROM trainers WHERE trainer_id = $1",
      [req.trainer]
    );
    // const clients = await pool.query(
    //   "SELECT * FROM clients WHERE client_id = $1", [req.trainer]
    // );
      console.log(trainer.rows.first_name)
    res.json([trainer.rows[0].first_name]);
  } catch (err) {
    console.error('Error at dashboard router, `/` GET route', err.message);
    res.status(500).send("Server error");
  }
});


export default dashboardRouter;