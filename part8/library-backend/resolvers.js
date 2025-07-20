const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
	Query: {
		bookCount: async () => Book.countDocuments(),
		authorCount: async () => Author.countDocuments(),
		allBooks: async (root, args) => {
			let filtered = {}
			if (args.author) {
				const authorObj = await Author.findOne({ name: args.author })
				if (authorObj) filtered.author = authorObj._id
			}
			if (args.genre) filtered.genres = args.genre
			return await Book.find(filtered).populate('author')
		},
		allAuthors: async () => Author.find({}),
		me: (root, args, context) => {
			return context.currentUser
		},
	},
	Author: {
		bookCount: async (author) => {
			return await Book.countDocuments({ author: author.id })
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author })
				try {
					await author.save()
				} catch (error) {
					throw new GraphQLError('Saving author failed', {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: args.author,
							error,
						},
					})
				}
			}
			const book = new Book({
				title: args.title,
				published: args.published,
				author: author._id,
				genres: args.genres,
			})

			const currentUser = context.currentUser
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			try {
				await book.save()
			} catch (error) {
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.title,
						error,
					},
				})
			}

			const populatedBook = await book.populate('author')
			pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

			return populatedBook
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			try {
				return await Author.findOneAndUpdate(
					{ name: args.name },
					{ born: args.setBornTo },
					{ new: true },
				)
			} catch (error) {
				throw new GraphQLError('Editing author failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			}
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			})

			return user.save().catch((error) => {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.username,
						error,
					},
				})
			})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: { code: 'BAD_USER_INPUT' },
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
		},
	},
}

module.exports = resolvers
