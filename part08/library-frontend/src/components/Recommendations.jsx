import { ALL_BOOKS, USER } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = ({ show }) => {
	const getUser = useQuery(USER)

	const getBooks = useQuery(ALL_BOOKS, {
		variables: { genre: getUser.data?.me?.favoriteGenre },
		skip: !getUser.data?.me?.favoriteGenre,
	})

	if (getBooks.loading || getBooks.loading) {
		return <div>loading...</div>
	}

	const books = getBooks.data?.allBooks || []

	if (!show) return null

	return (
		<div>
			<h2>recommendations</h2>
			<p>
				books in your favorite genre <b>{getUser.data.me.favoriteGenre}</b>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((b) => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Recommendations
