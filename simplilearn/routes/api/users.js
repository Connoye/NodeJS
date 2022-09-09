const express = require("express");
const router = express.Router();
const uuid = require("uuid");
let users = require('../../users');

router.get('/', (req, res) => {
    res.json(users);
});

//Find record by id
router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.sendStatus(404);
    }
});

//Create a new record
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if (!newUser.name || !newUser.email) {
        return res.sendStatus(400);
    }

    users.push(newUser);
    res.json(users);
});


//Update a record
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        const updatedUser = req.body;
        users.forEach(
            user => {
                if (user.id === parseInt(req.params.id)) {
                    user.name = updatedUser.name ? updatedUser.name : user.name;
                    user.email = updatedUser.email ? updatedUser.email : user.email;
                    res.json({ msg: "User updated", user });
                }
            }
        )
    } else {
        res.sendStatus(404);
    }
});

//Delete a record
router.delete('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        users = users.filter(user => user.id !== parseInt(req.params.id));
        res.json({ msg: "User deleted", users });
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;