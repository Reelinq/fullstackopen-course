import { useState } from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import SetBirthyear from "./components/SetBirthyear"
import Login from "./components/Login"
import { ALL_AUTHORS } from "./queries"

const App = () => {
	const client = useApolloClient()
	const result = useQuery(ALL_AUTHORS)
	const [token, setToken] = useState(null)
	const [page, setPage] = useState("authors")

	if (result.loading) {
		return <div>loading...</div>
	}

	const handleLogout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
		setPage("authors")
	}

	return (
		<div>
			{!token ? (
				<div>
					<button onClick={() => setPage("authors")}>authors</button>
					<button onClick={() => setPage("books")}>books</button>
					<button onClick={() => setPage("login")}>login</button>
				</div>
			) : (
				<div>
					<button onClick={() => setPage("authors")}>authors</button>
					<button onClick={() => setPage("books")}>books</button>
					<button onClick={() => setPage("add")}>add book</button>
					<button onClick={() => setPage("setYear")}>set birthyear</button>
					<button onClick={handleLogout}>logout</button>
				</div>
			)}

			<Authors show={page === "authors"} result={result} />
			<Books show={page === "books"} />
			{token && <NewBook show={page === "add"} />}
			{token && <SetBirthyear show={page === "setYear"} />}
			<Login show={page === "login"} setToken={setToken} setPage={setPage} />
		</div>
	)
}

export default App