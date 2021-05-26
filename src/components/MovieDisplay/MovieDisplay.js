import React from "react";
import "./MovieDisplay.css";
import MovieButton from "../Buttons/MovieButton";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	paper: {
		margin: "20% 30%",
		width: 350,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	cardItems: {
		outline: "1px solid grey",
		padding: "3%",
	},
	image: {
		width: "90%",
		height: "auto",
	},
}));

export default function MovieDisplay({
	movieData,
	addNomineeHandler,
	theme,
	nominated,
}) {
	const classes = useStyles();
	const movies = movieData.map((movie, index) => {
		movie.buttonStyle = "enabled";
		// enable / disable button checker
		nominated.forEach((film) => {
			if (film.imdbID === movie.imdbID) {
				movie.buttonStyle = "disabled";
			}
		});

		return (
			<Grid item xs={6} sm={4} className={classes.cardItems}>
				<img src={movie.Poster} className={classes.image} />
				<Typography align="center" noWrap gutterBottom>
					{movie.Title}
				</Typography>
				<MovieButton
					id={movie.imdbID}
					addNomineeHandler={addNomineeHandler}
					index={index}
					buttonStyle={movie.buttonStyle}
					theme={theme}
				/>
			</Grid>
		);
	});
	return (
		<Grid container className={classes.movieContainer}>
			{movies}
		</Grid>
	);
}
