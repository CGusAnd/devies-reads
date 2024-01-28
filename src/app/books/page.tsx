import { backendCall } from "@/actions/backendCall";
import { Book } from "@/models/book";
import Link from "next/link";
import { Table } from "react-bootstrap";

export default async function listBooks({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const books = await getBooks(searchParams);

  const SortableHeader = ({
    children,
    name
  }: {
    children: React.ReactNode;
    name: string;
  }) => {
    return (
      <th>
        <Link className="text-black" href={`/books?sortBy=${name}`}>
          {children}
        </Link>
      </th>
    );
  };

  return (
    <main>
      <Table>
        <thead>
          <tr>
            <SortableHeader name="name">Name</SortableHeader>
            <th>Genre</th>
            <th>Avg. rating</th>
            <SortableHeader name="haveRead">Read</SortableHeader>
            <SortableHeader name="currentlyReading">Reading</SortableHeader>
            <SortableHeader name="wantToRead">Want to read</SortableHeader>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>
                <Link href={`/books/${b.id}`}>{b.name}</Link>
              </td>
              <td>{b.genre}</td>
              <td>{b.averageRating.toPrecision(3)}</td>
              <td>{b.haveRead}</td>
              <td>{b.currentlyReading}</td>
              <td>{b.wantToRead}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
}

async function getBooks(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  let endpoint = "/books";
  if (searchParams.sortBy) {
    endpoint += `?sortBy=${searchParams.sortBy}`;
  }
  const res = await backendCall<Book[]>(endpoint, "GET");
  if (!res) return [];
  return res;
}
