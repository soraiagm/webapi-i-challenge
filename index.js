// // implement your API here
// libraries
const express = require('express');

// other files
const users = require('./data/db.js');

// global objects
const server = express();

server.use(express.json());

// request handler

// POST
server.post('/users', (req, res) => {
    const { name, bio } = req.body;
        
    if (!name || !bio ) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        } else {
            Users.insert(req.body)
                .then(user => {
                    res.status(201).json(user);
                })
                .catch(() => {
                    res.status(500).json({
                        error: 'There was an error while saving the user to the database', 
                });
            });
        }
    });

// GET
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The users information could not be retrieved'
            });
        });
});

server.get('/api/users/:id', (req, res) => {
        Users.findById(req.params.id)
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: 'The user with the specified ID does not exist.' });
                }
            })
            .catch(() => {
                res.status(500).json({ errorMessage: 'The user information could not be retireved.' });
            });
        });

// DELETE
server.delete('/users/:id', (req, res) => {
        Users.remove(req.params.id)
            .then(count => {
                if(count && count > 0) {
                    res.status(200).json({
                        message: 'The user was deleted',
                    });
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." });
                }
            })
            .catch(() => {
                res.status(500).json({
                    errorMessage: 'The user could not be removed'
                });
        });
    });

// PUT
server.put('/users/:id', (req, res) => {
    Users.update(req.params.id)
        .then(updated => {
            if (updated) {
                res.json(updated);
            } else {
                res.status(404).json({
                    message: 'invalud user id'
                });
            }
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: 'failed to update hub'
            });
        });
});

// // last step
const port = 4000;
server.listen(port, () => {
    console.log('Server is running on port 4000...');
})







