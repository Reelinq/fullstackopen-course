import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LogIn from './components/LogIn'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import Notification from './components/Notification'
import ExpandBlog from './components/ExpandBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()
  const blogRefs = useRef({})

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log('blogs from backend:', blogs)
      setBlogs(blogs)
    })
  }, [])

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

  const handleDeletion = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
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
      <Togglable ref={blogFormRef} showCancel={true}>
        <CreateBlog addBlog={addBlog} setMessage={setMessage} blogFormRef={blogFormRef} />
      </Togglable>

      {[].concat(blogs)
        .sort((a, b) => b.likes - a.likes)
        .map(blog => {
          const isCreator = blog.user && (blog.user.id === user.id)

          if (!blogRefs.current[blog.id]) {
            blogRefs.current[blog.id] = React.createRef()
          }

          return (
            <div key={blog.id} className='blog'>
              <ExpandBlog blog={blog} ref={blogRefs.current[blog.id]}>
                <Blog
                  blog={blog}
                  onHide={() => blogRefs.current[blog.id].current.toggleVisibility()}
                  blogs={blogs}
                  setBlogs={setBlogs}
                />
                <br />
                {isCreator && (
                  <button onClick={() => handleDeletion(blog)}>remove</button>
                )}
              </ExpandBlog>
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