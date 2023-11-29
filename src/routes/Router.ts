import express from "express";
import userRouter from "./User";

const router = express.Router();
router.get('/', (req, res, next) =>{
    res.status(200).send({
       title: "Login Project",
       version: "0.1"
    });
});

router.use('/users', userRouter);
export default router;