const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const { Session } = require('../models')

router.post('/', async (req, res) => {
	const body = req.body

	const user = await User.findOne({
		where: {
			username: body.username
		}
	})

	const passwordCorrect = body.password === 'secret'

	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: 'invalid username or password'
		})
	}

	if (user.disabled) {
		return res.status(403).json({ error: 'user disabled' });
	}

	const userForToken = {
		username: user.username,
		id: user.id,
	}

	const token = jwt.sign(userForToken, SECRET)

	await Session.create({ token, user_id: user.id });

	res
		.status(200)
		.send({ token, username: user.username, name: user.name });
})

module.exports = router