import styled from "@emotion/styled";
import Rating from "react-rating";
import { Input } from "reactstrap";

const DropdownList = styled.div`
  min-width: 100%
  width: max-content;
  display: flex;
  flex-direction: column;
  padding: 8px;

  div {
    margin: 4px 0;
  }
  p {
    margin: 0;
    font-size: 18px
  }
`;

const I = styled.i`
  font-size: 20px;
`;

const DropDown = ({ placeholder, options, isOpen, setIsOpen, onChange }) => {
  return (
    <div className="w-100">
      <div
        style={{ padding: "12px" }}
        className="btn border border-dark rounded-0 w-100 text-dark font-weight-bold d-flex align-items-center justify-content-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {placeholder}
        {isOpen ? <b>&and;</b> : <b>&or;</b>}
      </div>
      {isOpen && (
        <DropdownList
          className="border border-dark mt-2"
          style={{
            position: "absolute",
            left: "15px",
            width: "calc(100% - 30px)",
          }}
        >
          {options.map(({ id, type, isSelected }, index) => (
            <div
              className="row align-items-center"
              key={(id ?? type).toString() + index}
            >
              <Input
                checked={isSelected}
                type="checkbox"
                className="ml-2"
                style={{ fontSize: 20 }}
                onChange={() => onChange(id ?? type)}
              />
              <div className="ml-2">
                {type || id === -1 ? (
                  <p className="ml-4">{type || "All Rating"}</p>
                ) : (
                  <Rating
                    className="ml-4"
                    initialRating={id}
                    stop={10}
                    readonly
                    emptySymbol={<I className="far fa-star mr-1"></I>}
                    fullSymbol={<I className="fas fa-star mr-1"></I>}
                  />
                )}
              </div>
            </div>
          ))}
        </DropdownList>
      )}
    </div>
  );
};

export default DropDown;
