import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { CardMedia } from "@material-ui/core";
import "../MovieDisplay/MovieDisplay";
import RemoveNominationButton from "../Buttons/RemoveNominationButton";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";

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

export default function NominationDisplay({
	nominated,
	removeNomineeHandler,
	theme,
	open,
	handleClose,
}) {
	const classes = useStyles();

	const body = (
		<div className={classes.paper}>
			<h3>Your results have been submitted</h3>
			<p>I do not have a backend yet</p>
			<Button
				variant="contained"
				color="primary"
				onClick={() =>
					alert("thanks for submitting, back end coming eventually")
				}
			>
				Submit Nominees
			</Button>
		</div>
	);

	const movies = nominated.map((movie, index) => {
		return (
			<Grid item xs={6} sm={4} className={classes.cardItems}>
				<img src={movie.Poster} className={classes.image} />
				<Typography align="center" noWrap gutterBottom>
					{movie.Title}
				</Typography>
				<RemoveNominationButton
					index={index}
					id={movie.imdbID}
					removeNomineeHandler={removeNomineeHandler}
					theme={theme}
				/>
			</Grid>
		);
	});
	return (
		<Grid container className={classes.movieContainer}>
			{movies}
			<Modal open={open} onClose={handleClose}>
				{body}
			</Modal>
		</Grid>
	);
}
