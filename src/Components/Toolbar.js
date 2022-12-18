import React, { useContext } from 'react';
import '../Assets/Styles/Toolbar.css';
import { Box } from '@mui/material';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { CanvasContext } from '../App';

export default function Toolbar() {
	const { actions } = useContext(CanvasContext);

	return (
		<div className='toolbar'>
			<Box
				sx={{
					width: 202,
					height: 38,
					backgroundColor: '#D9D9D9',
					border: 1,
				}}
			>
				<div className='icons'>
					<IconButton
						sx={{ color: 'black' }}
						onClick={() => actions.addElement('TEXT', '')}
					>
						<TextFieldsIcon />
					</IconButton>
					<IconButton sx={{ color: 'black' }}>
						<RedoIcon />
					</IconButton>
					<IconButton sx={{ color: 'black' }}>
						<UndoIcon />
					</IconButton>
				</div>
			</Box>
		</div>
	);
}
