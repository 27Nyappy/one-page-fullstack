require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash, name
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT into users (email, hash, name)
            values ($1, $2, $3)
            RETURNING id, email, name;
        `,
        [user.email, hash, user.name]
        ).then(result => result.rows[0]);
    }
});

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', ensureAuth);

app.get('/api/todos', (req, res) => {
    const showAll = (req.query.show && req.query.show.toLowerCase() === 'all');
    const where = showAll ? '' : 'where completed = FALSE';

    client.query(`
        SELECT
            id,
            task,
            completed
        FROM todos
        ${where}
        ORDER BY task;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/todos', (req, res) => {
    const todo = req.body;
    client.query(`
        INSERT INTO todos (task)
        VALUES ($1)
        RETURNING *;
    `,
    [todo.task]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Task "${todo.task}" already exists`
                });
            }
            res.result(500).json({
                error: err.message || err
            });
        });
});

app.put('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = req.body;

    client.query(`
        UPDATE todos
        SET    task = $2,
               completed = $3
        WHERE  id = $1
        RETURNING *; 
    `,
    [id, todo.task, todo.completed]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Task "${todo.task}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM todos
        WHERE id = $1
        RETURNING *;
    `,
    [id]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});