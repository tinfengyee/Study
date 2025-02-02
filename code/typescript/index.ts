type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255] // 报错
} satisfies Record<Colors, string|RGB>
// Record<Colors, string|RGB>
const greenComponent = palette.green.substring(1); // 不报错