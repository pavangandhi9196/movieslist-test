import styled from "@emotion/styled";
import Rating from "react-rating";

const Movie = styled.div`
  padding: 8px;
  margin: 4px;

  div {
    display: flex;
    justify-content: space-between;

    p,
    h5 {
      margin: 0;
      margin-bottom: 4px;
    }
  }
`;

const MovieListWrap = styled.div`
  width: 100%;
`;

const I = styled.i`
  font-size: 20px;
`;

const MovieList = ({ data }) => {
  return (
    <MovieListWrap className="mt-2 border border-dark">
      {data.map(({ title, rating, category }) => (
        <Movie key={title} key={title}>
          <div>
            <h5>{title}</h5>
            <p>{category}</p>
          </div>
          <Rating
            initialRating={rating}
            stop={10}
            readonly
            emptySymbol={<I className="far fa-star mr-1"></I>}
            fullSymbol={<I className="fas fa-star mr-1"></I>}
          />
        </Movie>
      ))}
    </MovieListWrap>
  );
};

export default MovieList;
