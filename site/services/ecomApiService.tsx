import { ProductDTO } from '../types/ProductDto'
import { Product } from '@commerce/types/product'
import { createContext, useContext, useState } from 'react'
import { CartDto } from '../types/CartDto'
import { useLocalStorage } from '@lib/hooks/useLocalStorage'

function productDtoToSiteProduct(dto: ProductDTO): Product {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    sku: dto.sku,
    slug: dto.slug,
    images: dto.media.items.map((item) => ({
      url: item.image.url,
      alt: item.title,
    })),
    variants: [],
    price: {
      value: dto.priceData.discountedPrice,
      retailPrice: dto.priceData.price,
      currencyCode: dto.priceData.currency,
      salePrice: dto.priceData.discountedPrice,
    },
    options: [],
  }
}

interface queryConfig {
  paging?: {
    limit: number
  }
}

export const authorization =
  '95ldX3-zPvJ4W3gcp-vR_dpYVbEHpyqoRZ3va3NKvXM.eyJpbnN0YW5jZUlkIjoiNmI4YjIzNWMtZWJkNS00YWM1LWExZTAtOTI5NmQ2OWY3OTVhIiwiYXBwRGVmSWQiOiIxMzgwYjcwMy1jZTgxLWZmMDUtZjExNS0zOTU3MWQ5NGRmY2QiLCJtZXRhU2l0ZUlkIjoiZGY1YThmNmMtZTcxMC00ZmI5LThlY2EtMjRkZDI3N2RlNmJmIiwic2lnbkRhdGUiOiIyMDIyLTA2LTIwVDAxOjEwOjA3Ljg4OFoiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiJjZjQ1YzFhMy01MDE3LTRlMTYtYWY3YS1iYTU5N2UwMTBjOTQiLCJhaWQiOiJjMDVkMGRmMy0wOWVjLTQ1YzUtYTAxNS1mYmQ1NzliMjliY2YiLCJiaVRva2VuIjoiYjRkMWFjMzAtMGNjNS0wNTdjLTJmMmEtYjY0YmYxZTI5ZmU1Iiwic2l0ZU93bmVySWQiOiI4Zjc0ZDViMy01YWRlLTQxM2MtOWJlMy0xMTVkYmQ4N2I3ODcifQ'
// @ts-ignore
// export const getAuthorization = async () => authorization
export const getAuthorization =  async  () =>(await __WIX__.dynamicModel).apps['1380b703-ce81-ff05-f115-39571d94dfcd'].instance

export const useAuthorization = () => {
  const [storedValue, setValue] = useLocalStorage('ecom-auth', null)
  getAuthorization()
    .then((auth) => {
      setValue(auth)
    })
    .catch((e) => console.log(e))

  return storedValue
}
export async function getEcomProducts(
  authorization: string,
  query: queryConfig = {}
) {
  let url = 'https://www.wixapis.com/stores/v1/products/query'

  let options = {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6; ',
    },
    body: `{"query":${JSON.stringify(
      query
    )},"includeVariants":false,"includeHiddenProducts":false}`,
  }

  const productsDto: ProductDTO[] = (await (await fetch(url, options)).json())
    .products
  return productsDto.map(productDtoToSiteProduct)
}

export async function getEcomPrdouct(authorization: string, id: string) {
  let url = `https://www.wixapis.com/stores/v1/products/${id}`

  let options = {
    method: 'GET',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6; ',
    },
  }

  const productDto: ProductDTO = (await (await fetch(url, options)).json())
    .product
  return productDtoToSiteProduct(productDto)
}

export async function createCart(
  authorization: string,
  item: Product
): Promise<object> {
  const options = {
    method: 'POST',
    headers: {
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6',
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartInfo: {},
      merchantDiscounts: [],
      lineItems: [
        {
          id: item.id,
          quantity: 1,
          catalogReference: {
            catalogItemId: item.id,
            appId: '1380b703-ce81-ff05-f115-39571d94dfcd',
          },
        },
      ],
      customLineItems: [],
    }),
  }
  const first = await fetch('https://www.wixapis.com/ecom/v1/carts', options)
  const json = await first.json()
  console.log({ json })

  return json.cart
}

export async function addToCartApi(
  authorization: string,
  cartId: string,
  item: Product
) {
  const options = {
    method: 'POST',
    headers: {
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6',
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lineItems: [
        {
          id: item.id,
          quantity: 1,
          catalogReference: {
            catalogItemId: item.id,
            appId: '1380b703-ce81-ff05-f115-39571d94dfcd',
          },
        },
      ],
    }),
  }

  return (
    await (
      await fetch(
        `https://www.wixapis.com/ecom/v1/carts/${cartId}/add-to-cart`,
        options
      )
    ).json()
  ).cart
}

export async function getCheckoutId(authorization: string, cartId: string) {
  const options = {
    method: 'POST',
    headers: {
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6',
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channelType: 'WEB',
    }),
  }
  console.log(cartId)
  const result = await (
    await fetch(
      `https://www.wixapis.com/ecom/v1/carts/${cartId}/create-checkout`,
      options
    )
  ).json()
  console.log(result)
  return result
}
interface Cart {
  items: Product[]
  cart: CartDto
}
const _useCart = () => {
  const [storedValue, setValue] = useLocalStorage('ecom-cart', null)
  const authorization = useAuthorization()
  const loadedCart = storedValue ? JSON.parse(storedValue) : null
  const [currentCart, setCurrentCart] = useState<Cart | null>(loadedCart)
  const addToCart = async (item: Product) => {
    if (!currentCart) {
      const cart = await (
        await fetch('/my-site-3/_api/hack-reverse-proxy/api/add-to-cart', {
          method: 'POST',
          body: JSON.stringify({ item: item, authorization }),
          headers: { 'Content-Type': 'application/json' },
        })
      ).json()
      // const cartId = await createCart(item)
      console.log(cart)
      setCurrentCart({ cart, items: [item] })
      setValue(JSON.stringify({ cart, items: [item] }))
    } else {
      const cart = await (
        await fetch('/my-site-3/_api/hack-reverse-proxy/api/add-to-cart', {
          method: 'POST',
          body: JSON.stringify({
            item,
            cartId: currentCart.cart.id,
            authorization,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
      ).json()
      setCurrentCart({ cart, items: [...currentCart.items, item] })
      setValue(JSON.stringify({ cart, items: [...currentCart.items, item] }))

      // await addToCartApi(currentCart.id, item)
    }
  }

  const clearCart = () => {
    setCurrentCart(null)
    setValue(null)
  }

  return { currentCart, addToCart, clearCart }
}

// @ts-ignore
const cartContext = createContext<{
  currentCart: Cart | null
  addToCart(item: Product): Promise<void>
  clearCart(): void
}>(null)
// @ts-ignore
export const CartProvider = ({ children }) => {
  const value = _useCart()
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>
}

export const useCart = () => useContext(cartContext)
