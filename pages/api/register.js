import clientPromise from "../../lib/mongodb";
// WIP
export default async (req, res) => {

    const { name, email, password } = req.body


    let newUserObject = {name: name, email: email, password: password};

    const client = await clientPromise
    const db = client.db("UIBucket")
    const user = await db
      .collection("User")
      .insertOne(newUserObject);

    let authenticated = 1;

    // nullify the password for security
    newUserObject.password = "";

    res.json({
      authenticated: authenticated == 1 ? true : false,
      userObject: newUserObject
    });
};
