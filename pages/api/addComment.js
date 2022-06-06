import clientPromise from "../../lib/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  let { id, assetId, assetType, commentAdded } = req.body
 const client = await clientPromise
 const db = client.db("UIBucket")
 const project = await db
   .collection("Project")
   .findOneAndUpdate({"_id" : ObjectID(id)}, {
     $push: {
       [`${assetType}.$[outer].comments`]: commentAdded
     }
   },
  {
    "arrayFilters": [{ "outer.id": assetId }]
  })

  res.json(true);
};