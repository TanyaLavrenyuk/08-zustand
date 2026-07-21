"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  tag: NoteTag | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

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

  const notesList = data?.notes || [];

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

        <Link href="/notes/action/create" className={css.button}>
          + Create New Note
        </Link>
      </div>

      {isError && (
        <p style={{ textAlign: "center", color: "#dc3545", padding: "40px" }}>
          Failed to load notes.
        </p>
      )}

      {isLoading ? (
        <p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>
      ) : notesList.length > 0 ? (
        <NoteList notes={notesList} />
      ) : (
        <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          No notes found.
        </p>
      )}
    </div>
  );
}
