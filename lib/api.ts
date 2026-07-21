import axios from "axios";
import { Note, NoteTag } from "@/types/note";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";
const AUTH_TOKEN =
  process.env.NEXT_PUBLIC_AUTH_TOKEN ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRsYXdyZW55dWs0M0BnbWFpbC5jb20iLCJpYXQiOjE3ODI5MzIyOTF9.AvCL_xFaWyI81bd8mWxQi5QCRQ1TsMnEH-y10L8pj_k";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: NoteTag | "all";
  limit?: number;
}

export const fetchNotes = async ({
  page = 1,
  search = "",
  tag = "all",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
  };

  if (search) {
    params.search = search;
  }

  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (
  noteData: Omit<Note, "id" | "createdAt">,
): Promise<Note> => {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
