import clientPromise from "../../lib/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  let { id } = req.query

 const client = await clientPromise
 const db = client.db("UIBucket")
 const projects = await db
   .collection("Project")
   .find({"_id" : ObjectID(id)})
   .toArray();

  res.json(projects[0]);
};
