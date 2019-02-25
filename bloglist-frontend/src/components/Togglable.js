import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style = {style}>
      <div style={hideWhenVisible}>
        <div onClick={toggleVisibility}>{props.buttonLabel}</div>
      </div>
      <div style={showWhenVisible}>
        <div onClick={toggleVisibility}>{props.children}</div>
      </div>
    </div>
  )
}
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable