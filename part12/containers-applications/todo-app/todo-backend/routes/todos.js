const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
	const todos = await Todo.find({})
	res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
	const todo = await Todo.create({
		text: req.body.text,
		done: req.body.done
	})

	const currentCount = await getAsync('added_todos') || '0'
	const newCount = parseInt(currentCount) + 1
	await setAsync('added_todos', newCount.toString())

	res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
	const { id } = req.params
	req.todo = await Todo.findById(id)
	if (!req.todo) return res.sendStatus(404)

	next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
	await req.todo.delete()
	res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
	res.status(200).json(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
	const { text, done } = req.body

	if (text !== undefined) req.todo.text = text
	if (done !== undefined) req.todo.done = done

	const updatedTodo = await req.todo.save()
	res.status(200).json(updatedTodo)
})

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

