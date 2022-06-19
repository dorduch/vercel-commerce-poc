
  export interface CatalogReference {
    catalogItemId: string;
    appId: string;
  }

  export interface ProductName {
    original: string;
    translated: string;
  }

  export interface Url {
    relativePath: string;
    url: string;
  }

  export interface Price {
    amount: string;
    convertedAmount: string;
    formattedAmount: string;
    formattedConvertedAmount: string;
  }

  export interface FullPrice {
    amount: string;
    convertedAmount: string;
    formattedAmount: string;
    formattedConvertedAmount: string;
  }

  export interface PriceBeforeDiscounts {
    amount: string;
    convertedAmount: string;
    formattedAmount: string;
    formattedConvertedAmount: string;
  }

  export interface Image {
    id: string;
    url: string;
    height: number;
    width: number;
  }

  export interface Availability {
    status: string;
  }

  export interface PhysicalProperties {
    sku: string;
    shippable: boolean;
  }

  export interface Group {
    name: string;
    entityId: string;
  }

  export interface CouponScope {
    namespace: string;
    group: Group;
  }

  export interface ItemType {
    preset: string;
  }

  export interface LineItem {
    id: string;
    quantity: number;
    catalogReference: CatalogReference;
    productName: ProductName;
    url: Url;
    price: Price;
    fullPrice: FullPrice;
    priceBeforeDiscounts: PriceBeforeDiscounts;
    descriptionLines: any[];
    image: Image;
    availability: Availability;
    physicalProperties: PhysicalProperties;
    couponScopes: CouponScope[];
    itemType: ItemType;
    paymentOption: string;
  }

  export interface BuyerInfo {
    userId: string;
  }

  export interface Subtotal {
    amount: string;
    convertedAmount: string;
    formattedAmount: string;
    formattedConvertedAmount: string;
  }

  export interface CartDto {
    id: string;
    lineItems: LineItem[];
    buyerInfo: BuyerInfo;
    currency: string;
    conversionCurrency: string;
    buyerLanguage: string;
    siteLanguage: string;
    taxIncludedInPrices: boolean;
    weightUnit: string;
    subtotal: Subtotal;
    appliedDiscounts: any[];
    inSync: boolean;
    createdDate: Date;
    updatedDate: Date;
  }



