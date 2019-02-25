import React, { useState, useEffect, useImperativeHandle } from 'react'
// import axios from 'axios'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Success from './components/Success'
import Login from './components/login'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const[username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [blogPost, setBlogPost] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const[blogVisible, setBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })

  // RIKKI !!!!


  // const addlikes = id => {
  //   const blog = blogs.find(n => n.id === id )
  //   const changedBlog = { ...blog, likes: Number(blog.likes) + 1 }

  //   blogService
  //     .update(changedBlog).then(returnedBlog => {
  //       setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
  //     })
  //     .catch (() => {
  //       setErrorMessage(`virhe`)
  //       setTimeout(() => {
  //         setErrorMessage(null)
  //       }, 5000)
  //       setBlogs(blogs.filter(n => n.id !== id))
  //     })

  // }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleNewBlogPost = async (event) => {
    event.preventDefault()
    try {
      const blogPost = await blogService.create({
        title, author, url
      })

      setBlogPost(blogPost)
      setTitle('')
      setAuthor('')
      setTitle('')

      setSuccessMessage('postaus tallennettu')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('joku error blogipostauksessa')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const newBlogPostForm = () => (
    <div>
      <h2>Create new post</h2>
      <form onSubmit={handleNewBlogPost}>
        <div>
          title
          <input
            type="text"
            value = {title}
            name = "Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value = {author}
            name = "Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value = {url}
            name = "Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">tallenna postaus</button>
      </form>
    </div>
  )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <Login
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  const handleLogOut = async (event) => {

    event.preventDefault()

    window.localStorage.clear('loggedNoteappUser')

  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    console.log("moro ", blogs[0])
    return (
      <div>
        <h2>blogs</h2>

        <div style={hideWhenVisible}>

          <div onClick={() => console.log('clicked') && setBlogVisible(true)}>


            {blogs.map(blog =>
              <Togglable buttonLabel = {blog.title} >
              <Blog key={blog.id} blog={blog}/>
              </Togglable>
              

            )}
            <form>
              <button></button>
            </form>
          </div>
        </div>




        <form onSubmit={handleLogOut} >
          <button type="submit">kirjaudu ulos</button>

        </form>
      </div>

    )

  }

  return (
    <div>

      <h1>Blogs</h1>

      <Success message={successMessage}/>
      <Notification message={errorMessage}/>

      {user === null ?
        loginForm():
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
          {newBlogPostForm()}
        </div>
      }
    </div>
  )
}

export default App