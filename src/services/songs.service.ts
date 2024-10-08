import { AppDataSource } from "../db";
import { Songs } from "../entities/Songs";
import { SongModel } from "../models/song.model";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Songs);

export class SongService {
    static async getAllSongs(albumId?: number) {
        const data = await repo.find({
            select: {
                songId: true,
                name: true,
                album: {
                    albumId: true,
                    albumName: true,
                }
            },
            relations: {
                album: true,
            },
            where: albumId ? { album: { albumId: albumId } } : {},
        });

        return checkIfDefined(data);
    }


    static async getSongById(id: number) {
        const data = await repo.findOne({
            select: {
                songId: true,
                name: true,
                album:{
                  albumId: true}
            },
            where: {
                songId: id
            },

        });
        return checkIfDefined(data);
    }


    static async createSong(model: SongModel & { albumId: number }) {
        return await repo.save({
          songId:model.songId,
          name:model.name,
          albumId:model.albumId
        })
      }

    static async updateSong(id: number, model: SongModel & { albumId: number }) {
        const data = await this.getSongById(id);
        data.name = model.name
        data.albumId = model.albumId
        return await repo.save(data);
    }

    static async deleteSong(id: number) {
        await repo.delete(id);
    }
}

