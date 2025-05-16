export function addToCart(productId: string): boolean {
  try {
    const cartRaw = localStorage.getItem("_cart");
    const cart = cartRaw ? JSON.parse(cartRaw) : [];

    const existing = cart.find((item: any) => item.productId === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }

    localStorage.setItem("_cart", JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return false;
  }
}
type CartCheckOut = {
  productId: string;
  quantity: number;
};

export function addToCartCheckOut(products: CartCheckOut[]): boolean {
  try {
    // ตั้งเวลาหมดอายุใหม่ (10 นาที)
    const expiresAt = Date.now() + 10 * 60 * 1000;

    // เซ็ต cart ที่รับเข้ามาพร้อมเวลา
    localStorage.setItem(
      "_cart_check_out",
      JSON.stringify({ cart: products, expiresAt })
    );

    return true;
  } catch (error) {
    console.error("❌ Failed to set cart checkout:", error);
    return false;
  }
}

export function removeFromCart(productId: string): boolean {
  try {
    const cartRaw = localStorage.getItem("_cart");
    const cart = cartRaw ? JSON.parse(cartRaw) : [];

    const updatedCart = cart.reduce((acc: any[], item: any) => {
      if (item.productId === productId) {
        if (item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    localStorage.setItem("_cart", JSON.stringify(updatedCart));
    return true;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    return false;
  }
}

export function removeAllFromCart(productId: string): boolean {
  try {
    const cartRaw = localStorage.getItem("_cart");
    const cart = cartRaw ? JSON.parse(cartRaw) : [];

    const updatedCart = cart.filter(
      (item: any) => item.productId !== productId
    );

    localStorage.setItem("_cart", JSON.stringify(updatedCart));
    return true;
  } catch (error) {
    console.error("❌ Failed to remove all from cart:", error);
    return false;
  }
}

export function getProductsQuatityFromLocalStorage(): number {
  try {
    const productsRaw = localStorage.getItem("_cart");
    const data = productsRaw ? JSON.parse(productsRaw) : [];

    let quantity = 0;
    data.forEach((item: any) => {
      quantity += item.quantity;
    });
    return quantity;
  } catch (error) {
    console.error("Failed to get products from local storage:", error);
    return 0;
  }
}
