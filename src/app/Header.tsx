"use client";

import Link from "next/link";
import { Button, Container, Navbar } from "react-bootstrap";
import { useGlobal } from "@/context/globalContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { userData, logoutCleanup } = useGlobal();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutCleanup();
    router.refresh();
  };

  return (
    <Navbar className="fixed-top" bg="light">
      <Container className="justify-content-start">
        <Link className="btn btn-sm btn-light mx-2" href="/">
          Home
        </Link>
        <Link className="btn btn-sm btn-light mx-2" href="/books">
          Books
        </Link>
      </Container>

      <Container className="justify-content-end">
        {userData ? (
          <>
            <Link className="btn btn-sm btn-light" href="/user">
              My books
            </Link>
            <Button className="btn-sm btn-light" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/register" className="btn btn-sm btn-light">
              Signup
            </Link>
            <Link href="/login" className="btn btn-sm btn-light mx-3">
              Login
            </Link>
          </>
        )}
      </Container>
    </Navbar>
  );
}
