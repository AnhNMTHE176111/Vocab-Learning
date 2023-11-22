import express from 'express'
import { addNewVocabulary, deleteVocabulary, getAllVocabulary, updateVocabulary } from './vocabulary.controller.js';
const vocabularyRouter = express.Router();

vocabularyRouter.post('/', addNewVocabulary); 
vocabularyRouter.get('/', getAllVocabulary); 
vocabularyRouter.put('/:id', updateVocabulary);
vocabularyRouter.delete('/:id', deleteVocabulary);

export default vocabularyRouter;