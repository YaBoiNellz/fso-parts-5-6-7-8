import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        const blogWithUser = { ...returnedBlog, user: user }
        setBlogs(blogs.concat(blogWithUser))
      })
    setErrorMessage(`a new blog ${blogObject.title} has been added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const updateLikes = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        const updatedBlogs = blogs.map(blog => blog.id !== id ? blog : returnedBlog)
        const sortBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortBlogs)
      })
  }

  const deleteBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id='username'
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id='password'
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new note" buttonLabel2="cancel" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} incrementLikes={updateLikes} deletethisBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App