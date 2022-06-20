import type { NextApiRequest, NextApiResponse } from 'next'
import {addToCartApi, createCart} from "../../services/ecomApiService";



export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {cartId, item, authorization} = req.body

  let result;
  if (!cartId) {
    result = await createCart(authorization, item)
  } else {
    result = await addToCartApi(authorization, cartId, item)
  }
  res.status(200).json( result )
}
