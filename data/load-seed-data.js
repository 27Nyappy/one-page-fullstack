const client = require('../lib/client');
const todos = require('./todos');

client.connect()
    .then(() => {
        return Promise.all(
            todos.map(todo => {
                return client.query(`
                    INSERT INTO todos (task)
                    VALUES ($1)
                    RETURNING *;
                `,
                [todo])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });