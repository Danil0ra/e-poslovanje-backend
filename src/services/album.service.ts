
import { AppDataSource } from "../db";
import { Albums } from "../entities/Albums";
import { checkIfDefined } from "../utils";
import { AlbumModel } from "../models/album.model";


const repo = AppDataSource.getRepository(Albums)

export class AlbumService {
    static async getAllAlbums() {
        const data = await repo.find({
            select: {
                albumId: true,
                albumImage: true,
                albumName: true,
                albumGenre: true,
                artist: {
                    artistId: true,
                    artistName: true
                },
            },
            relations: {
                artist: true,
                reviews: true,
                songs: true,
            },
            where: {
                // Kasnije implementirati filtriranje 
            },
        });

        return checkIfDefined(data);
    }


    static async getAlbumById(id: number) {
        const data = await repo.findOne({
            select: {
                albumId: true,
                albumImage: true,
                albumName: true,
                albumGenre: true,
                artist: {
                    artistId: true,
                    artistName: true
                },
            },
            relations: {
                artist: true,
            },
            where: {
                albumId: id
            },

        });
        return checkIfDefined(data);
    }

    static async createAlbum(model:AlbumModel) {
        return await repo.save({
            albumName: model.albumName,
            albumImage: model.albumImage,
            albumGenre: model.albumGenre,
            artistId: model.artistId,
        });
    }

    static async updateAlbum(id: number, model: AlbumModel) {
        const data = await this.getAlbumById(id);
        data.albumName = model.albumName;
        data.albumImage = model.albumImage,
        data.albumGenre = model.albumGenre




        return await repo.save(data);
    }

    static async deleteAlbum(id: number) {
        await repo.delete(id);
    }
}

