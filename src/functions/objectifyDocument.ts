import { Document } from "mongoose";

const objectifyDocument = (document: Document): any => {
  document = document.toObject();
  delete document.__v;
  delete document._id;
  return document;
};

export default objectifyDocument;
