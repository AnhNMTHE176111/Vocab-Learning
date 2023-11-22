import express from 'express'
import { addNewFolder, deleteFolder, getAllFolder, updateFolder } from './folder.controller.js';
const FolderRouter = express.Router();

FolderRouter.post('/', addNewFolder); 
FolderRouter.get('/', getAllFolder); 
FolderRouter.put('/:id', updateFolder);
FolderRouter.delete('/:id', deleteFolder);

export default FolderRouter;