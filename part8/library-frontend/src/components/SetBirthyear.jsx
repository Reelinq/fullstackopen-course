import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const NewBook = ({ show }) => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [changeBirthyear] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }]
	})

	if (!show) return null

	const submit = async (event) => {
		event.preventDefault()

		changeBirthyear({ variables: { name, born: Number(born) } })

		setName('')
		setBorn('')
	}

	return (
		<div>
			<h2>Set birthyear</h2>
			<form onSubmit={submit}>
				<div>
					name
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					born
					<input
						value={born}
						type="number"
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	)
}

export default NewBook