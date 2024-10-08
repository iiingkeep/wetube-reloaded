import express from "express";
import {watch, getEdit, postEdit, getUpload, postUpload, deleteVideo, deleteComment} from "../controllers/videoController"
import { protectorMiddleware, videoUploadMiddleware} from "../middlewares";

const videoRouter = express.Router();

videoRouter.get('/:id([0-9a-f]{24})', watch);
videoRouter
.route('/:id([0-9a-f]{24})/edit')
.all(protectorMiddleware)
.get(getEdit)
.post(postEdit);
videoRouter
.route('/:id([0-9a-f]{24})/delete')
.all(protectorMiddleware)
.get(deleteVideo);
videoRouter
.route('/upload')
.all(protectorMiddleware)
.get(getUpload)
.post(videoUploadMiddleware.fields([
  { name: "video" },
  { name: "thumb" }]),
  postUpload);
videoRouter.delete('/comments/:id([0-9a-f]{24})', deleteComment)
export default videoRouter;