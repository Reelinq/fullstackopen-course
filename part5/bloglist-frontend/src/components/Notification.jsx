import '../index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('wrong')){
  return (
    <div className='info' style={{ color: 'red' }}>
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