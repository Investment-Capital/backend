import { Document } from "mongoose";

const objectifyDocument = (document: Document<any>): any => {
  document = document.toObject();
  delete document._id;
  return document;
};

export default objectifyDocument;
