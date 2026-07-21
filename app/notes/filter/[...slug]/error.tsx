"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function FilterError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Filter page error:", error);
  }, [error]);

  return (
    <div style={{ textAlign: "center", padding: "40px", color: "#dc3545" }}>
      <h2>Something went wrong loading the notes list!</h2>
      <p style={{ fontSize: "14px", opacity: 0.8 }}>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{ marginTop: "10px", padding: "8px 16px" }}
      >
        Try again
      </button>
    </div>
  );
}
