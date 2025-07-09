import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef(
  ({ buttonLabel, children, showCancel = true }, ref) => {

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
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </span>

        <span style={{ display: visible ? '' : 'none' }}>
          {children}
          {showCancel && (
            <button onClick={toggleVisibility}>cancel</button>
          )}
        </span>
      </>
    )
  }
)

export default Togglable