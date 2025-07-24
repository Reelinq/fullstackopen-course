import { View } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const AppBarTab = ({ content, endpoint }) => {
	return (
		<View>
			<Link to={endpoint}>
				<Text color="white" textWeight="bold" >{content}</Text>
			</Link>
		</View>
	)
};

export default AppBarTab;