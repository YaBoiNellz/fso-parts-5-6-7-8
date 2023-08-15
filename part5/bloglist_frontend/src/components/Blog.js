import Togglable from './Togglable'
import { useRef } from 'react'

const Blog = ({ blog, user, incrementLikes, deletethisBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogRef = useRef()

  const updateLikes = () =>
  {
    incrementLikes(blog.id, {
      user: user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deletethisBlog(blog.id)
    }
  }

  const showDelete = () => {
    if(user.username === blog.user.username){
      return (
        <button onClick={deleteBlog} id="remove-button">remove</button>
      )
    }
    else {
      return null
    }
  }

  return (
    <div className = 'blog' style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view" buttonLabel2='hide' ref={blogRef}>
        <span>
          {blog.url}
          {<br></br>}
        likes {blog.likes || 0} <button onClick={updateLikes} id='like-button'> like </button>
          {<br></br>}
          {blog.user.username}
          {<br></br>}
          {showDelete()}
        </span>
      </Togglable>
    </div>
  )
}

export default Blog