import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const projects = await db
    .collection("Project")
    .find({})
    .toArray();
  res.json(projects);
};
