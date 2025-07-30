const router = require('express').Router()
const { ReadingList, User, Blog } = require('../models')

router.post('/', async (req, res) => {
	const { blogId, userId } = req.body

	if (!blogId || !userId) {
		return res.status(400).json({ error: 'blogId and userId are required' })
	}

	try {
		if (await ReadingList.findOne({ where: { blogId, userId } })) {
			return res.status(409).json({ error: 'Already added to reading list' })
		}

		const result = await ReadingList.create({
			blog_id: blogId,
			user_id: userId,
			is_read: false
		})

		res.status(201).json(result)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: error.message })
	}
})

module.exports = router