const errorHandler = (err, req, res, next) => {
	console.error(err.message)

	if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
		const messages = err.errors.map(e => `${e.path} ${e.message}`)
		return res.status(400).json({ error: 'validation error', messages })
	}

	if (err.name === 'SequelizeForeignKeyConstraintError') {
		return res.status(400).json({ error: 'foreign key constraint error', detail: err.message })
	}

	if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token', })
	}

	if (err.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' })
	}

	if (err.name === 'SequelizeDatabaseError') {
		return res.status(400).json({ error: 'database error', detail: err.message })
	}

	if (err.message === 'Cannot read properties of null (reading \'id\')') {
		return res.status(400).json({ error: 'User not found or invalid token' })
	}

	return res.status(500).json({ error: 'internal server error' })
}

module.exports = errorHandler