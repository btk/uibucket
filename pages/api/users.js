import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    const client = await clientPromise
    const db = client.db("UIBucket")
    const users = await db
      .collection("Users")
      .find({})
      .toArray();
    res.json(users);
};
