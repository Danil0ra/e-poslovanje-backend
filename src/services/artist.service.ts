import { AppDataSource } from "../db";
import { Artists } from "../entities/Artists";
import { ArtistModel } from "../models/artist.model";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Artists);

export class ArtistService {
    static async getAllArtists(artistName?: string) {
        const data = await repo.find({
            select: {
                artistId: true,
                artistImage:true,
                artistName: true,
                artistGenre: true,
                artistBio: true,
                albums: {
                    albumId: true,
                    albumName: true,
                }
            },
            relations: {
                albums: true,
            },
            where: artistName ? { artistName: artistName } : {},
        });

        return checkIfDefined(data);
    }


    static async getArtistById(id: number) {
        const data = await repo.findOne({
            select:{
                artistId: true,
                artistImage:true,
                artistName: true,
                artistGenre: true,
                artistBio: true
            },
            where: { 
                artistId: id 
            }
        });
        
        return checkIfDefined(data);
    }

    static async createArtist(model:ArtistModel) {
        return await repo.save({
            artistImage:model.artistImage,
            artistName: model.artistName,
            artistGenre:model.artistGenre,
            artistBio:model.artistBio
        });
    }

    static async updateArtist(id: number, model:ArtistModel) {
        const data = await this.getArtistById(id);
        data.artistImage = model.artistImage
        data.artistName = model.artistName,
        data.artistGenre = model.artistGenre,
        data.artistBio = model.artistBio
        return await repo.save(data);
    }

    static async deleteArtist(id: number) {
        await repo.delete(id);
    }
}



