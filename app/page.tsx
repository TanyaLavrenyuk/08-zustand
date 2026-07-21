"use client";

export default function HomePage() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "80px 20px",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          marginBottom: "32px",
          color: "#1a1a1a",
        }}
      >
        Welcome to NoteHub
      </h1>

      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.8",
          color: "#555",
          marginBottom: "24px",
        }}
      >
        NoteHub is a simple and efficient application designed for managing
        personal notes. It helps keep your thoughts organized and accessible in
        one place, whether you are at home or on the go.
      </p>

      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.8",
          color: "#555",
        }}
      >
        The app provides a clean interface for writing, editing, and browsing
        notes. With support for keyword search and structured organization,
        NoteHub offers a streamlined experience for anyone who values clarity
        and productivity.
      </p>
    </div>
  );
}
