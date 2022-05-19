export class CartInfo {
  cartId: string;
  checkoutUrl: string;

  constructor(cartId: string, checkoutUrl: string) {
    this.cartId = cartId
    this.checkoutUrl = checkoutUrl
  }
}