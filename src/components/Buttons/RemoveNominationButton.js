import React from "react";
import Button from "@material-ui/core/Button";

const RemoveNominationButton = ({ index, removeNomineeHandler, theme }) => {
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
