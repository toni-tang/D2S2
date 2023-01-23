import React, { useState, useEffect, useContext } from 'react';
import '../Assets/Styles/TopPicks.css';
import { Box, Grid } from '@mui/material';
import { CanvasContext } from '../App';
import Picture from '../Components/Picture';
import parse from 'html-react-parser';
import axios from 'axios';

const style = {
	width: 300,
	height: 565,
	backgroundColor: '#D9D9D9',
	border: 1,
	overflow: 'scroll',
	overflowX: 'hidden',
};

const titleStyle = {
	paddingBottom: '20px',
};

export default function TopPicks() {
	const [topPicks, setTopPicks] = useState([]);
	const [timeoutID, setTimeoutID] = useState(null);
	const { state } = useContext(CanvasContext);

	useEffect(() => {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		const id = setTimeout(() => {
			console.log('Fetching Top Picks');

			let elements = [];

			for (let i = 0; i < state.canvas.length; i++) {
				let data = [
					state.canvas[i].position.left,
					state.canvas[i].position.top,
					parseInt(state.canvas[i].dimension.width),
					parseInt(state.canvas[i].dimension.height),
					parseInt(
						state.canvas[i].src.slice(
							0,
							state.canvas[i].src.length - 4
						)
					),
					state.canvas[i].type === 'TEXT'
						? parse(state.canvas[i].content).props.children
						: '',
				];

				elements.push(data);
			}

			const headers = {
				canvasHeight: '565',
				canvasWidth: '500',
				elements: JSON.stringify(elements),
			};
			const url = 'http://pixeltoapp.com/getTopPicks/';
			
			console.log(headers);

			axios
				.get(url, {
					headers,
				})
				.then((response) => {
					console.log(response);

					let data = [];

					for (let i = 0; i < 5; i++) {
						data.push(response.data[i]);
					}

					console.log(data);
					setTopPicks(data);
				});
		}, 4000);

		setTimeoutID(id);

		return () => {
			clearTimeout(id);
		};
	}, [state.canvas]);

	return (
		<Box
			sx={style}
			className='container'
		>
			<div style={titleStyle}>Top Picks</div>
			<Grid
				container
				spacing={1}
				columns={2}
			>
				{topPicks.map((picks) => {
					return (
						<Grid
							key={picks}
							item
						>
							<Picture
								key={picks}
								src={picks}
							></Picture>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
