import type { NextApiRequest, NextApiResponse } from 'next'
import {addToCartApi, createCart} from "../../services/ecomApiService";



export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {cartId, item} = req.body

  let result;
  if (!cartId) {
    result = await createCart(item)
  } else {
    result = await addToCartApi(cartId, item)
  }
  res.status(200).json( result )
}
