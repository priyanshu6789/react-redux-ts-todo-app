import { MuiStandardColors } from "../redux/todoSlice";

export const getRandomColor = (): MuiStandardColors => {
  const colors: MuiStandardColors[] = [
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
  ];
  let color: MuiStandardColors = colors[Math.floor(Math.random() * 6)];
  return color;
};
