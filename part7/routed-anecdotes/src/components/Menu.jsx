import { Routes, Route, Link } from 'react-router-dom'
import CreateNew from './CreateNew'
import About from './About'
import AnecdoteList from './AnecdoteList'

const Menu = ({ addNew, anecdotes }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
      <Routes>
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
    </div>   
  )
}

export default Menu