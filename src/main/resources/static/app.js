// app.js - product listing with Add to cart
const API_BASE = '/api';
const LIST_URL = API_BASE + '/pro';
const IMAGE_URL = (id) => `${API_BASE}/pro/${id}/image`;
const DELETE_URL = (id) => `${API_BASE}/pro/${id}`;

const grid = document.getElementById('products');

// Auth Fetch Wrapper
async function authFetch(url, options = {}) {
  const token = localStorage.getItem('jwt_token');
  const headers = options.headers || {};

  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('jwt_token');
    window.location.href = 'login.html';
    throw new Error('Unauthorized');
  }

  return response;
}

async function loadProducts() {
  try {
    const res = await authFetch(LIST_URL);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    renderGrid(data || []);
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<div style="color:#333">Unable to load products. Start backend and check console.</div>';
  }
}

function renderGrid(items) {
  grid.innerHTML = '';
  if (!items.length) {
    grid.innerHTML = '<div style="color:var(--muted)">No products found. Click Add Product to create one.</div>';
    return;
  }
  items.forEach(p => {
    const card = document.createElement('article'); card.className = 'card';
    const thumb = document.createElement('div'); thumb.className = 'thumb';
    const img = document.createElement('img'); img.alt = p.name || 'product';
    img.src = IMAGE_URL(p.id);
    thumb.appendChild(img);

    const title = document.createElement('div'); title.className = 'title'; title.textContent = p.name || '';
    const brand = document.createElement('div'); brand.className = 'brand-muted'; brand.textContent = `~ ${p.brand || ''}`;
    const price = document.createElement('div'); price.className = 'price'; price.textContent = `₹ ${p.price ?? 0}`;

    const actions = document.createElement('div'); actions.className = 'actions';

    const viewBtn = document.createElement('button'); viewBtn.className = 'btn small'; viewBtn.textContent = 'View';
    viewBtn.type = 'button';
    viewBtn.addEventListener('click', () => { location.href = `product.html?id=${p.id}`; });

    const addBtn = document.createElement('button'); addBtn.className = 'btn small'; addBtn.textContent = 'Add';
    addBtn.type = 'button';
    addBtn.addEventListener('click', () => {
      addToCart({
        id: p.id,
        name: p.name,
        brand: p.brand,
        price: p.price || 0,
        image: IMAGE_URL(p.id),
        qty: 1
      });
      if (window.updateCartCount) window.updateCartCount();
      // feedback
      const old = addBtn.textContent;
      addBtn.textContent = 'Added';
      setTimeout(() => addBtn.textContent = old, 900);
    });

    const delBtn = document.createElement('button'); delBtn.className = 'btn ghost small'; delBtn.textContent = 'Delete';
    delBtn.type = 'button';
    delBtn.addEventListener('click', () => askDelete(p.id));

    actions.appendChild(viewBtn);
    actions.appendChild(addBtn);
    actions.appendChild(delBtn);

    card.appendChild(thumb);
    card.appendChild(title);
    card.appendChild(brand);
    card.appendChild(price);
    card.appendChild(actions);

    grid.appendChild(card);
  });
}

async function askDelete(id) {
  if (!confirm('Delete this product?')) return;
  try {
    const res = await authFetch(DELETE_URL(id), { method: 'DELETE' });
    console.log('DELETE', DELETE_URL(id), 'status', res.status);
    const text = await res.text();
    console.log('DELETE body:', text);
    if (!res.ok) {
      alert(`Delete failed: ${res.status} ${text || ''}`);
      throw new Error('Delete failed: ' + res.status);
    }
    await loadProducts();
    alert('Deleted');
  } catch (err) {
    console.error(err);
    alert('Delete failed. Check backend console and network tab.');
  }
}

// Only run if we are on the dashboard
if (grid) {
  document.addEventListener('DOMContentLoaded', loadProducts);
}
