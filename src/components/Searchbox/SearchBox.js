import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const SearchBox = ({ fontTheme, setSearchInput }) => {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="my-input">Search Movies</InputLabel>
			<Input
				id="my-input"
				aria-describedby="my-helper-text"
				style={{ fontFamily: fontTheme.typography.fontFamily }}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			<FormHelperText id="my-helper-text">
				Up to 10 results will appear
			</FormHelperText>
		</FormControl>
	);
};

export default SearchBox;
