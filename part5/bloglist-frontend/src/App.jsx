import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LogIn from './components/LogIn'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  const handleLogout = async => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <LogIn setUser={setUser} setMessage={setMessage} message={message} />
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
      <br /><br />
      <CreateBlog addBlog={addBlog} setMessage={setMessage} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App