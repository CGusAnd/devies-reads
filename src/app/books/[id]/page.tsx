import { backendCall } from "@/actions/backendCall";
import { Book } from "@/models/book";
import { notFound } from "next/navigation";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText,
  Col,
  Row
} from "react-bootstrap";
import { ManageShelfStatus } from "./manageShelfStatus";

export default async function bookPage({ params }: { params: { id: string } }) {
  const book = await getData(params.id);
  console.log(book);

  return (
    <main style={{ height: "800px" }}>
      <Card className="m-2" bg="secondary" text="light">
        <CardBody>
          <CardHeader className="mb-2">{book.name}</CardHeader>
          <CardSubtitle>{book.genre}</CardSubtitle>
          <CardText>{book.description}</CardText>
          <CardFooter>
            <Row>
              <Col>Rating: {book.averageRating.toFixed(2)}</Col>
              <Col>Read: {book.haveRead}</Col>
              <Col>Reading: {book.currentlyReading}</Col>
            </Row>
          </CardFooter>
        </CardBody>
      </Card>

      <ManageShelfStatus book={book} />
    </main>
  );
}

async function getData(id: string) {
  const res = await backendCall<Book>(`/books/${id}`, "GET");
  if (!res) notFound();
  return res;
}
