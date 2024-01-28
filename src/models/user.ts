import { ShelfStatus } from "@/enums/shelfStatus";

export interface User {
  id: string;
  username: string;
  shelf: { bookId: string; status: ShelfStatus }[];
}
