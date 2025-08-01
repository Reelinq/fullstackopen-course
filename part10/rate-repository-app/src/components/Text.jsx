import { Text as NativeText, StyleSheet, Platform } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
	text: {
		color: theme.text.color.primary,
		fontSize: theme.text.font.normal,
		fontFamily: Platform.select({
			android: 'Roboto',
			ios: 'Arial',
			default: 'System',
		}),
	},
	colorTextSecondary: {
		color: theme.text.color.secondary,
	},
	colorTextWhite: {
		color: theme.text.color.white,
	},
	colorTextError: {
		color: theme.text.color.error,
	},
	colorTextBlue: {
		color: theme.colors.blue,
	},
	smallText: {
		fontSize: theme.text.font.small,
	},
	ultraSmallText: {
		fontSize: theme.text.font.ultraSmall,
	},
	boldText: {
		fontWeight: theme.text.weight.bold,
	},
	badge: {
		...theme.badges.languageBadge,
	}
});

const Text = ({ color, textFont, textWeight, type, style, ...props }) => {
	const textStyle = [
		styles.text,
		color === 'secondary' && styles.colorTextSecondary,
		color === 'white' && styles.colorTextWhite,
		color === 'error' && styles.colorTextError,
		color === 'blue' && styles.colorTextBlue,
		textFont === 'small' && styles.smallText,
		textFont === 'ultrasmall' && styles.ultraSmallText,
		textWeight === 'bold' && styles.boldText,
		type === 'badge' && styles.badge,
		style,
	];

	return <NativeText style={textStyle} {...props} />;
};

export default Text;