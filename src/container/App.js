import "fontsource-roboto";
import React, { useEffect, useState, useCallback } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import SearchBox from "../components/Searchbox/SearchBox";
import MovieDisplay from "../components/MovieDisplay/MovieDisplay";
import NominationDisplay from "../components/NominationDisplay/NominationDisplay";
import { Filter } from "@material-ui/icons";
import { debounce } from "debounce";
import Skeleton from "@material-ui/lab/Skeleton";

// i could implement a back end with logins so that the results actually get saved

//api call http://www.omdbapi.com/?apikey=86a0e89f&s=batman
//api key 86a0e89f

//debouncer
//security
// skeleton
// hover css
//built with material ui

function App() {
	const [movieData, setMovieData] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [nominated, setNominated] = useState([]);
	const [isValidating, setIsValidating] = useState(false);
	const [skeleton] = useState(["4k2", "2r4", "6w5", "5q7", "8f6"]);

	useEffect(() => {
		fetch(`http://www.omdbapi.com/?apikey=86a0e89f&s=${searchInput}`)
			.then((res) => res.json())
			.then((result) => setMovieData(result.Search));
	}, [searchInput]);

	const movieSearchHandler = (e) => {
		setSearchInput(e);
		e ? setIsValidating(true) : setIsValidating(false);
	};

	//searchInput && !movieData then isValidating = true
	// else isValidating = false
	// isValidating && skeleton
	// !isValidating && movieDisplay

	const optimizedSearch = useCallback(debounce(movieSearchHandler, 500), []);
	// checks to adjust properties so that buttons become disabled

	//
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
			<Box>
				<Container maxWidth="sm">
					<h1>NOMINATE YOUR FAVORITE MOVIE</h1>
				</Container>
			</Box>
			<Box>
				<Container maxWidth="sm">
					<SearchBox
						fontTheme={fontTheme}
						setSearchInput={(e) => optimizedSearch(e)}
					/>
				</Container>
			</Box>
			<Container maxWidth="lg">
				<h1>MOVIE SEARCH RESULTS</h1>
			</Container>
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
			<Box color={theme.palette.secondary.main}>
				<Container maxWidth="lg">
					<h1>FAVORITES</h1>
				</Container>
			</Box>
			{nominated && (
				<NominationDisplay
					nominated={nominated}
					removeNomineeHandler={removeNomineeHandler}
					theme={theme}
				/>
			)}
		</Box>
	);
}

export default App;
