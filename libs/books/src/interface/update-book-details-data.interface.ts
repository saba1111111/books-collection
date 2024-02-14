export interface UpdateBookDetailsData {
  bookId: number;
  updateData: {
    title?: string;
    description?: string;
    pages?: { id: number; content: string }[];
  };
}
