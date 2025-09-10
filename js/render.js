function createProductCard(prod){
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img src="${prod.img}" alt="${prod.name}">
    <h3>${prod.name}</h3>
    <p class="muted">${prod.category}</p>
    <p class="price">$ ${prod.price.toLocaleString('es-CL')}</p>
    <div class="card-actions">
      <a href="producto-detalle.html?code=${prod.code}" class="btn small">Ver detalle</a>
      <button class="btn ghost small" onclick="addToCart('${prod.code}',1)">Añadir</button>
    </div>
  `;
  return div;
}
function renderFeaturedProducts(selector, limit=4){
  const container = document.querySelector(selector);
  if(!container) return;
  container.innerHTML = '';
  const featured = PRODUCTS.slice(0, limit);
  featured.forEach(p => container.appendChild(createProductCard(p)));
}
function renderProductList(selector, list = PRODUCTS){
  const container = document.querySelector(selector);
  if(!container) return;
  container.innerHTML = '';
  list.forEach(p => container.appendChild(createProductCard(p)));
}