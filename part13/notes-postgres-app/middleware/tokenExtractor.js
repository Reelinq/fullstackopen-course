const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Session, User } = require('../models')

tokenExtractor = async (req, res, next) => {
	const authorization = req.get('authorization')

	if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}

	const token = authorization.substring(7)
	console.log('Extracted token:', token)

	let decodedToken
	try {
		decodedToken = jwt.verify(token, SECRET)
		console.log('✅ JWT verification successful')
	} catch (error) {
		console.log('❌ JWT verification failed:', error.message)
		return res.status(401).json({ error: 'token invalid' })
	}

	if (!decodedToken.id) {
		console.log('❌ No ID in decoded token')
		return res.status(401).json({ error: 'token invalid' })
	}
	console.log('✅ Token has valid ID:', decodedToken.id)

	const session = await Session.findOne({ where: { token } })
	if (!session) {
		console.log('❌ No session found for token')
		return res.status(401).json({ error: 'session expired or logged out' })
	}
	console.log('✅ Session found')

	const user = await User.findByPk(decodedToken.id)
	if (!user || user.disabled) {
		console.log('❌ User not found or disabled')
		return res.status(403).json({ error: 'user disabled or not found' })
	}
	console.log('✅ User found and enabled')

	req.decodedToken = decodedToken
	req.token = token
	next()
}

module.exports = tokenExtractor