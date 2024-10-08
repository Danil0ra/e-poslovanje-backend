export interface ReviewModel{
    reviewId: number,
    rating: number;
    reviewText: string;
    moderationStatus: string;
    albumId: number;
    userId: number; 
}