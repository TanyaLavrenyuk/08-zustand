"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading note.</p>}
      {data && (
        <div>
          <span
            onClick={() => router.back()}
            style={{
              cursor: "pointer",
              color: "black",
              textDecoration: "underline",
            }}
          >
            Back
          </span>{" "}
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <p>Tag: {data.tag}</p>
          <p>Created: {new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </Modal>
  );
}
