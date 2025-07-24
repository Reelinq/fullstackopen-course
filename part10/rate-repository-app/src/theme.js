const theme = {
	colors: {
		Bar: '#24292e',
		BarText: '#ffffff',
		MainBackground: '#e1e4e8',
		RepositoryItemBackground: '#ffffff',
	},
	position: {
		spaceAroundHorisontalFlex: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
		},
	},
	texts: {
		smallText: {
			color: '#24292e',
			fontSize: 16,
		},
		boldText: {
			color: '#24292e',
			fontWeight: 'bold',
			fontSize: 18,
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