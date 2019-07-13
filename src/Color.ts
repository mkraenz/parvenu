export enum Color {
    Black = "#000000",
    White = "#ffffff",
    DarkGrey = "#222222",
}

const to0x = (color: Color) => color.replace("#", "0x");
export const toHex = (color: Color) => parseInt(to0x(color), 16);
