import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
  const { db } = await clientPromise();
  const projects = await db
    .collection("Users")
    .find({})
    .toArray();
  res.json(projects);
};
