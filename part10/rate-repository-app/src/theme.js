import { Searchbar } from "react-native-paper";

const theme = {
	colors: {
		bar: '#24292e',
		barText: '#ffffff',
		mainBackground: '#e1e4e8',
		itemBackground: '#ffffff',
		blue: '#0366d6',
	},
	text: {
		color: {
			primary: '#24292e',
			secondary: '#586069',
			error: '#d73a4a',
			white: '#ffffff',
		},
		font: {
			ultraSmall: 14,
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
		unEvenFlexStart: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'flex-start',
			gap: 15,
		}
	},
	images: {
		smallRoundedImage: {
			width: 60,
			height: 60,
			borderRadius: 8,
		},
	},
	buttons: {
		defaultButton: {
			backgroundColor: '#0366d6',
			padding: 15,
			borderRadius: 5,
			alignItems: 'center',
			marginTop: 15,
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
		ratingBadge: {
			width: 50,
			height: 50,
			borderRadius: 25,
			backgroundColor: '#ffffff',
			borderWidth: 2,
			borderColor: '#0366d6',
			justifyContent: 'center',
			alignItems: 'center',
			flexShrink: 0,
		},
	},
	forms: {
		input: {
			borderWidth: 1,
			borderColor: '#586069',
			padding: 10,
			borderRadius: 5,
		},
		Searchbar: {
			backgroundColor: '#ffffff',
			borderRadius: 10,
			elevation: 0,
			shadowOpacity: 0,
			borderWidth: 1,
			borderColor: '#d0d7de',
		}
	}
}

export default theme;