import React from "react";
import Button from "@material-ui/core/Button";

const MovieButton = ({ id, addNomineeHandler, theme, buttonStyle }) => {
	const cursorStyle = {
		enabled: {
			color: "white",
			backgroundColor: theme.palette.primary.dark,
			cursor: "pointer",
			pointerEvents: "auto",
		},
		disabled: {
			color: "white",
			backgroundColor: theme.palette.primary.light,
			cursor: "not-allowed",
			pointerEvents: "none",
		},
	};
	return (
		<Button
			onClick={() => addNomineeHandler(id)}
			style={cursorStyle[buttonStyle]}
			variant="contained"
		>
			Nominate
		</Button>
	);
};

export default MovieButton;
