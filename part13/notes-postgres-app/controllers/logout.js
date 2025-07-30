const router = require('express').Router()
const tokenExtractor = require('../middleware/tokenExtractor')
const { Session } = require('../models')

router.delete('/', tokenExtractor, async (req, res) => {
	const token = req.token

	await Session.destroy({ where: { token } })
	res.status(204).end()
})

module.exports = router