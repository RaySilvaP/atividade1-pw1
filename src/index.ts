import express from 'express';
import { router as technologyController} from './controller/technologyController';
import { router as userController } from './controller/userController';

const app = express();

app.use(express.json());
app.use('/technologies', technologyController);
app.use('/users', userController);

app.listen("3333", () => {
    console.log(`[server]: Server is running at http://localhost:3333`);
});
