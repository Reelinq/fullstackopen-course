const theme = {
	colors: {
		bar: '#24292e',
		barText: '#ffffff',
		mainBackground: '#e1e4e8',
		repositoryItemBackground: '#ffffff',
		textPrimary: '#24292e',
		textSecondary: '#586069',
	},
	textFont: {
		smallText: 16,
		normalText: 18,
	},
	textWeight: {
		boldText: 'bold',
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
}

export default theme;