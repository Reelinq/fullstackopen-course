const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
	const users = await User.findAll({
		include: {
			model: Blog,
			attributes: { exclude: ['userId'] }
		}
	})
	res.json(users)
})

router.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body)
		res.json(user)
	} catch (error) {
		return res.status(400).json({ error })
	}
})

router.put('/:username', async (req, res) => {
	const user = await User.findOne({ where: { username: req.params.username } })

	if (user) {
		user.username = req.body.username ?? user.username
		await user.save()
		res.json(user)
	} else {
		return res.status(404).json({ error: 'user not found' })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const readFilter = req.query.read
		const readingListWhere = {}

		if (readFilter === 'true') {
			readingListWhere.is_read = true
		} else if (readFilter === 'false') {
			readingListWhere.is_read = false
		}

		const user = await User.findByPk(req.params.id, {
			attributes: ['name', 'username'],
			include: {
				model: Blog,
				as: 'readings',
				attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
				through: {
					as: 'readinglists',
					attributes: ['id', ['is_read', 'read']],
					where: readingListWhere
				}
			}
		})

		if (user) {
			res.json(user)
		} else {
			res.status(404).json({ error: 'user not found' })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

module.exports = router