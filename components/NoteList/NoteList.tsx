"use client";

import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#6c757d" }}>No notes found.</p>
    );
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
          </div>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => onDelete?.(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
