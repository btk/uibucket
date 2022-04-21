import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  let { email } = req.query

 const client = await clientPromise
 const db = client.db("UIBucket")
  const projects = await db
    .collection("Project")
    .find({$or:
      [
        {
          'teamLeader.email': email
        },
        {
          'teamMembers': {$elemMatch: {email: email}},
        }
      ]
    })
    .toArray();
  res.json(projects);
};
