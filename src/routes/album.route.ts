import { Router } from "express";
import { handleRequest } from "../utils";
import { AlbumService } from "../services/album.service";

export const AlbumRoute = Router();

AlbumRoute.get('/', async (req, res) => {
    await handleRequest(res, AlbumService.getAllAlbums());
});

AlbumRoute.get("/:id", async (req, res) => {
    const id = req.params.id as any as number;
    await handleRequest(res, AlbumService.getAlbumById(id));
  });
  
  AlbumRoute.post("/", async (req, res) => {
    await handleRequest(res, AlbumService.createAlbum(req.body));
  });
  
  AlbumRoute.put("/:id", async (req, res) => {
    const id = req.params.id as any as number;
    await handleRequest(res, AlbumService.updateAlbum(id, req.body));
  });
  
  AlbumRoute.delete("/:id", async (req, res) => {
    const id = req.params.id as any as number;
    await handleRequest(res, AlbumService.deleteAlbum(id));
  });
