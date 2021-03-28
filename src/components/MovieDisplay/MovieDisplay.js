import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import { CardMedia } from "@material-ui/core";
import "./MovieDisplay.css";
import MovieButton from "../Buttons/MovieButton";

const cursorStyle = {
	enabled: {
		cursor: "pointer",
		pointerEvents: "auto",
	},
	disabled: {
		cursor: "not-allowed",
		pointerEvents: "none",
	},
};

export default function MovieDisplay({
	movieData,
	addNomineeHandler,
	theme,
	nominated,
}) {
	const movies = movieData.map((movie, index) => {
		movie.buttonStyle = "enabled";
		nominated.forEach((film) => {
			if (film.imdbID === movie.imdbID) {
				movie.buttonStyle = "disabled";
			}
		});
		// add another loop for nominated to check if exists then change the button enabled / disabled
		return (
			<Card variant="outlined" style={{ minWidth: 275 }} key={movie.imdbID}>
				<CardContent>
					<CardMedia
						image={movie.Poster}
						style={{ height: "400px" }}
						className="hvr-grow"
					/>
					<Box display="block" style={{ whiteSpace: "pre-line" }}>
						<h4>{movie.Title}</h4> <h5>{movie.Year}</h5>
					</Box>
				</CardContent>
				<CardActions>
					<MovieButton
						index={index}
						id={movie.imdbID}
						addNomineeHandler={addNomineeHandler}
						theme={theme}
						buttonStyle={movie.buttonStyle}
					/>
				</CardActions>
			</Card>
		);
	});
	return (
		<Box display="flex" style={{ overflow: "auto", whiteSpace: "nowrap" }}>
			{movies}
		</Box>
	);
}
