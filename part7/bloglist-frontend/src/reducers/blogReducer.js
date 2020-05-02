import blogService from '../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMMENT': {
      const blogToUpdate = state.find(blog => blog.id === action.data.id)
      const updatedBlog = { ...blogToUpdate, comments: blogToUpdate.comments.concat(action.data.comment) }
      return state.map(blog => blog.id === action.data.id ? updatedBlog : blog)
    }
    case 'LIKE': {
      const blogToUpdate = state.find(blog => blog.id === action.data.id)
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      return state.map(blog => blog.id === action.data.id ? updatedBlog : blog)
    }
    case 'TOGGLE_VISIBLE': {
      const blogToUpdate = state.find(blog => blog.id === action.data.id)
      const updatedBlog = { ...blogToUpdate, visible: !blogToUpdate.visible }
      return state.map(blog => blog.id === action.data.id ? updatedBlog : blog)
    }
    case 'ADD':
      return state.concat(action.data)
    case 'DELETE':
      return state.filter(blog => blog.id !== action.data.id)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    await blogService.commentBlog(blog, comment)
    dispatch({
      type: 'COMMENT',
      data: { id: blog.id, comment }
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.likeBlog(blog)
    dispatch({
      type: 'LIKE',
      data: { id: blog.id }
    })
  }
}

export const toggleVisibility = (blog) => (
  {
    type: 'TOGGLE_VISIBLE',
    data: { id: blog.id }
  }
)

export const addBlog = (blog) => {
  return async dispatch => {
    const addedBlog = await blogService.create(blog)
    console.log(addedBlog)
    dispatch({
      type: 'ADD',
      data: { ...addedBlog, visible: false }
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE',
      data: { id: blog.id }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs.map(blog => ({ ...blog, visible: false })),
    })
  }
}

export default blogReducer