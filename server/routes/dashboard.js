import express from 'express';
import pool from '../db.js';
import authorization from '../middleware/authorization.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', authorization, async (req, res) => {
  try {
    console.log('dashboardRouter: GET request', req.user)
    const user = await pool.query(
      "SELECT trainer_id WHERE trainer_id = $1",
      [req.user]
    );
    const clients = await pool.query(
      "select * from clients where user_id = $1", [req.user]
    );

    res.json([user.rows[0], blogs.rows]);
  } catch (err) {
    console.error(err.message, 'Error at dashboard router, `/` GET route');
    res.status(500).send("Server error");
  }
});


export default dashboardRouter;