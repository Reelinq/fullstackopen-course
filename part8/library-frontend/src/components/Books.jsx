import { useState } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = ({ show }) => {
	const [selectedGenre, setSelectedGenre] = useState(null)

	const getAllBooks = useQuery(ALL_BOOKS, {
		variables: selectedGenre ? { genre: selectedGenre } : {}
	})

	const getAllBooksForGenres = useQuery(ALL_BOOKS)
	const allGenres = getAllBooksForGenres.data ?
		[...new Set(getAllBooksForGenres.data.allBooks.flatMap(b => b.genres))] : []

	if (getAllBooks.loading || getAllBooksForGenres.loading) {
		return <div>loading...</div>
	}

	const books = getAllBooks.data.allBooks

	if (!show) return null

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map(b => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			{allGenres.map(genre => (
				<button key={genre} onClick={() => setSelectedGenre(genre)}>
					{genre}
				</button>
			))}
			<button onClick={() => setSelectedGenre(null)}>
				all genres
			</button>
		</div>
	)
}

export default Books
