import clientPromise from "../../lib/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  let { id, vector } = req.body

 const client = await clientPromise
 const db = client.db("UIBucket")
 const project = await db
   .collection("Project")
   .findOneAndUpdate({"_id" : ObjectID(id)}, {
     $push: {
       vectors: vector
     }
   })

  res.json(true);
};
