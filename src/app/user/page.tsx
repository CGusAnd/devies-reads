"use client";

import { useGlobal } from "@/context/globalContext";
import Link from "next/link";
import { Table } from "react-bootstrap";

export default function userPage() {
  const { userData } = useGlobal();
  if (!userData) return null;

  return (
    <main>
      <div className="w-100 px-3 pb-4">
        <h2>Welcome {userData.username}</h2>
        <Table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Status</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {userData.shelf.map((book) => (
              <tr key={book.bookId}>
                <td>{book.bookId}</td>
                <td>{book.status}</td>
                <td>
                  <Link href={`/books/${book.bookId}`}>go to book page</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}
