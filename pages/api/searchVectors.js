import clientPromise from "../../lib/mongodb";
import { ObjectID } from 'mongodb'
import get from '../../js/get'

export default async (req, res) => {
  let { search, limit } = req.query
  let svgapi = await get(`https://api.svgapi.com/v1/Ty5WcDa63E/list/`, { search, limit });
  res.json(svgapi.icons);
};
