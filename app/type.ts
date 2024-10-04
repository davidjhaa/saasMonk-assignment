// types.ts (or a similar shared file)
export interface Review {
    id: string; // Assuming 'id' is required
    reviewerName: string;
    rating: number;
    comment: string; // Make sure this is NOT optional if you want it to be required
    createdAt?: Date; // Optional property
  }
  