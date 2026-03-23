export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function generateWhatsAppLink(product: { name: string; price: number; weight: string }, phoneNumber: string = "919701121967") {
  const message = `*New Order from Homemade Love* 🍱
  
Hey! I'd like to place an order for:

🛍️ *Product:* ${product.name}
⚖️ *Weight:* ${product.weight}
💰 *Price:* ₹${product.price}

---
*Customer Details:*
👤 Name: 
📍 Address: 
📞 Contact: 

_Please confirm my order and share payment details._`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppLinkMulti(cart: any[], totalPrice: number, phoneNumber: string = "919701121967", appliedCoupon?: string, discount?: number) {
  const itemsList = cart.map(item => `- ${item.name} (${item.weight}) x${item.quantity} = ₹${item.price * item.quantity}`).join('\n');
  
  const couponInfo = appliedCoupon ? `\n🎟️ *Coupon:* ${appliedCoupon}\n📉 *Discount:* -₹${discount}` : "";

  const message = `*New Order from Homemade Love* 🍱
  
Hey! I'd like to place an order for the following items:

${itemsList}${couponInfo}

💰 *Total Amount:* ₹${totalPrice}

---
*Customer Details:*
👤 Name: 
📍 Address: 
📞 Contact: 

_Please confirm my order and share payment details._`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
