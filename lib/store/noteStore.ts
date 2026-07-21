import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteTag } from "../../types/note";

interface DraftNote {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: DraftNote;
  setDraft: (note: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note: Partial<DraftNote>) =>
        set((state: NoteStore) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
      partialize: (state: NoteStore) => ({ draft: state.draft }),
    },
  ),
);
