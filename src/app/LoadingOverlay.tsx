"use client";

import { useGlobal } from "@/context/globalContext";
import { Spinner } from "react-bootstrap";

export default function LoadingOverlay() {
  const { isLoading } = useGlobal();

  if (!isLoading) return null;

  return (
    <div className="position-absolute top-50 start-50 text-center translate-middle h-100 w-100">
      <div
        className="position-fixed w-100 h-100"
        style={{ background: "rgba(0,0,0,0.5)" }}
      />
      <div
        className="position-absolute top-50 align-start text-center d-block w-100 translate-middleY text-white"
        style={{ height: "300px", zIndex: 1000 }}
      >
        <Spinner animation="border" role="status" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
