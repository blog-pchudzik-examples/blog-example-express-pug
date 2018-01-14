const
	express = require('express'),
	router = express.Router();

let userId = 1;
let users = [
	{id: userId++, firstName: 'Oskar', lastName: 'Giustina'},
	{id: userId++, firstName: 'Johnie', lastName: 'Rosalyn'},
	{id: userId++, firstName: 'Christa', lastName: 'Mackenzie'}
];

router.get('/', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(users));
});

router.get('/:id', (req, res) => {
	const user = users.find(user => user.id === parseInt(req.params.id));
	if (user) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(user));
	} else {
		res.sendStatus(404)
	}
});

router.post('/', (req, res) => {
	const newUser = {firstName: req.body.firstName, lastName: req.body.lastName, id: userId++};
	users = [...users, newUser];
	res.setHeader('Content-Type', 'application/json');

	res.status(201)
		.send(JSON.stringify(newUser));
});

router.delete('/:id', (req, res) => {
	users = users.filter(u => u.id !== parseInt(req.params.id));
	res.sendStatus(204)
});

router.put('/:id', (req, res) => {
	const
		userId = parseInt(req.params.id),
		user = req.body,
		userToUpdate = users.find(u => u.id === userId);

	if (userToUpdate) {
		userToUpdate.name = user.name;
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
