import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const updateLikes = async (blog) => {
	const updatedBlog = {
		...blog,
		likes: blog.likes + 1,
	}

	const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog)
	return response.data
}

const remove = async (blog) => {
	const config = {
		headers: { Authorization: token },
	}

	await axios.delete(`${baseUrl}/${blog.id}`, config)
	return blog
}

export default { getAll, create, setToken, updateLikes, remove }
