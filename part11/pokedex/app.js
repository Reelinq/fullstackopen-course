const express = require('express')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5000

app.get('/health', (req, res) => {
	res.send('ok')
})

app.get('*', (req, res) => {
	if (req.path !== '/health') {
		process.exit(1) // Crashes the server
	}
	res.status(404).send('Not found')
})

app.use(express.static('dist'))

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`server started on port ${PORT}`)
})