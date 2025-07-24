import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef(
  ({ children }, ref) => {

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => ({
      toggleVisibility
    }))

    return (
      <>
        <span style={{ display: visible ? 'none' : '' }}>
          <button onClick={toggleVisibility}>create new blog</button>
        </span>

        <span style={{ display: visible ? '' : 'none' }}>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </span>
      </>
    )
  }
)

Togglable.displayName = 'Togglable'

export default Togglable