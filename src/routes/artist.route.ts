import { Router } from "express";
import { ArtistService } from "../services/artist.service";
import { handleRequest } from "../utils";


export const ArtistRoute = Router();

ArtistRoute.get('/', async (req, res) => {
    await handleRequest(res, ArtistService.getAllArtists());
});


ArtistRoute.get('/:id', async (req, res) => {
    const id = req.params.id as any as number;
    await handleRequest(res, ArtistService.getArtistById(id));
});


ArtistRoute.post('/', async (req, res) => {
    await handleRequest(res, ArtistService.createArtist(req.body),);
});

ArtistRoute.put('/:id', async (req, res) => {
    const id = req.params.id as any as number;
    await handleRequest(res, ArtistService.updateArtist(id, req.body));
});

ArtistRoute.delete('/:id', async (req, res) => {
    const id = req.params.id as any as number;
    await handleRequest(res, ArtistService.deleteArtist(id));
});