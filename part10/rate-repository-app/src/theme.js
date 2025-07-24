const theme = {
	colors: {
		bar: '#24292e',
		barText: '#ffffff',
		mainBackground: '#e1e4e8',
		itemBackground: '#ffffff',
	},
	text: {
		color: {
			primary: '#24292e',
			secondary: '#586069',
			error: '#d73a4a',
			white: '#ffffff',
		},
		font: {
			small: 16,
			normal: 18,
		},
		weight: {
			bold: 'bold',
		},
	},
	position: {
		spaceAroundHorisontalFlex: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
		},
	},
	images: {
		smallRoundedImage: {
			width: 60,
			height: 60,
			borderRadius: 8,
		},
	},
	badges: {
		languageBadge: {
			color: '#ffffff',
			backgroundColor: '#0366d6',
			borderRadius: 6,
			padding: 6,
			fontSize: 14,
			alignSelf: 'flex-start',
		},
	},
	forms: {
		input: {
			borderWidth: 1,
			borderColor: '#586069',
			padding: 10,
			borderRadius: 5,
		}
	}
}

export default theme;