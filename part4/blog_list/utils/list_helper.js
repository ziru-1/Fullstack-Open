const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => {
        return total + blog.likes
      }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? 0 : _.maxBy(blogs, 'likes')
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const blogCounts = _.countBy(blogs, 'author')

  return _.maxBy(
    _.entries(blogCounts).map(([author, count]) => ({ author, blogs: count })),
    'blogs'
  )
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')

  const likesByAuthor = _.map(grouped, (posts, author) => ({
    author,
    likes: _.sumBy(posts, 'likes'),
  }))

  return _.maxBy(likesByAuthor, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
