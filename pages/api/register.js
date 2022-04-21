import clientPromise from "../../lib/mongodb";
// WIP
export default async (req, res) => {

    const { name, email, password } = req.body

    const client = await clientPromise
    const db = client.db("UIBucket")
    const user = await db
      .collection("User")
      .find({email: email, password: password})
      .toArray();

    let authenticated = user.length;

    res.json({
      authenticated: authenticated == 1 ? true : false,
      userObject: user[0]
    });
};
