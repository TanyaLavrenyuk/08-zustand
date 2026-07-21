"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

const TAG_OPTIONS: NoteTag[] = [
  "Work",
  "Personal",
  "Todo",
  "Meeting",
  "Shopping",
];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!draft.title.trim() || !draft.content.trim()) {
      return;
    }

    mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    } as Parameters<typeof createNote>[0]);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          disabled={isPending}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Category (Tag)</label>
        <select
          id="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
          disabled={isPending}
        >
          {TAG_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className={css.textarea}
          rows={5}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          disabled={isPending}
          required
        />
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Saving..." : "Save note"}
        </button>
      </div>
    </form>
  );
}
