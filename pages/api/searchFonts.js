import clientPromise from "../../lib/mongodb";
import { ObjectID } from 'mongodb'
import get from '../../js/get'

export default async (req, res) => {
  let { search, limit, key } = req.query
  let gf = await get(`https://www.googleapis.com/webfonts/v1/webfonts`, { key });

  let fonts = gf.items.filter(item => {
    return item.family.toLowerCase().includes(search) || item.category.toLowerCase().replace("-", " ").includes(search);
  }).slice(0, limit);
  res.json(fonts);
};
