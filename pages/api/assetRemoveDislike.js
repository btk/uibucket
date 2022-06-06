import clientPromise from "../../lib/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  let { id, assetId, userEmail, assetType } = req.body

 const client = await clientPromise
 const db = client.db("UIBucket")
 const project = await db
   .collection("Project")
   .findOneAndUpdate({"_id" : ObjectID(id)}, {
     $pull: {
       [`${assetType}.$[outer].dislikes`]: userEmail
     }
   },
  {
    "arrayFilters": [{ "outer.id": assetId }]
  })

  res.json(true);
};
