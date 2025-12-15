// header.js - cart utilities + badge updater (include before other page scripts)
(function(){
  const KEY = 'cart';

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch(e) {
      console.warn('Failed to parse cart', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch(e) {
      console.error('Failed to save cart', e);
    }
    updateCartCountInternal();
  }

  // getCart for debug
  function getCart() {
    return loadCart();
  }

  // Add item object: { id, name, price, brand, image, qty }
  function addToCart(item) {
    if (!item || item.id == null) {
      console.warn('addToCart: invalid item', item);
      return;
    }

    const cart = loadCart();
    const idx = cart.findIndex(i => Number(i.id) === Number(item.id));
    if (idx >= 0) {
      cart[idx].qty = (Number(cart[idx].qty) || 0) + (Number(item.qty) || 1);
    } else {
      cart.push({
        id: Number(item.id),
        name: item.name || '',
        brand: item.brand || '',
        price: Number(item.price) || 0,
        image: item.image || '',
        qty: Number(item.qty) || 1
      });
    }
    saveCart(cart);
  }

  function changeQty(id, delta) {
    const cart = loadCart();
    const idx = cart.findIndex(i => Number(i.id) === Number(id));
    if (idx === -1) return;
    const newQty = Math.max(1, (Number(cart[idx].qty) || 1) + Number(delta));
    cart[idx].qty = newQty;
    saveCart(cart);
  }

  function removeItem(id) {
    let cart = loadCart();
    cart = cart.filter(i => Number(i.id) !== Number(id));
    saveCart(cart);
  }

  // update badge
  function updateCartCountInternal() {
    const el = document.getElementById('cartCount');
    if (!el) return;
    const cart = loadCart();
    const total = cart.reduce((s, it) => s + (Number(it.qty) || 0), 0);
    el.textContent = total;
    el.style.display = total ? 'inline-block' : 'none';
  }

  // expose globals for pages & console
  window.getCart = getCart;
  window.addToCart = addToCart;
  window.changeQty = changeQty;
  window.removeItem = removeItem;
  window.saveCart = saveCart;
  window.updateCartCount = updateCartCountInternal;

  // initialise badge on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', updateCartCountInternal);
})();
