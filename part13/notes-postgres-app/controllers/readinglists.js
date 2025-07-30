const router = require('express').Router()
const { ReadingList } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')

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

router.put('/:id', tokenExtractor, async (req, res) => {
	const { id } = req.params
	const { read } = req.body
	const userId = req.decodedToken.id

	try {
		const readingEntry = await ReadingList.findByPk(id)

		if (!readingEntry) {
			return res.status(404).json({ error: 'Reading list entry not found' })
		}

		if (readingEntry.user_id !== userId) {
			return res.status(403).json({ error: 'You can only modify your own reading list entries' })
		}

		readingEntry.is_read = read
		await readingEntry.save()

		res.json(readingEntry)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: error.message })
	}
})

module.exports = router