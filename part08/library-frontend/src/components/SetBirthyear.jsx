import { useState } from 'react'
import Select from 'react-select'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const NewBook = ({ show }) => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [changeBirthyear] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	})

	const result = useQuery(ALL_AUTHORS)
	if (result.loading) {
		return <div>loading...</div>
	}
	const authors = result.data.allAuthors.map((a) => ({
		value: a.name,
		label: a.name,
	}))

	if (!show) return null

	const submit = async (event) => {
		event.preventDefault()
		changeBirthyear({ variables: { name: name.value, born: Number(born) } })

		setName('')
		setBorn('')
	}

	return (
		<div>
			<h2>Set birthyear</h2>
			<form onSubmit={submit}>
				<div>
					<Select
						value={name}
						onChange={(selectedOption) => setName(selectedOption)}
						options={authors}
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
