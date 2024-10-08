import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { configDotenv } from 'dotenv';
import { AppDataSource } from './db';
import { UserService } from './services/user.service';
import { AlbumService } from './services/album.service';
import { SongService } from './services/songs.service';
import { ArtistService } from './services/artist.service';
import { UserRoleService } from './services/user.role.service';
import { UserRoleRoute } from './routes/user.role.route';
import { SongRoute } from './routes/songs.route';
import { AlbumRoute } from './routes/album.route';
import { ReviewRoute } from './routes/review.route';
import { ArtistRoute } from './routes/artist.route';
import { Timestamp } from 'typeorm';
import { UserRoute } from './routes/user.route';
import { authenticateToken } from './utils';



const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

configDotenv();
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Database!");
    const port = process.env.SERVER_PORT || 4000;

    app.listen(port, () => {
      console.log("App started and listening on " + port);
    });
  })
  .catch((e) => console.log(e));

// app.get('/', async (req, res) => {
//   res.json(await UserRoleService.getAllUserRoles());
// });

app.use(authenticateToken)
app.use("/api/users", UserRoute);
app.use("/api/artists", ArtistRoute);
app.use("/api/albums", AlbumRoute);
app.use("/api/reviews", ReviewRoute);
app.use("/api/songs", SongRoute);
app.use("/api/user-roles", UserRoleRoute);

app.get('*', (req, res) => {
  res.status(404).json({
    message: "NOT_FOUND!",
    Timestamp: new Date()
  }); 
});

app.post('*', (req, res) => {
  res.status(501).json({
    message: "NOT_IMPLEMENTED!",
    Timestamp: new Date()
  });
});

app.put('*', (req, res) => {
  res.status(501).json({
    message: "NOT_IMPLEMENTED!",
    Timestamp: new Date()
  });
});

app.delete('*', (req, res) => {
  res.status(501).json({
    message: "NOT_IMPLEMENTED!",
    Timestamp: new Date()
  });
});
