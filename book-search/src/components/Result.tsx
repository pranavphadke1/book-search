import { Col, Row } from "react-bootstrap";
import { BookResult } from "../types/bookResult";

interface ResultProps {
  book: BookResult;
}

function Result({ book }: ResultProps) {
  return (
    <Row className="d-flex mt-3 justify-content-center w-100 rounded border">
      <Col>
        <h2>{book.title}</h2>
        <p>
          <strong>Author(s): </strong>
          {book.author_name}
        </p>
        <p>
          <strong>Year Published: </strong>
          {book.first_publish_year}
        </p>
        <p>
          <strong>ISBN: </strong>
          {book.isbn?.join(", ")}
        </p>
        <p>
          <strong>Number of Pages: </strong>
          {book.number_of_pages_median}
        </p>
      </Col>
    </Row>
  );
}

export default Result;
