const
	express = require('express'),
	router = express.Router(),
	axios = require('axios');

router.get('/', function (req, res) {
	axios
		.get('http://localhost:3000/api/users')
		.then(unwrapResponseData)
		.then(users => res.render('users', {users: users}));
});

router.get('/:id', (req, res) => {
	axios
		.get('http://localhost:3000/api/users/' + req.params.id)
		.then(unwrapResponseData)
		.then(user => res.render('userDetails', {user}));
});

function unwrapResponseData(response) {
	return response.data;
}

module.exports = router;
