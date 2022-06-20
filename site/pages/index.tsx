import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import {useAuthorization} from "../services/ecomApiService";
import {useEffect, useState} from "react";
import {Product} from "@commerce/types/product";

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
        headline={`This is not a Wix Store.
This is Wix Web Services.`}
        description="You are now visiting the first Wix Store that wasn't built on a Wix editor. The developer who built it could have used any technological stack and still harness the full power of the Wix ecosystem and platform: business solutions, biz manager, hosting, security, CRM, marketing tools, and more.
Deployed over Wix, built anywhere."
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
