import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const ExpandBlog = forwardRef(({ blog, children }, ref) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => ({
		toggleVisibility,
	}))

	return (
		<>
			<span style={{ display: visible ? 'none' : '' }}>
				<span>
					{blog.title} {blog.author}
				</span>
				<button onClick={toggleVisibility}>show</button>
			</span>

			<span style={{ display: visible ? '' : 'none' }}>{children}</span>
		</>
	)
})

ExpandBlog.propTypes = {
	blog: PropTypes.object.isRequired,
}

ExpandBlog.displayName = 'ExpandBlog'

export default ExpandBlog
