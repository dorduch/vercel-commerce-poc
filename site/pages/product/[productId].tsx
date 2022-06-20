import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import { useAuthorization } from '../../services/ecomApiService'
import { useEffect, useState } from 'react'
import { Product } from '@commerce/types/product'

export default function ProductId() {
  const router = useRouter()
  const authorization = useAuthorization()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    const getProduct = async () => {
      return await (
        await fetch('/my-site-3/_api/hack-reverse-proxy/api/get-product', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            id: window.location.pathname.split('/').at(-1),
            authorization,
          }),
        })
      ).json()
    }
    getProduct().then((product) => {
      setProduct(product)
    })
  }, [authorization])

  useEffect(() => {
    const getRelatedProducts = async () => {
      return await (
        await fetch('/my-site-3/_api/hack-reverse-proxy/api/get-products', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            query: { paging: { limit: 4 } },
            authorization,
          }),
        })
      ).json()
    }
    getRelatedProducts().then((products) => {
      setRelatedProducts(products)
    })
  }, [authorization])

  return !product ? (
    <h1>Loading...</h1>
  ) : (
    <ProductView product={product} relatedProducts={relatedProducts} />
  )
}

ProductId.Layout = Layout
