"use client";

import { backendCall } from "@/actions/backendCall";
import { ShelfStatusDropdown } from "@/components/ShelfStatusDropdown";
import { useGlobal } from "@/context/globalContext";
import { ShelfStatus } from "@/enums/shelfStatus";
import { Book } from "@/models/book";
import { User } from "@/models/user";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export function ManageShelfStatus({ book }: { book: Book }) {
  const { userData: user, setIsLoading, updateUserData } = useGlobal();

  if (!user) return null;

  const bookInShelf = user.shelf.find(({ bookId }) => bookId === book.id);
  const [shelfStatus, setShelfStatus] = useState<ShelfStatus | null>(
    bookInShelf?.status ?? null
  );
  const [userRating, setUserRating] = useState<number>(book.userRating);
  function onChange(newShelfStatus: ShelfStatus) {
    setShelfStatus(newShelfStatus);
  }

  function addToShelf() {
    const userId = user?.id;
    if (!userId) return;
    setIsLoading(true);
    backendCall<User>(`/users/${userId}/shelf`, "POST", {
      bookId: book.id,
      status: shelfStatus
    }).then((val) => {
      if (val) updateUserData(val);
      setIsLoading(false);
    });
  }

  function updateShelfStatus() {
    const userId = user?.id;
    if (!userId) return;
    setIsLoading(true);
    backendCall<User>(`/users/${userId}/shelf`, "PUT", {
      bookId: book.id,
      status: shelfStatus
    }).then((val) => {
      if (val) updateUserData(val);
      setIsLoading(false);
    });
  }

  function updateRating() {
    setIsLoading(true);
    backendCall<Book>(`/books/${book.id}/rate`, "POST", {
      bookId: book.id,
      rating: userRating
    }).then(() => setIsLoading(false));
  }

  return (
    <Container className="py-3 m-2 bg-secondary rounded w-100">
      {bookInShelf ? (
        <>
          <InputGroup className="mb-3">
            <InputGroupText id="rating-addon">Rating</InputGroupText>
            <FormControl
              type="number"
              aria-describedby="rating-addon"
              value={userRating}
              onChange={(e) => setUserRating(Number(e.currentTarget.value))}
            />
            <Button variant="primary" onClick={updateRating}>
              Update rating
            </Button>
          </InputGroup>
          <InputGroup className="pb-3">
            <InputGroupText id="current-status-text">
              Current shelf status
            </InputGroupText>
            <ShelfStatusDropdown value={shelfStatus} onChange={onChange} />
            <Button variant="primary" onClick={updateShelfStatus}>
              Update shelf status
            </Button>
          </InputGroup>
        </>
      ) : (
        <Row>
          <Col>
            <ShelfStatusDropdown value={shelfStatus} onChange={onChange} />
          </Col>
          <Col>
            <Button
              disabled={shelfStatus === null}
              className="btn-sm btn-primary"
              onClick={addToShelf}
            >
              Add to shelf
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}
