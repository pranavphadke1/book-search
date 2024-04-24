import { Col, Container, Row, Spinner } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import { ChangeEvent, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { BookResult } from "../types/bookResult";
import Result from "../components/Result";

function ResultsPage() {
  const [sortBy, setSortBy] = useState<string>("Relevancy");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<BookResult[]>([]);
  const [searchResultsByYear, setSearchResultsByYear] = useState<BookResult[]>(
    []
  );

  // Sorting most recent first
  const sortByYear = (books: BookResult[]) => {
    const sortedBooks = [...books].sort((a, b) => {
      return b.first_publish_year - a.first_publish_year;
    });
    setSearchResultsByYear(sortedBooks);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value !== "") {
      // make search string into query format
      const query = value.split(/\s+/).join("+");
      axios
        .get(`https://openlibrary.org/search.json?q=${query}`)
        .then((response) => {
          const results: BookResult[] = response.data.docs;
          setSearchResults(results);
          sortByYear(results);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    } else {
      setSearchResults([]);
      setSearchResultsByYear([]);
      setLoading(false);
    }
  };

  // Make a call every second (1000ms), instead of on input change
  const debounceSearch = debounce(handleSearch, 1000);

  return (
    <div>
      <SearchBar
        setSortBy={setSortBy}
        handleSearch={(event) => {
          setLoading(true);
          debounceSearch(event);
        }}
      />

      <Container className="d-flex flex-column justify-content-center align-items-center ">
        {!loading ? (
          sortBy === "Relevancy" ? (
            searchResults.length === 0 ? (
              <Row className="d-flex mt-3 justify-content-center">
                <Col>Search a book!</Col>
              </Row>
            ) : (
              searchResults.map((result, index) => (
                <Result key={index} book={result} />
              ))
            )
          ) : (
            searchResultsByYear.map((result, index) => (
              <Result key={index} book={result} />
            ))
          )
        ) : (
          <Spinner animation="border" />
        )}
      </Container>
    </div>
  );
}

export default ResultsPage;
