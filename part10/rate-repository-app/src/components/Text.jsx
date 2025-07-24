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
	smallText: {
		fontSize: theme.text.font.small,
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
		textFont === 'small' && styles.smallText,
		textWeight === 'bold' && styles.boldText,
		type === 'badge' && styles.badge,
		style,
	];

	return <NativeText style={textStyle} {...props} />;
};

export default Text;