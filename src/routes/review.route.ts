import { Router } from "express";
import { handleRequest } from "../utils";
import { ReviewService } from "../services/review.service";

export const ReviewRoute = Router();

ReviewRoute.get('/', async (req, res) => {
  const albumId = req.query.albumId ? parseInt(req.query.albumId as string, 10) : undefined;
  await handleRequest(res, ReviewService.getAllReviews(albumId));
});


ReviewRoute.get("/:id", async (req, res) => {
  const id = req.params.id as any as number;
  await handleRequest(res, ReviewService.getReviewById(id));
});

ReviewRoute.get("/album/:albumId", async (req, res) => {
  const albumId = req.params.albumId as any as number;
  await handleRequest(res, ReviewService.getReviewsByAlbum(albumId));
});


ReviewRoute.post("/", async (req, res) => {
  await handleRequest(res, ReviewService.createReview(req.body));
});

ReviewRoute.put("/:id", async (req, res) => {
  const id = req.params.id as any as number;
  await handleRequest(res, ReviewService.updateReview(id, req.body));
});

ReviewRoute.delete("/:id", async (req, res) => {
  const id = req.params.id as any as number;
  await handleRequest(res, ReviewService.deleteReview(id));
});
