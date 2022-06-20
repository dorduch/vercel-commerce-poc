import type {
  GetStaticPathsContext,
  GetStaticPropsContext, InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import {authorization, getEcomPrdouct, getEcomProducts} from "../../services/ecomApiService";
import {GetServerSidePropsContext} from "next/types";

export async function getServerSideProps({
  params,
  locale,
  locales,
  preview,
}: GetServerSidePropsContext<{ productId: string }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })

  const allProductsPromise = commerce.getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  const product = await getEcomPrdouct(authorization, params!.productId)
  const relatedProducts = await getEcomProducts(authorization, {paging: {limit: 4}})

  if (!product) {
    throw new Error(`Product with id '${params!.productId}' not found`)
  }

  return {
    props: {
      pages,
      product,
      relatedProducts,
      categories,
    }
  }
}


export default function ProductId({
  product,
  relatedProducts,
}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <ProductView product={product} relatedProducts={relatedProducts} />
  )
}

ProductId.Layout = Layout
