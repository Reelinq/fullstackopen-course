const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav)
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}