import { Router } from "express";
import { handleRequest } from "../utils";
import { SongService } from "../services/songs.service";

export const SongRoute = Router();

SongRoute.get('/', async (req, res) => {
    await handleRequest(res, SongService.getAllSongs());
});

SongRoute.get("/:id", async (req, res) => {
    const id = req.params.id as any as number;
    await handleRequest(res, SongService.getSongById(id));
  });
  
  SongRoute.post("/", async (req, res) => {
    await handleRequest(res, SongService.createSong(req.body));
  });
  
  SongRoute.put("/:id", async (req, res) => {
    const id = req.params.id as any as number;
    await handleRequest(res, SongService.updateSong(id, req.body));
  });
  
  SongRoute.delete("/:id", async (req, res) => {
    const id = req.params.id as any as number;
    await handleRequest(res, SongService.deleteSong(id));
  });