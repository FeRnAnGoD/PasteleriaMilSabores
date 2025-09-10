const CART_KEY = 'ps_cart_v1';
function getCart(){ const raw = localStorage.getItem(CART_KEY); return raw ? JSON.parse(raw) : []; }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function addToCart(productCode, qty = 1, custom = {}) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.code === productCode && JSON.stringify(i.custom) === JSON.stringify(custom));
  if(idx >= 0){ cart[idx].qty += qty; } else {
    const prod = PRODUCTS.find(p => p.code === productCode);
    if(!prod) return;
    cart.push({ code: prod.code, name: prod.name, price: prod.price, qty, custom });
  }
  saveCart(cart); updateCartCount();
}
function removeFromCart(productCode){ const cart = getCart().filter(i => i.code !== productCode); saveCart(cart); updateCartCount(); }
function updateCartCount(){ const count = getCart().reduce((s,i) => s + i.qty, 0); const el = document.querySelector('#cart-count'); if(el) el.textContent = count; }
function cartTotals(){ const cart = getCart(); const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0); return { subtotal, total: subtotal }; }