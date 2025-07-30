const router = require('express').Router()
const tokenExtractor = require('../middleware/tokenExtractor')

const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
	const blogs = await Blog.findAll({
		attributes: { exclude: ['userId'] },
		include: {
			model: User,
			attributes: ['name']
		}
	})
	res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
	return res.json(blog)
})

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id)
	next()
}

router.delete('/:id', blogFinder, async (req, res) => {
	if (req.blog) {
		await req.blog.destroy()
		res.status(204).end()
	} else {
		res.status(404).end()
	}
})

router.put('/:id', blogFinder, async (req, res) => {
	if (req.blog) {
		req.blog.likes = req.body.likes
		await req.blog.save()
		res.json(req.blog)
	} else {
		res.status(404).end()
	}
})

module.exports = router