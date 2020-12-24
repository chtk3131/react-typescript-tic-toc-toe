//1つのマス目オブジェクトに対する型
export type ISquare = "X" | "O" | null;

export type History = {
  squares:ISquare[];
}