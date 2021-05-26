import "fontsource-roboto";
import React, { useEffect, useState, useCallback } from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import SearchBox from "../components/Searchbox/SearchBox";
import MovieDisplay from "../components/MovieDisplay/MovieDisplay";
import NominationDisplay from "../components/NominationDisplay/NominationDisplay";
import Grid from "@material-ui/core/Grid";
import { debounce } from "debounce";
import Skeleton from "@material-ui/lab/Skeleton";
import Button from "@material-ui/core/Button";

// i could implement a back end with logins so that the results actually get saved
const useStyles = makeStyles({
	titleCentering: {
		display: "flex",
		justifyContent: "center",
	},
	submitBtnEnd: {
		display: "flex",
		justifyContent: "flex-start",
		alignContent: "center",
		alignItems: "center",
	},

	box: {
		display: "flex",
		flexWrap: "wrap",
	},
	hOne: {
		height: "50px",
	},
});

function App() {
	const classes = useStyles();

	const [movieData, setMovieData] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [nominated, setNominated] = useState([]);
	const [isValidating, setIsValidating] = useState(false);
	const [skeleton] = useState(["4k2", "2r4", "6w5", "5q7", "8f6"]);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		return setOpen(false);
	};

	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_OMDB_URL}=${process.env.REACT_APP_OMDB_API_KEY}=${searchInput}`
		)
			.then((res) => res.json())
			.then((result) => setMovieData(result.Search));
	}, [searchInput]);

	const movieSearchHandler = (e) => {
		setSearchInput(e);
		e ? setIsValidating(true) : setIsValidating(false);
	};

	const optimizedSearch = useCallback(debounce(movieSearchHandler, 500), []);

	const addNomineeHandler = (id) => {
		if (nominated.length === 5) {
			return alert("Already selected 5 films");
		}

		//find in movieData
		const nominateMovie = movieData.filter((movie) => {
			return movie.imdbID === id;
		});

		//find in nominated
		const foundInNominated = nominated.find((movie) => {
			return movie.imdbID === id;
		});

		if (!foundInNominated) {
			const updatedNoms = [...nominated, nominateMovie[0]];
			setNominated(updatedNoms);
			// handle Modal
			if (updatedNoms.length === 5) {
				return handleOpen();
			}
		} else {
			alert(`${foundInNominated.Title} already selected`);
		}
	};

	// properties in movies needs to get adjusted here so that buttons become active
	const removeNomineeHandler = (index) => {
		const updatedNoms = [...nominated];
		updatedNoms.splice(index, 1);
		setNominated(updatedNoms);
	};

	const submitFavoritesButton = () => {
		if (nominated.length < 5) {
			return (
				<Button variant="contained" color="primary" disabled>
					Submit Nominees
				</Button>
			);
		} else {
			return (
				<Button
					variant="contained"
					color="primary"
					onClick={() =>
						alert("thanks for submitting, back end coming eventually")
					}
				>
					Submit Nominees
				</Button>
			);
		}
	};

	const theme = createMuiTheme({
		palette: {
			primary: {
				light: "#757ce8",
				main: "#3f50b5",
				dark: "#002884",
				contrastText: "#fff",
			},
			secondary: {
				light: "#ff7961",
				main: "#f44336",
				dark: "#ba000d",
				contrastText: "#000",
			},
		},
	});

	const fontTheme = createMuiTheme({
		typography: {
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
		},
	});

	return (
		<Box
			style={{
				fontFamily: fontTheme.typography.fontFamily,
				color: theme.palette.primary.main,
			}}
		>
			{" "}
			<Grid container>
				<Grid item sm={12} className={classes.titleCentering}>
					<h1>Nominate You Favorite Movies</h1>
				</Grid>

				<Grid container>
					<Grid item xs={12} className={classes.titleCentering}>
						<SearchBox
							fontTheme={fontTheme}
							setSearchInput={(e) => optimizedSearch(e)}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12} className={classes.submitBtnEnd}>
					{submitFavoritesButton()}
				</Grid>
			</Grid>
			<Grid container className={classes.box} spacing={3}>
				<Grid item md={6} xs={12} className={classes.containers}>
					<Grid item sm={12} className={classes.titleCentering}>
						<h1>Movie Search Results</h1>
					</Grid>
					<Grid item lg={12}>
						{movieData && (
							<MovieDisplay
								movieData={movieData}
								addNomineeHandler={addNomineeHandler}
								theme={theme}
								nominated={nominated}
							/>
						)}

						{!movieData && isValidating && (
							<Box display="flex">
								{skeleton.map((el) => {
									return (
										<Skeleton
											variant="rect"
											width={275}
											height={400}
											className="skeleton"
											animation="wave"
											key={el}
										/>
									);
								})}
							</Box>
						)}
					</Grid>
				</Grid>
				<Grid item md={6} xs={12} className={classes.containers}>
					<Grid item sm={12} className={classes.titleCentering}>
						<h1 style={{ color: theme.palette.secondary.main }}>Nominees</h1>
					</Grid>

					{nominated && (
						<NominationDisplay
							nominated={nominated}
							removeNomineeHandler={removeNomineeHandler}
							theme={theme}
							open={open}
							handleClose={handleClose}
						/>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}

export default App;
