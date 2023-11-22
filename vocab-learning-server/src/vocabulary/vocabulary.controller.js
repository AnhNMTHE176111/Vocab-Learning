import Vocabulary from "./vocabulary.model.js";

async function getAllVocabulary(req, res) {
  const allVocab = await Vocabulary.find();
  if (allVocab) {
    return res.status(200).json({ vocab: allVocab });
  } else {
    return res.status(404).json({ error: "Couldn't find vocabulary" });
  }
}

async function addNewVocabulary(req, res) {
  const { word, meaning, wordType, example, folder } = req.body;
  const newWord = {
    word: word,
    meaning: meaning,
    wordType: wordType,
    example: example,
    folder: folder,
  };

  // check duplicate words in a folder
  const duplicateWords = await Vocabulary.find({ word: word, folder: folder });
  if (duplicateWords.length > 0) {
    return res.status(422).json({ message: "Duplicate word" });
  }

  // add new words
  const createdWord = await Vocabulary.create(newWord);
  if (createdWord) {
    return res.status(200).json({ message: "created successfully" });
  } else {
    return res.status(422).json({ message: "Unable to create new word" });
  }
}

async function updateVocabulary(req, res) {
  const id = req.params.id;
  const { word, meaning, wordType, example, folder } = req.body;
  const newWord = {
    word: word,
    meaning: meaning,
    wordType: wordType,
    example: example,
    folder: folder,
  };
  const response = await Vocabulary.updateOne({_id: id}, newWord);
  if (response) {
    return res.status(200).json({ message: "update successfully" });
  } else {
    return res.status(422).json({ message: "Unable to update word" });
  }
}

async function deleteVocabulary(req, res) {
  const id = req.params.id;
  const response = await Vocabulary.deleteOne({ _id: id });
  if (response) {
    return res.status(200).json({ message: "delete successfully" });
  } else {
    return res.status(422).json({ message: "Unable to delete word" });
  }
}

export {
  addNewVocabulary,
  getAllVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
