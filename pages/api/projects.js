import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
 const client = await clientPromise
 const db = client.db("UIBucket")
  const projects = await db
    .collection("Project")
    .find({})
    .toArray();
  res.json(projects);
};
