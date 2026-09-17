export type NoteBlock =
  | { t: "h"; text: string }                                  // section heading
  | { t: "p"; text: string }                                  // plain line
  | { t: "def"; term: string; text: string }                  // definition
  | { t: "f"; tex: string; label?: string }                   // boxed formula
  | { t: "fl"; items: { tex: string; label?: string }[] }     // compact formula list
  | { t: "steps"; title: string; items: string[] }            // numbered method
  | { t: "ex"; q: string; sol: string[] }                     // mini worked example
  | { t: "table"; head: string[]; rows: string[][] }          // small table
  | { t: "star"; text: string }                               // important
  | { t: "warn"; text: string };                              // red-pen warning

export type Note = { slug: string; title: string; pages: NoteBlock[][] };
