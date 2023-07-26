import { Request, Response } from "express";

type post = {
  id: number;
  text: string;
};

let postsArr: post[] = [];

function getAll(req: Request, res: Response) {
  res.status(200).json(postsArr);
}

let currentId: number = 1;

function create(req: Request, res: Response) {
  let text: string = req.body.text;
  postsArr.push({ id: currentId, text: text });
  currentId = currentId + 1;
  res.json({ msg: "success adding post" });
}

function updateByID(req: Request, res: Response) {
  let text: string = req.body.text;
  let id: number = Number(req.params.id);
  let toBeUpdated = postsArr.find((el) => el.id === id);
  toBeUpdated.text = text;
  res.json({ msg: "success updating post" });
}

function deleteByID(req: Request, res: Response) {
  let id: number = Number(req.params.id);
  postsArr = postsArr.filter((el) => el.id !== id);
  res.json({ msg: "success deleting post" });
}

export { getAll, create, updateByID, deleteByID };
