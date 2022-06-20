export interface WeightRange {
  minValue: number
  maxValue: number
}

export interface Stock {
  trackInventory: boolean
  inStock: boolean
  inventoryStatus: string
}

export interface Formatted {
  price: string
  discountedPrice: string
}

export interface Price {
  currency: string
  price: number
  discountedPrice: number
  formatted: Formatted
}

export interface Formatted2 {
  price: string
  discountedPrice: string
}

export interface PriceData {
  currency: string
  price: number
  discountedPrice: number
  formatted: Formatted2
}

export interface Formatted3 {
  price: string
  discountedPrice: string
}

export interface ConvertedPriceData {
  currency: string
  price: number
  discountedPrice: number
  formatted: Formatted3
}

export interface PriceRange {
  minValue: number
  maxValue: number
}

export interface CostRange {
  minValue: number
  maxValue: number
}

export interface AdditionalInfoSection {
  title: string
  description: string
}

export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface Image {
  url: string
  width: number
  height: number
}

export interface MainMedia {
  thumbnail: Thumbnail
  mediaType: string
  title: string
  image: Image
  id: string
}

export interface Thumbnail2 {
  url: string
  width: number
  height: number
}

export interface Image2 {
  url: string
  width: number
  height: number
}

export interface Item {
  thumbnail: Thumbnail2
  mediaType: string
  title: string
  image: Image2
  id: string
}

export interface Media {
  mainMedia: MainMedia
  items: Item[]
}

export interface ProductPageUrl {
  base: string
  path: string
}

export interface Discount {
  type: string
  value: number
}

export interface ProductDTO {
  id: string
  name: string
  slug: string
  visible: boolean
  productType: string
  description: string
  sku: string
  weight: number
  weightRange: WeightRange
  stock: Stock
  price: Price
  priceData: PriceData
  convertedPriceData: ConvertedPriceData
  priceRange: PriceRange
  costRange: CostRange
  additionalInfoSections: AdditionalInfoSection[]
  ribbons: any[]
  media: Media
  customTextFields: any[]
  manageVariants: boolean
  productOptions: any[]
  productPageUrl: ProductPageUrl
  numericId: string
  inventoryItemId: string
  discount: Discount
  collectionIds: string[]
  variants: any[]
  lastUpdated: Date
  createdDate: Date
  ribbon: string
}
