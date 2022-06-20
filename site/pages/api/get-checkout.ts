import type { NextApiRequest, NextApiResponse } from 'next'
import { getCheckoutId} from "../../services/ecomApiService";



export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {cartId, authorization} = req.body

  const result = await getCheckoutId(authorization, cartId)
  console.log(result)
  res.status(200).json( result )
}
