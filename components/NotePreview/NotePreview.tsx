"use client";

import { Note } from "@/types/note";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  const formattedDate = new Date(note.createdAt).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className={css.container}>
      <div className={css.item}>
        {/* Кнопка повернення назад */}
        <button className={css.backBtn} onClick={() => router.back()}>
          &larr; Back to notes
        </button>

        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <p className={css.content}>{note.content}</p>

        <span className={css.date}>{formattedDate}</span>
      </div>
    </article>
  );
}
