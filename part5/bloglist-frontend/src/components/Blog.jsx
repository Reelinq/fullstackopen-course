import '../index.css'

const Blog = ({ blog, onHide }) => (
  <>
    <span>{blog.title} {blog.author}</span>
    <button onClick={onHide}>hide</button><br />
    <span>{blog.url}</span><br />
    <span>likes {blog.likes}</span>
    <button>like</button><br />
    <span>{blog.user?.name || 'unknown'}</span>
  </>
)

export default Blog