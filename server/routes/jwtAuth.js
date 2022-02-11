import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwtGenerator from '../utility/jwtGenerator.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

//registering
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const trainer = await pool.query('SELECT * FROM trainers WHERE email = $1', [email]);

    if (trainer.rows.length !== 0) {
      return res.status(401).send('trainer already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    console.log(bcryptPassword)
    const newtrainer = await pool.query("INSERT INTO trainers (first_name, last_name, email, password) Values ($1, $2, $3) RETURNING *", [ first, last, email, bcryptPassword ]);

    const token = jwtGenerator(newtrainer.rows[0].trainer_id)
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error')
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const trainer = await pool.query("SELECT * FROM trainers WHERE email = $1", [ email ]);

    if(trainer.rows.length === 0) {
      return res.status(401).send('Password or email is incorrect');
    }

    const validPassword = await bcrypt.compare(password, trainer.rows[0].trainer_password);

    if(!validPassword) {
      return res.status(401).json('Password or Email is incorrect');
    }

    const token = jwtGenerator(trainer.rows[0].trainer_id);
    res.json({ token, id: trainer.rows[0].trainer_id });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/is-verify', authorization, async (req,res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;