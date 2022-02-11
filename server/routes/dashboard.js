import express from 'express';
import pool from '../db.js';
import authorization from '../middleware/authorization.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', authorization, async (req, res) => {
  try {
    // console.log('dashboardRouter: GET request', req.trainer)
    const user = await pool.query(
      "SELECT trainer_id FROM trainers WHERE trainer_id = $1",
      [req.trainer]
    );
    // const clients = await pool.query(
    //   "SELECT * FROM clients WHERE client_id = $1", [req.trainer]
    // );

    res.json([user.rows[0]]);
  } catch (err) {
    console.error('Error at dashboard router, `/` GET route', err.message);
    res.status(500).send("Server error");
  }
});


export default dashboardRouter;