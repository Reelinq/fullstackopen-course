const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5')
const {
	ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')

const User = require('./models/user')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')

require('dotenv').config()

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const start = async () => {
	const app = express()
	const httpServer = http.createServer(app)

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/',
	})

	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const serverCleanup = useServer({ schema }, wsServer)

	const server = new ApolloServer({
		schema: makeExecutableSchema({ typeDefs, resolvers }),
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose()
						},
					}
				},
			},
		],
	})

	await server.start()

	app.use(
		'/',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const auth = req ? req.headers.authorization : null
				if (auth && auth.startsWith('Bearer ')) {
					const decodedToken = jwt.verify(
						auth.substring(7),
						process.env.JWT_SECRET,
					)
					const currentUser = await User.findById(decodedToken.id)
					return { currentUser }
				}
			},
		}),
	)

	const PORT = 4000
	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}`),
	)
}

start()
