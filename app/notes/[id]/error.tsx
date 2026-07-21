"use client";

import { useEffect } from "react";

interface NoteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteError({ error, reset }: NoteErrorProps) {
  useEffect(() => {
    console.error("Logged note detail error:", error);
  }, [error]);

  return (
    <div style={{ textAlign: "center", padding: "40px", color: "#dc3545" }}>
      <h2>Something went wrong loading the note!</h2>
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
