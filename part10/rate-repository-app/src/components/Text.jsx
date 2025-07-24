import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
	text: {
		color: theme.colors.textPrimary,
		fontSize: theme.textFont.normalText,
	},
	colorTextSecondary: {
		color: theme.colors.textSecondary,
	},
	smallText: {
		fontSize: theme.textFont.smallText
	},
	boldText: {
		fontWeight: theme.textWeight.boldText
	},
	badge: {
		...theme.badges.languageBadge
	}
});

const Text = ({ color, textFont, textWeight, type, style, ...props }) => {
	const textStyle = [
		styles.text,
		color === 'secondary' && styles.colorTextSecondary,
		textFont === 'small' && styles.smallText,
		textWeight === 'bold' && styles.boldText,
		type === 'badge' && styles.badge,
		style,
	];

	return <NativeText style={textStyle} {...props} />;
};

export default Text;