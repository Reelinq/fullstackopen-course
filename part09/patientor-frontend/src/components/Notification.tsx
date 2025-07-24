import { useEffect } from "react";
import { Alert } from "@mui/material";

type NotificationProps = {
	message: string;
	onClear: React.Dispatch<React.SetStateAction<string>>
};

const Notification = ({ message, onClear }: NotificationProps) => {
	useEffect(() => {
		if (message) {
			setTimeout(() => {
				onClear('');
			}, 5000);
		}
	}, [message, onClear]);

	if (!message) return null;

	return (
		<div>
			<Alert severity="error" variant="filled">
				{message}
			</Alert>
		</div>
	);
};

export default Notification;