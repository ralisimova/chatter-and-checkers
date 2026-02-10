export interface Message {
  role: string;
  content: string;
}

export enum Role {
  User = "user",
  Assistant = "assistant",
}
