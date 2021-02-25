import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { Row, Col } from "reactstrap";
import { intersectionWith, isEqual } from "lodash";
import DropDown from "./Component/DropDown";
import MovieList from "./Component/MovieList";
import { moviesData, defaultRatingOptions, defaultMoviesGenres } from "./data";

const Input = styled.input`
  width: 100%;
  padding: 12px;
`;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState(false);

  const [ratingDropDownVisibility, setRatingDropDownVisibility] = useState(
    false
  );
  const [ratingOptions, setRatingOptions] = useState([]);

  const [genreDropDownVisibility, setGenreDropDownVisibility] = useState(false);
  const [genreOptions, setGenreOptions] = useState([]);

  const filterOptions = useRef();

  useEffect(() => {
    setMovies(moviesData);
    setRatingOptions(defaultRatingOptions);
    setGenreOptions(defaultMoviesGenres);
    filterOptions.current = {
      search: "",
      selectedRatings: [],
      selectedGenres: [],
    };
  }, []);

  const applyFilter = () => {
    const { search, selectedRatings, selectedGenres } = filterOptions.current;

    const searchedMovies = moviesData.filter(({ title }) =>
      title.toLowerCase().includes(search?.toLowerCase())
    );

    const selectedRatingMovies = moviesData.filter(({ rating }) => {
      const finalRating = Math.round(rating);
      return selectedRatings.includes(finalRating);
    });

    const selectedGenreMovies = moviesData.filter(({ category }) =>
      selectedGenres.includes(category)
    );

    const filteredMovies = intersectionWith(
      search !== "" ? searchedMovies : moviesData,
      selectedRatings.length > 0 ? selectedRatingMovies : moviesData,
      selectedGenres.length > 0 ? selectedGenreMovies : moviesData,
      isEqual
    );

    if (
      search === "" &&
      selectedRatings.length === 0 &&
      selectedGenres.length === 0
    ) {
      setMovies(moviesData);
    } else {
      setMovies(filteredMovies);
    }
  };

  const handleInputChange = ({ target: { value } }) => {
    filterOptions.current.search = value;
    applyFilter();
  };

  const ratingChangeHandler = (ratingId) => {
    const isAllChecked = ratingOptions.find(({ id }) => id === -1).isSelected;
    let updatedRatingOptions;

    if (ratingId === -1) {
      updatedRatingOptions = ratingOptions.map((opt) => {
        return {
          ...opt,
          isSelected: !isAllChecked,
        };
      });
    } else {
      updatedRatingOptions = ratingOptions.map((opt) => {
        if (isAllChecked && opt.id === -1) {
          return {
            ...opt,
            isSelected: false,
          };
        }

        if (ratingId !== opt.id) {
          return opt;
        }

        return {
          ...opt,
          isSelected: !opt.isSelected,
        };
      });
    }

    setRatingOptions(updatedRatingOptions);

    const selectedRatings = updatedRatingOptions
      .filter(({ isSelected }) => isSelected)
      .map(({ id }) => id);

    filterOptions.current.selectedRatings = selectedRatings;

    applyFilter();
  };

  const genreChangeHandler = (genreType) => {
    const updatedGenreOptions = genreOptions.map((opt) => {
      if (genreType !== opt.type) {
        return opt;
      }

      return {
        ...opt,
        isSelected: !opt.isSelected,
      };
    });

    setGenreOptions(updatedGenreOptions);

    const selectedGenres = updatedGenreOptions
      .filter(({ isSelected }) => isSelected)
      .map(({ type }) => type);

    filterOptions.current.selectedGenres = selectedGenres;

    applyFilter();
  };

  return (
    <div className="container mt-4">
      <Row>
        <Col md="8" sm="12">
          <Input
            className="border border-dark"
            onChange={handleInputChange}
            onFocus={() => setShowMovies(true)}
            placeholder="Enter movie name"
          />
          {showMovies && movies.length > 0 && <MovieList data={movies} />}
        </Col>
        <Col md="4" sm="12">
          <Row style={{ position: "relative" }}>
            <Col md="6" sm="12" style={{ position: "initial" }}>
              <DropDown
                placeholder="Rating"
                options={ratingOptions}
                isOpen={ratingDropDownVisibility}
                setIsOpen={(visibility) => {
                  setGenreDropDownVisibility(false);
                  setRatingDropDownVisibility(visibility);
                  setShowMovies(visibility);
                }}
                onChange={ratingChangeHandler}
              />
            </Col>
            <Col md="6" sm="12">
              <DropDown
                placeholder="Genre"
                options={genreOptions}
                isOpen={genreDropDownVisibility}
                setIsOpen={(visibility) => {
                  setRatingDropDownVisibility(false);
                  setGenreDropDownVisibility(visibility);
                  setShowMovies(visibility);
                }}
                onChange={genreChangeHandler}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
