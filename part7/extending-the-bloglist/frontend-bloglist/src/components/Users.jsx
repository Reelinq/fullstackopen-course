import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users)
	const blogs = useSelector(state => state.blogs)

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch, blogs])

	return (
		<>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default Users