import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      url: newUrl,
      author: newAuthor,
    })

    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
            title: <input
          type="text"
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          placeholder='write title here'
          id='title'/>
      </div>
      <div>
            url: <input value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
          placeholder='write url here'
          id='url'/>
      </div>
      <div>
            author: <input value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
          placeholder='write author here'
          id='author'/>
      </div>
      <button type="submit" id='create-button'>create</button>
    </form>
  )
}

export default BlogForm