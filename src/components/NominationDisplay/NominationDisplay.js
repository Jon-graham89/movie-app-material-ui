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

export default function NominationDisplay({
	nominated,
	removeNomineeHandler,
	theme,
}) {
	const movies = nominated.map((movie, index) => {
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
					<RemoveNominationButton
						index={index}
						id={movie.imdbID}
						removeNomineeHandler={removeNomineeHandler}
						theme={theme}
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
