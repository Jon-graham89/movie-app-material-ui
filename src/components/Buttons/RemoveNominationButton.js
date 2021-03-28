import React from "react";
import Button from "@material-ui/core/Button";

const RemoveNominationButton = ({ index, removeNomineeHandler, theme }) => {
	// if nominated {disabled}

	return (
		<Button
			onClick={() => removeNomineeHandler(index)}
			variant="contained"
			style={{ color: "black", backgroundColor: theme.palette.secondary.main }}
		>
			Remove Nominee
		</Button>
	);
};

export default RemoveNominationButton;
