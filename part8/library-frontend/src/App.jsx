import { useState } from "react"
import { useApolloClient } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import SetBirthyear from "./components/SetBirthyear"
import Login from "./components/Login"
import Recommendations from "./components/Recommendations"

const App = () => {
	const client = useApolloClient()
	const [token, setToken] = useState(localStorage.getItem('user-token'))
	const [page, setPage] = useState("authors")

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
					<button onClick={() => setPage("recommend")}>recommend</button>
					<button onClick={handleLogout}>logout</button>
				</div>
			)}

			<Authors show={page === "authors"} />
			<Books show={page === "books"} />
			{token && <NewBook show={page === "add"} />}
			{token && <SetBirthyear show={page === "setYear"} />}
			{token && <Recommendations show={page === "recommend"} />}
			<Login show={page === "login"} setToken={setToken} setPage={setPage} />
		</div>
	)
}

export default App