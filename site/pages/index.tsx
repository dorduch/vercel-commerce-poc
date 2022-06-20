import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {getAuthorization, getEcomProducts, useAuthorization} from "../services/ecomApiService";
import {GetServerSidePropsContext} from "next/types";
import {useEffect, useState} from "react";
import {Product} from "@commerce/types/product";
//
// export async function getServerSideProps({
//   preview,
//   locale,
//   locales,
// }: GetServerSidePropsContext) {
//   const config = { locale, locales }
//   const pagesPromise = commerce.getAllPages({ config, preview })
//   const siteInfoPromise = commerce.getSiteInfo({ config, preview })
//   const { pages } = await pagesPromise
//   const { categories, brands } = await siteInfoPromise
// const authorization = await getAuthorization()
//   const {products} = await (await fetch('//my-site-3/_api/hack-reverse-proxy/get-products', {headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({query: {}, authorization})})).json()
//
//   return {
//     props: {
//       products,
//       categories,
//       brands,
//       pages,
//     }
//   }
// }

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
    const authorization = useAuthorization();
  const getProducts = async () =>{
    const products = await (await fetch('/my-site-3/_api/hack-reverse-proxy/api/get-products', {headers: { 'Content-Type': 'application/json'}, method: "POST", body: JSON.stringify({query: {}, authorization})})).json()
    return products
  }
  useEffect(() => {
    if (authorization) {
      getProducts().then(_products => setProducts(_products))
    }
  },[authorization])
  return (
    <>
      <Hero
        headline="!Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      />
      <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>

      <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
