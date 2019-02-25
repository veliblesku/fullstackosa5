import React, { useState } from 'react'


const Blog = ({ blog, addlikes }) => {

  const[blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }


  return (
    <div>
      <div style={hideWhenVisible}>
        <div onClick={() => setBlogVisible(true)}>
          {blog.title} {blog.author} {blog.likes} {blog.url}
          <button onClick={addlikes}>add vote</button>

        </div>
      </div>
      <div style={showWhenVisible}>
        <div onClick={() => setBlogVisible(false)}>
        </div>
      </div>
    </div>
  )
}

export default Blog


