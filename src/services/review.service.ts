import { AppDataSource } from "../db";
import { Albums } from "../entities/Albums";
import { Reviews } from "../entities/Reviews";
import { Users } from "../entities/Users";
import { ReviewModel } from "../models/review.model";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Reviews);

export class ReviewService {
    static async getAllReviews(albumId?: number) {
        const whereCondition: any = {};
        
        if (albumId) {
            whereCondition.album = {
                albumId: albumId
            };
        }
    
        const data = await repo.find({
            select: {
                reviewId: true,
                rating: true,
                reviewText: true,
                moderationStatus: true,
                album: {
                    albumId: true,
                    albumName: true,
                },
                user: {
                    userId: true,
                    username: true,
                }
            },
            relations: {
                album: true,
                user: true,
            },
            where: whereCondition,
        });
    
        return checkIfDefined(data);
    }
    

    static async getReviewById(id: number) {
        const data = await repo.findOne({
            select: {
                reviewId: true,
                rating: true,
                reviewText: true,
                moderationStatus: true,
            },
            where: {
                reviewId: id
            },

        });
        return checkIfDefined(data);
    }

    static async getReviewsByAlbum(albumId: number) {
        const data = await repo.find({
            select: {
                reviewId: true,
                rating: true,
                reviewText: true,
                moderationStatus: true,
                user: {
                    userId: true,
                    username: true
                }
            },
            relations: {
                user: true
            },
            where: { album: { albumId: albumId }, moderationStatus: 'APPROVED' }
        });
    
        return checkIfDefined(data);
    }
    

    static async createReview(model: ReviewModel) {
        const album = await AppDataSource.getRepository(Albums).findOne({ where: { albumId: model.albumId } });
        const user = await AppDataSource.getRepository(Users).findOne({ where: { userId: model.userId } });

        if (!album || !user) {
            throw new Error('Album or User not found');
        }

        return await repo.save({
            rating: model.rating,
            reviewText: model.reviewText,
            album: album,
            user: user,
            moderationStatus: model.moderationStatus || 'PENDING'
        });
    }



    static async updateReview(id: number, model: ReviewModel) {
        const data = await this.getReviewById(id);
        data.rating = model.rating;
        data.reviewText = model.reviewText;

        return await repo.save(data);
    }


    static async deleteReview(id: number) {
        await repo.delete(id);
    }
}
