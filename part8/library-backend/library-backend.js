const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = `
		type Book {
			title: String!
			published: Int!
			author: Author!
			genres: [String!]!
			id: ID!
		}

		type Author {
			name: String!
			id: ID!
			born: Int
			bookCount: Int!
		}

		type Query {
			bookCount: Int
			authorCount: Int
			allBooks(author: String, genre: String): [Book!]!
			allAuthors: [Author!]!
		}

		type Mutation {
			addBook(
				title: String!
				author: String!
				published: Int!
				genres: [String!]!
			): Book!

			editAuthor(
				name: String!
				setBornTo: Int!
			): Author
		}
	`

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
	},
	Author: {
		bookCount: async (author) => {
			return await Book.countDocuments({ author: author.id })
		}
	},
	Mutation: {
		addBook: async (root, args) => {
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
							error
						}
					})
				}
			}
			const book = new Book({
				title: args.title,
				published: args.published,
				author: author._id,
				genres: args.genres
			})
			try {
				await book.save()
			} catch (error) {
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.title,
						error
					}
				})
			}
			return await book.populate('author')
		},
		editAuthor: async (root, args) => {
			return await Author.findOneAndUpdate(
				{ name: args.name },
				{ born: args.setBornTo },
				{ new: true }
			)
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})