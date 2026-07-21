import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const tag = slug && slug[0] ? slug[0] : "all";

  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  const title = `Notes - ${capitalizedTag} | NoteHub`;
  const description = `View and manage your ${tag} notes in NoteHub application.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${slug ? slug.join("/") : "all"}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${capitalizedTag} Notes - NoteHub`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const tag = slug && slug[0] ? (slug[0] as NoteTag) : "all";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", tag }],
    queryFn: () => fetchNotes({ page: 1, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
