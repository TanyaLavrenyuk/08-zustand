import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const noteId = resolvedParams.id;

  try {
    const note = await fetchNoteById(noteId);

    return {
      title: `${note.title} | NoteHub`,
      description:
        note.content.slice(0, 100) + (note.content.length > 100 ? "..." : ""),
      openGraph: {
        title: `${note.title} | NoteHub`,
        description:
          note.content.slice(0, 100) + (note.content.length > 100 ? "..." : ""),
        url: `https://notehub.com/notes/${noteId}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Note Details | NoteHub",
      description: "View note details in NoteHub application.",
    };
  }
}

export default async function NoteDetailPage() {
  return <NoteDetailsClient />;
}
