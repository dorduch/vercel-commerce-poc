import {ProductDTO} from "../types/ProductDto";

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
export async function getEcomProducts(query: queryConfig = {}) {
  let url = 'https://www.wixapis.com/stores/v1/products/query';

  let options = {
    method: 'POST',
    headers: {
      Authorization: 'tPHy2gbeHAXIUTbiT-XCcZ7hNaLmJLNOckAUmpgVEuI.eyJpbnN0YW5jZUlkIjoiMDUyNjI4YTktNjY0Mi00YmU1LWFiZmItYjdkZjg0MGU1MzAzIiwiYXBwRGVmSWQiOiIxMzgwYjcwMy1jZTgxLWZmMDUtZjExNS0zOTU3MWQ5NGRmY2QiLCJtZXRhU2l0ZUlkIjoiOGM5MTNhZTQtMmM3Ni00NmM4LTgzODUtMzhlM2FjOGUzOGEyIiwic2lnbkRhdGUiOiIyMDIyLTA2LTE2VDExOjI2OjIyLjQ2MFoiLCJ1aWQiOiI5NDUwZjdmZS02Njc4LTRiNjctYTE0MS0yYWQ0MDlmZjNjZjEiLCJwZXJtaXNzaW9ucyI6Ik9XTkVSIiwidmVuZG9yUHJvZHVjdElkIjoic3RvcmVzX3NpbHZlciIsImRlbW9Nb2RlIjpmYWxzZSwib3JpZ2luSW5zdGFuY2VJZCI6ImYwZTE5Zjk2LWM1ZDEtNDNlZS1iOTkzLTAwY2FiZDRiNjU1YiIsImJpVG9rZW4iOiI4OWI3MTI0ZC00YTM0LTBkMmQtMjg3ZS04ZjNjMjg4MDZiYTEiLCJzaXRlT3duZXJJZCI6Ijk0NTBmN2ZlLTY2NzgtNGI2Ny1hMTQxLTJhZDQwOWZmM2NmMSIsInNpdGVNZW1iZXJJZCI6Ijk0NTBmN2ZlLTY2NzgtNGI2Ny1hMTQxLTJhZDQwOWZmM2NmMSIsImV4cGlyYXRpb25EYXRlIjoiMjAyMi0wNi0xNlQxNToyNjoyMi40NjBaIiwibG9naW5BY2NvdW50SWQiOiI5NDUwZjdmZS02Njc4LTRiNjctYTE0MS0yYWQ0MDlmZjNjZjEifQ',
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
      Authorization: 'tPHy2gbeHAXIUTbiT-XCcZ7hNaLmJLNOckAUmpgVEuI.eyJpbnN0YW5jZUlkIjoiMDUyNjI4YTktNjY0Mi00YmU1LWFiZmItYjdkZjg0MGU1MzAzIiwiYXBwRGVmSWQiOiIxMzgwYjcwMy1jZTgxLWZmMDUtZjExNS0zOTU3MWQ5NGRmY2QiLCJtZXRhU2l0ZUlkIjoiOGM5MTNhZTQtMmM3Ni00NmM4LTgzODUtMzhlM2FjOGUzOGEyIiwic2lnbkRhdGUiOiIyMDIyLTA2LTE2VDExOjI2OjIyLjQ2MFoiLCJ1aWQiOiI5NDUwZjdmZS02Njc4LTRiNjctYTE0MS0yYWQ0MDlmZjNjZjEiLCJwZXJtaXNzaW9ucyI6Ik9XTkVSIiwidmVuZG9yUHJvZHVjdElkIjoic3RvcmVzX3NpbHZlciIsImRlbW9Nb2RlIjpmYWxzZSwib3JpZ2luSW5zdGFuY2VJZCI6ImYwZTE5Zjk2LWM1ZDEtNDNlZS1iOTkzLTAwY2FiZDRiNjU1YiIsImJpVG9rZW4iOiI4OWI3MTI0ZC00YTM0LTBkMmQtMjg3ZS04ZjNjMjg4MDZiYTEiLCJzaXRlT3duZXJJZCI6Ijk0NTBmN2ZlLTY2NzgtNGI2Ny1hMTQxLTJhZDQwOWZmM2NmMSIsInNpdGVNZW1iZXJJZCI6Ijk0NTBmN2ZlLTY2NzgtNGI2Ny1hMTQxLTJhZDQwOWZmM2NmMSIsImV4cGlyYXRpb25EYXRlIjoiMjAyMi0wNi0xNlQxNToyNjoyMi40NjBaIiwibG9naW5BY2NvdW50SWQiOiI5NDUwZjdmZS02Njc4LTRiNjctYTE0MS0yYWQ0MDlmZjNjZjEifQ',
      'Content-Type': 'application/json',
      cookie: 'XSRF-TOKEN=1655378971%7CpB56eiAIQOo6; '
    },
  };

  const productDto: ProductDTO = (await (await fetch(url, options)).json()).product
  return productDtoToSiteProduct(productDto)
}
