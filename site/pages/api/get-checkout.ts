import type { NextApiRequest, NextApiResponse } from 'next'
import {addToCartApi, createCart, getCheckoutId} from "../../services/ecomApiService";



export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {cartId} = req.body

  const result = await getCheckoutId(cartId)
  res.status(200).json( result )
}
