import '../index.css'

const Notification = ({ message}) => {
  if (message === null) {
    return null
  }

  if (message.includes('emoved') || message.includes('failed') || message.includes('error')){
  return (
    <div className='deletion'>
      {message}
    </div>
  )
  } else {
    return (
    <div className='info'>
      {message}
    </div>
  )
  }
}

export default Notification