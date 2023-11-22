import Vocabulary from "../vocabulary/vocabulary.model.js";
import Folder from "./folder.model.js";

async function getAllFolder(req, res) {
  const allFolder = await Folder.find();
  if (allFolder) {
    return res.status(200).json({ allFolder });
  } else {
    return res.status(404).json({ error: "Couldn't find Folder" });
  }
}

async function addNewFolder(req, res) {
  const { name } = req.body;
  const newFolder = {
    name: name
  };

  // add new Folders 
  const createdFolder = await Folder.create(newFolder);
  if (createdFolder) {
    return res.status(200).json({ message: "created successfully" });
  } else {
    return res.status(422).json({ message: "Unable to create new folder" });
  }
}

async function updateFolder(req, res) {
  const id = req.params.id;
  const { name } = req.body;
  const newFolder = {
    name: name
  };
  const response = await Folder.updateOne({_id: id}, newFolder);
  if (response) {
    return res.status(200).json({ message: "update successfully" });
  } else {
    return res.status(422).json({ message: "Unable to update Folder" });
  }
}

async function deleteFolder(req, res) {
  const id = req.params.id;
  const folder = await Folder.find({_id: id});
  console.log(folder[0].name);
  const response = await Folder.deleteOne({ _id: id });
  await Vocabulary.deleteMany({ folder: folder[0].name});
  if (response) {
    return res.status(200).json({ message: "delete successfully" });
  } else {
    return res.status(422).json({ message: "Unable to delete Folder" });
  }
}

export {
  addNewFolder,
  getAllFolder,
  updateFolder,
  deleteFolder,
};
