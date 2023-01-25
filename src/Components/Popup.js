import {
	Dialog,
	DialogContent,
	DialogTitle,
	Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Popup(props) {
	const { children, openPopup, setOpenPopup } = props;

	return (
		<Dialog open={openPopup}>
			<DialogTitle>
				<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
					<Button
						sx={{ color: 'black' }}
						onClick={() => setOpenPopup(false)}
					>
						<CloseIcon />
					</Button>
				</div>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}

export default Popup;