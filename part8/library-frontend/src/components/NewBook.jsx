import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS, USER } from '../queries'

const NewBook = ({ show }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [published, setPublished] = useState('')
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])

	const { data: userData } = useQuery(USER)

	const [createBook] = useMutation(CREATE_BOOK, {
		update: (cache, response) => {
			cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
				return {
					allBooks: allBooks.concat(response.data.addBook)
				}
			})

			if (userData?.me?.favoriteGenre) {
				cache.updateQuery({
					query: ALL_BOOKS,
					variables: { genre: userData.me.favoriteGenre }
				}, ({ allBooks }) => {
					if (response.data.addBook.genres.includes(userData.me.favoriteGenre)) {
						return {
							allBooks: allBooks.concat(response.data.addBook)
						}
					}
					return { allBooks }
				})
			}

			cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
				return { allAuthors }
			})
		}
	})

	if (!show) return null

	const submit = async (event) => {
		event.preventDefault()

		createBook({ variables: { title, author, published: Number(published), genres } })

		setTitle('')
		setPublished('')
		setAuthor('')
		setGenres([])
		setGenre('')
	}

	const addGenre = () => {
		setGenres(genres.concat(genre))
		setGenre('')
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(' ')}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	)
}

export default NewBook