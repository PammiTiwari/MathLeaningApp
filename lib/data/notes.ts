import { NOTES_A } from "./notes-a";
import { NOTES_B } from "./notes-b";
import { NOTES_C } from "./notes-c";
import type { Note } from "./note-types";

export const NOTES: Note[] = [...NOTES_A, ...NOTES_B, ...NOTES_C];

export function notesFor(slug: string) {
  return NOTES.find((n) => n.slug === slug);
}

export type { Note, NoteBlock } from "./note-types";
