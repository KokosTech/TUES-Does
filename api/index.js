/* const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const PORT = process.env.PORT || 5001;

const app = express();
const db = require('./user')

app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/',require('./routes'));
app.listen(PORT, ()=>{
console.log('server listening on port: ',PORT)})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/test-post', (request, response) => {console.log("based", request.body); response.json({ info: 'Node.js, Express, and Postgres API' })})
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

 */

const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const session = require('express-session'); 
//const authRouter = require('./routes/authRouter');
const routes = require('./routes/routes');
const pool = require('./db');

require('dotenv').config();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* app.use(session({
    name: 'sid',
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        },
})); */

//app.use('/auth', authRouter);

app.get('/users', async (req, res) => {
  const users = await pool.query(`SELECT 
                                    username 
                                  FROM 
                                    users 
                                  ORDER BY
                                    username 
                                    ASC`);
  res.json(users.rows);
});

app.get('/lists/:user', async (req, res) => {
  const user = req.params.user;
  if(!user) {
    res.status(400).json({ message: 'No user specified' });
    return;
  }

  const lists = await pool.query(`SELECT 
                                    lists.id,
                                    lists.name,
                                    lists.icon,
                                    lists.color
                                  FROM users
                                    JOIN lists ON users.id = lists.owner_id
                                  WHERE users.username = $1
                                  ORDER BY lists.name; `, [user]);
  res.json(lists.rows);
});

app.get('/lists/:id', async (req, res) => {
  const id = req.params.id;
  if(!id) {
    res.status(400).json({ message: 'No id specified' });
    return;
  }

  const list = await pool.query(`SELECT
                                    lists.id, 
                                    lists.name,
                                    lists.icon,
                                    lists.color,
                                    lists.owner_id,
                                    users.username
                                  FROM lists
                                    JOIN users ON lists.owner_id = users.id
                                  WHERE lists.id = $1`, [id]);
  res.json(list.rows);
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if(!id) {
      res.status(400).json({ message: 'No id specified' });
      return;
    }

    const tasks = await pool.query(`SELECT
                                      tasks.id,
                                      tasks.name,
                                      tasks.description,
                                      tasks.priority,
                                      tasks.due_date,
                                      tasks.flagged,
                                      tasks.completed
                                    FROM tasks
                                      JOIN lists ON tasks.list_id = lists.id
                                    WHERE lists.id = $1
                                    ORDER BY tasks.id;`, [id]);
    res.json(tasks.rows);
  } catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});