"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const response = await api.get(`/notes/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>Loading note...</p>
    );
  if (isError || !note)
    return (
      <p style={{ textAlign: "center", color: "#dc3545", padding: "40px" }}>
        Note not found.
      </p>
    );

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.backBtn} onClick={() => router.back()}>
              Back
            </button>
          </div>

          <div>
            <span className={css.tag}>{note.tag}</span>
          </div>

          <p className={css.content}>{note.content}</p>

          <div className={css.date}>{note.createdAt}</div>
        </div>
      </div>
    </main>
  );
}
