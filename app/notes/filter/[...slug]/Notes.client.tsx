"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, api } from "@/lib/api";
import { NoteTag, Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  tag: NoteTag | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, search: debouncedSearch, tag }],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, tag }),
    placeholderData: (keepPreviousData) => keepPreviousData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          + Create New Note
        </button>
      </div>

      {isError && (
        <p style={{ textAlign: "center", color: "#dc3545", padding: "40px" }}>
          Failed to load notes.
        </p>
      )}

      {isLoading ? (
        <p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>
      ) : (
        data && (
          <NoteList
            notes={data.notes || []}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        )
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={(newNote) =>
              createMutation.mutate(newNote as Omit<Note, "id" | "createdAt">)
            }
            onCancel={() => setIsModalOpen(false)}
            isLoading={createMutation.isPending}
          />
        </Modal>
      )}
    </div>
  );
}
