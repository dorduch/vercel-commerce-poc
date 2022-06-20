import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import {useCart} from "../../../services/ecomApiService";
import {useRouter} from "next/router";

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const {currentCart} = useCart()
  // const { data, isLoading, isEmpty } = useCart()

  const { price: subTotal } = usePrice(
    currentCart?.cart && {
      amount: Number(currentCart?.cart.subtotal.amount),
      currencyCode: currentCart.cart.currency,
    }
  )
  const { price: total } = usePrice(
    currentCart?.cart && {
      amount: Number(currentCart?.cart.subtotal.amount),
      currencyCode: currentCart.cart.currency,
    }
  )
  const handleClose = () => closeSidebar()
  const router = useRouter();

  const goToCheckout = async () => {
    handleClose();
    const checkoutId = (await (await fetch('/my-site-3/_api/hack-reverse-proxy/api/get-checkout', {headers: { 'Content-Type': 'application/json'}, method: "POST", body: JSON.stringify({cartId: currentCart?.cart.id})}))).json()
    router.push(`/my-site-3/checkout?appSectionParams=${encodeURIComponent(JSON.stringify({"a11y": true,
      "cartId": currentCart?.cart.id,
      // "storeUrl": "https://www.hilba4free.com",
      "isPickupFlow": false,
      "cashierPaymentId": "",
      "origin": "productPage",
      "originType": "buyNow",
      "checkoutId": checkoutId,
      // "checkoutId": "ff9dee5d-484b-40e7-a76e-740fabb7f893"
    }))}`)
  }

  console.log({currentCart});

  const error = null
  const success = null
  const isEmpty = !currentCart

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success,
      })}
      handleClose={handleClose}
    >
      {isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/my-site-3/_api/hack-reverse-proxy/cart">
              <a>
                <Text variant="sectionHeading" onClick={handleClose}>
                  My Cart
                </Text>
              </a>
            </Link>
            <ul className={s.lineItemsList}>
              {currentCart?.cart.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={currentCart?.cart.currency}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div>

                <Button Component="a" width="100%" onClick={goToCheckout}>
                  Proceed to Checkout ({total})
                </Button>
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
