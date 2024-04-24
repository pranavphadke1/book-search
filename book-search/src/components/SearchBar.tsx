import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  Form,
  InputGroup,
  Container,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

interface SearchBarProps {
  setSortBy: Dispatch<SetStateAction<string>>;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ setSortBy, handleSearch }: SearchBarProps) {
  const [dropdownTitle, setDropdownTitle] = useState<string>("Relevancy");

  const handleSort = (eventKey: string | null) => {
    if (eventKey) {
      setDropdownTitle(eventKey);
      setSortBy(eventKey);
    }
  };

  return (
    <Container className="d-flex mt-2 justify-content-center align-items-center ">
      <InputGroup size="lg" className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={dropdownTitle}
          onSelect={handleSort}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item eventKey="Relevancy">Relevancy</Dropdown.Item>
          <Dropdown.Item eventKey="Year">Year</Dropdown.Item>
        </DropdownButton>
        <Form.Control
          placeholder="Book name"
          aria-label="book-search"
          onChange={handleSearch}
        />
      </InputGroup>
    </Container>
  );
}

export default SearchBar;
