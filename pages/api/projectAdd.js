import clientPromise from "../../lib/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  let { teamLeader, name, description } = req.body

 const client = await clientPromise
 const db = client.db("UIBucket")
 const project = await db
   .collection("Project")
   .insertOne({
     name, description, teamLeader
   });

  res.json(true);
};
