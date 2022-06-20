import {ProductDTO} from "../types/ProductDto";
import {Product} from "@commerce/types/product";
import {createContext, useContext, useState} from "react";
import {CartDto} from "../types/CartDto";

function productDtoToSiteProduct(dto: ProductDTO) {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    sku: dto.sku,
    slug: dto.slug,
    images: dto.media.items.map(item => ({url: item.image.url, alt: item.title})),
    variants: [],
    price: {
      value: dto.price.price
    },
    options: []

  };
}

interface queryConfig {
  paging?: {
    limit: number
  }
}

const authorization = '95ldX3-zPvJ4W3gcp-vR_dpYVbEHpyqoRZ3va3NKvXM.eyJpbnN0YW5jZUlkIjoiNmI4YjIzNWMtZWJkNS00YWM1LWExZTAtOTI5NmQ2OWY3OTVhIiwiYXBwRGVmSWQiOiIxMzgwYjcwMy1jZTgxLWZmMDUtZjExNS0zOTU3MWQ5NGRmY2QiLCJtZXRhU2l0ZUlkIjoiZGY1YThmNmMtZTcxMC00ZmI5LThlY2EtMjRkZDI3N2RlNmJmIiwic2lnbkRhdGUiOiIyMDIyLTA2LTIwVDAxOjEwOjA3Ljg4OFoiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiJjZjQ1YzFhMy01MDE3LTRlMTYtYWY3YS1iYTU5N2UwMTBjOTQiLCJhaWQiOiJjMDVkMGRmMy0wOWVjLTQ1YzUtYTAxNS1mYmQ1NzliMjliY2YiLCJiaVRva2VuIjoiYjRkMWFjMzAtMGNjNS0wNTdjLTJmMmEtYjY0YmYxZTI5ZmU1Iiwic2l0ZU93bmVySWQiOiI4Zjc0ZDViMy01YWRlLTQxM2MtOWJlMy0xMTVkYmQ4N2I3ODcifQ';
export async function getEcomProducts(query: queryConfig = {}) {
  let url = 'https://www.wixapis.com/stores/v1/products/query';

  let options = {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6; '
    },
    body: `{"query":${JSON.stringify(query)},"includeVariants":false,"includeHiddenProducts":false}`
  };

  const productsDto: ProductDTO[] = (await (await fetch(url, options)).json()).products
  return productsDto.map(productDtoToSiteProduct)
}

export async function getEcomPrdouct(id: string) {
  let url = `https://www.wixapis.com/stores/v1/products/${id}`;

  let options = {
    method: 'GET',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6; '
    },
  };

  const productDto: ProductDTO = (await (await fetch(url, options)).json()).product
  return productDtoToSiteProduct(productDto)
}

export async function createCart(item: Product): Promise<object> {
  const options = {
    method: 'POST',
    headers: {
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6',
      Authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"cartInfo":{},"merchantDiscounts":[],"lineItems":[{id: item.id, quantity: 1, catalogReference: { catalogItemId: item.id, appId: '1380b703-ce81-ff05-f115-39571d94dfcd' }}],"customLineItems":[]})
  };
  const first = await fetch('https://www.wixapis.com/ecom/v1/carts', options)
  const json = await first.json();
  console.log({json});


  return  json.cart
}

export async function addToCartApi(cartId: string, item: Product) {
  const options = {
    method: 'POST',
    headers: {
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6',
      Authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"lineItems":[{id: item.id, quantity: 1, catalogReference: { catalogItemId: item.id, appId: '1380b703-ce81-ff05-f115-39571d94dfcd' }}]})
  };

  return (await(await fetch(`https://www.wixapis.com/ecom/v1/carts/${cartId}/add-to-cart`, options)).json()).cart
}

export async function getCheckoutId(cartId: string) {
  const options = {
    method: 'POST',
    headers: {
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6',
      Authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  };

  return (await(await fetch(`https://www.wixapis.com/ecom/v1/carts/${cartId}/create-checkout`, options)).json()).checkoutId
}
interface Cart {
  items: Product[]
  cart: CartDto;
}
const _useCart = () => {
  const [currentCart, setCurrentCart] = useState<Cart | null>(null);
  const addToCart =  async (item: Product) => {
    if (!currentCart) {
      const cart = await (await fetch('/my-site-3/_api/hack-reverse-proxy/api/add-to-cart', {method: 'POST', body: `{"item": ${JSON.stringify(item)}}`, headers: { 'Content-Type': 'application/json'}})).json()
      // const cartId = await createCart(item)
      console.log(cart);
      setCurrentCart({cart, items: [item]})
    } else {
      const cart = await (await fetch('/my-site-3/_api/hack-reverse-proxy/api/add-to-cart', {method: 'POST', body: JSON.stringify({item, cartId: currentCart.cart.id}), headers: { 'Content-Type': 'application/json'}})).json()
      setCurrentCart({cart, items: [...currentCart.items, item]})

      // await addToCartApi(currentCart.id, item)
    }
  }

  return {currentCart, addToCart}
}

// @ts-ignore
const cartContext = createContext<{currentCart: Cart | null, addToCart(item: Product): Promise<void>}>(null);
// @ts-ignore
export const CartProvider =({children}) => {
  const value = _useCart();
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>
}

export const useCart = () => useContext(cartContext);
