import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LogIn from './components/LogIn'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()
  const blogToggleRef = useRef()

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

  const handleLogout = () => {
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
      <Togglable buttonLabel='create new blog' ref={blogFormRef} showCancel={true}>
        <CreateBlog addBlog={addBlog} setMessage={setMessage} blogFormRef={blogFormRef} />
      </Togglable>

      {[].concat(blogs)
        .sort((a, b) => b.likes - a.likes)
        .map(blog => {

          return (
            <div key={blog.id} className='blog'>
              <span>{blog.title} {blog.author}</span>
              <Togglable buttonLabel='view' showCancel={false} ref={blogToggleRef}>
                <Blog blog={blog} onHide={() => blogToggleRef.current.toggleVisibility()} blogs={blogs} setBlogs={setBlogs}/>
              </Togglable>
            </div>
          )
        })
      }
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