/// <reference types="vite/client" />

type MuiStandardColors =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
interface ITodo {
  id: string;
  title: string;
  category: string;
  categoryChipColor: MuiStandardColors;
  isCompleted: boolean;
}
