import type { NextApiRequest, NextApiResponse } from 'next'
import { getEcomPrdouct } from '../../services/ecomApiService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization, id } = req.body

  const product = await getEcomPrdouct(authorization, id)
  res.status(200).json(product)
}
