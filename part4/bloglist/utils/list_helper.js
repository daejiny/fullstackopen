const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null
  if (blogs.length === 1) return blogs[0]
  const maxLikes = Math.max(blogs.reduce((prev, blog) => (prev > blog.likes) ? prev : blog.likes), 0)
  return blogs.filter(blog => blog.likes === maxLikes)[0]
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return null
  // probably very memory inefficient on large arrays, but neater
  return _.chain(blogs).map('author').countBy().toPairs().max(_.last).head().value()

  // optimize this...
  // const authorList = _.reduce(blogs, (result, value) => {
  //   if (!result[value.author]) result[value.author] = 1
  //   else result[value.author] += 1
  //   return result
  // },{})
  // return Object.keys(authorList).reduce((a, b) => authorList[a] > authorList[b] ? a : b)
}

const mostLikes = (blogs) => {
  if (!blogs.length) return null

  const authorList = _.groupBy(blogs, blog => blog.author)

  const authorLikes = _.map(authorList, (authorGroup, author) => {
    return {
      author: author,
      likes: authorGroup.reduce((acc, i) => acc + i.likes, 0)
    }
  })

  return authorLikes.reduce((prev, author) => prev.likes > author.likes ? prev : author)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}