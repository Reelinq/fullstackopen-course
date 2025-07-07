const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav)
}

function mostBlogs(blogs) {
  const groupedByAuthor = _.groupBy(blogs, 'author')

  const authorsBlogCount = Object.entries(groupedByAuthor).map(([author, blogs]) => ({
    author,
    blogs: blogs.length
  }))

  return authorsBlogCount.reduce((max, authorObj) =>
    authorObj.blogs > max.blogs ? authorObj : max
  )
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}