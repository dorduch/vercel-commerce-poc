import type { NextApiRequest, NextApiResponse } from 'next'
import { getEcomProducts } from '../../services/ecomApiService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization, query } = req.body

  const products = await getEcomProducts(authorization, query)
  res.status(200).json(products)
}
