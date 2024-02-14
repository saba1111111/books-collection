export interface IBooksReadTracking {
  id: number;
  userId: number;
  bookId: number;
  startReadAt: number;
  createdAt: Date;
  updatedAt: Date;
}
