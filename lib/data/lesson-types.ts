export type Beat =
  | { kind: "story"; text: string; emoji?: string }
  | { kind: "concept"; title: string; body: string; formula?: string; tag?: string }
  | { kind: "example"; problem: string; steps: { do: string; why: string }[]; answer: string }
  | { kind: "quiz"; q: string; options: string[]; correct: number; explain: string }
  | { kind: "trap"; text: string }
  | { kind: "boardtip"; text: string }
  | { kind: "victory"; text: string; recap: string[] };

export type Lesson = {
  slug: string;        // matches chapter slug
  title: string;
  xp: number;
  beats: Beat[];
};
