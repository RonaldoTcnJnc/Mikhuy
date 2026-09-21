const restaurants = [
  { id: 1, name: 'Puka Rumi', category: 'Andina', description: 'Cocina de altura con ingredientes de nuestra tierra.', rating: 4.9, time: 25, badge: 'Favorito local', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pachamanca_de_cerdo.jpg?width=900', items: [{ name: 'Pachamanca', price: 28.9 }] },
  { id: 2, name: 'Mil Centro', category: 'Criolla', description: 'Recetas caseras que abrazan como en casa.', rating: 4.8, time: 30, badge: 'Muy pedido', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lomo-saltado-perudelights.jpg?width=900', items: [{ name: 'Lomo saltado', price: 26.9 }] },
  { id: 3, name: 'Qori Cafe', category: 'Cafe', description: 'Cafe de especialidad y dulces para compartir.', rating: 4.7, time: 15, badge: 'Cerca de ti', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Caf%C3%A9%20peruano%20en%20la%20selva.jpg?width=900', items: [{ name: 'Cafe pasado', price: 10.5 }] },
  { id: 4, name: 'La Cusquenita', category: 'Criolla', description: 'El sabor tradicional de Cusco en cada plato.', rating: 4.6, time: 35, badge: 'Tradicion', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cuy_al_horno_en_La_Chomba%2C_Cusco.jpg?width=900', items: [{ name: 'Cuy al horno', price: 42.0 }] },
  { id: 5, name: 'Verde Valle', category: 'Saludable', description: 'Bowls frescos para comer rico y sentirte bien.', rating: 4.8, time: 20, badge: 'Nuevo', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Puesto%20choclo%20con%20queso.jpg?width=900', items: [{ name: 'Choclo con queso', price: 21.9 }] },
  { id: 6, name: 'Manka Wasi', category: 'Andina', description: 'Cocina peruana con un giro contemporaneo.', rating: 4.7, time: 28, badge: 'Recomendado', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pachamanca_Peru.JPG?width=900', items: [{ name: 'Pachamanca tradicional', price: 34.9 }] }
];

const state = { category: 'Todos', search: '', sort: 'recommended', favoritesOnly: false, favorites: new Set(), cart: [] };
const restaurantGrid = document.querySelector('#restaurantGrid');
const emptyState = document.querySelector('#emptyState');
const resultSummary = document.querySelector('#resultSummary');
const cartDrawer = document.querySelector('#cartDrawer');
const drawerOverlay = document.querySelector('#drawerOverlay');
const cartItems = document.querySelector('#cartItems');
const cartEmpty = document.querySelector('#cartEmpty');
const cartSummary = document.querySelector('#cartSummary');
const cartCount = document.querySelector('#cartCount');
const cartSubtotal = document.querySelector('#cartSubtotal');
const cartTotal = document.querySelector('#cartTotal');
const menuDialog = document.querySelector('#menuDialog');
const menuOptions = document.querySelector('#menuOptions');
const partnerDialog = document.querySelector('#partnerDialog');

function formatPrice(value) {
  return `S/ ${value.toFixed(2)}`;
}

function getVisibleRestaurants() {
  const search = state.search.toLocaleLowerCase();
  const visible = restaurants.filter((restaurant) => {
    const matchesCategory = state.category === 'Todos' || restaurant.category === state.category;
    const matchesSearch = !search || `${restaurant.name} ${restaurant.description} ${restaurant.category} ${restaurant.items.map((item) => item.name).join(' ')}`.toLocaleLowerCase().includes(search);
    const matchesFavorites = !state.favoritesOnly || state.favorites.has(restaurant.id);
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  return visible.sort((first, second) => {
    if (state.sort === 'rating') return second.rating - first.rating;
    if (state.sort === 'time') return first.time - second.time;
    return first.id - second.id;
  });
}

function renderRestaurants() {
  const visible = getVisibleRestaurants();
  restaurantGrid.innerHTML = visible.map((restaurant) => `
    <article class="restaurant-card">
      <div class="restaurant-cover ${restaurant.cover}">
        <img class="cover-image" src="${restaurant.image}" alt="Plato destacado de ${restaurant.name}" loading="lazy">
        <span class="restaurant-badge">${restaurant.badge}</span>
        <button class="favorite-button ${state.favorites.has(restaurant.id) ? 'active' : ''}" type="button" data-favorite="${restaurant.id}" aria-label="Agregar ${restaurant.name} a favoritos">&#9825;</button>
      </div>
      <div class="restaurant-info">
        <div class="restaurant-topline"><div><h3>${restaurant.name}</h3><p>${restaurant.description}</p></div><span class="rating"><span>&#9733;</span> ${restaurant.rating}</span></div>
        <div class="restaurant-meta"><span>&#9201; <strong>${restaurant.time} min</strong></span><span>${restaurant.category}</span><button class="add-menu" type="button" data-menu="${restaurant.id}">Ver menu</button></div>
      </div>
    </article>
  `).join('');

  emptyState.hidden = visible.length > 0;
  const resultLabel = state.favoritesOnly ? (visible.length === 1 ? 'favorito' : 'favoritos') : (visible.length === 1 ? 'lugar' : 'lugares');
  resultSummary.innerHTML = `Mostrando <strong>${visible.length} ${resultLabel}</strong> cerca de ti`;
  document.querySelectorAll('[data-menu]').forEach((button) => button.addEventListener('click', () => openRestaurantMenu(Number(button.dataset.menu))));
  document.querySelectorAll('[data-favorite]').forEach((button) => button.addEventListener('click', () => {
    const restaurantId = Number(button.dataset.favorite);
    const isFavorite = state.favorites.has(restaurantId);
    if (isFavorite) state.favorites.delete(restaurantId);
    else state.favorites.add(restaurantId);
    showToast(isFavorite ? 'Quitado de tus favoritos' : 'Guardado en tus favoritos');
    renderRestaurants();
  }));
}

function openRestaurantMenu(restaurantId) {
  const restaurant = restaurants.find((item) => item.id === restaurantId);
  document.querySelector('#menuDialogTitle').textContent = restaurant.name;
  document.querySelector('#menuDialogDescription').textContent = restaurant.description;
  menuOptions.innerHTML = restaurant.items.map((item) => `
    <div class="menu-option"><div><strong>${item.name}</strong><span>${formatPrice(item.price)}</span></div><button class="menu-add" type="button" data-add-item="${restaurant.id}" data-item-name="${item.name}">Agregar</button></div>
  `).join('');
  menuDialog.showModal();
  menuOptions.querySelectorAll('[data-add-item]').forEach((button) => button.addEventListener('click', () => {
    const selectedRestaurant = restaurants.find((item) => item.id === Number(button.dataset.addItem));
    const selectedItem = selectedRestaurant.items.find((item) => item.name === button.dataset.itemName);
    addToCart(selectedRestaurant, selectedItem);
    menuDialog.close();
    showToast(`${selectedItem.name} agregado al carrito`);
  }));
}

function addToCart(restaurant, item) {
  const existing = state.cart.find((line) => line.restaurantId === restaurant.id && line.name === item.name);
  if (existing) existing.quantity += 1;
  else state.cart.push({ restaurantId: restaurant.id, restaurant: restaurant.name, name: item.name, price: item.price, image: restaurant.image, quantity: 1 });
  renderCart();
}

function updateQuantity(index, change) {
  state.cart[index].quantity += change;
  if (state.cart[index].quantity <= 0) state.cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const count = state.cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  cartCount.textContent = count;
  cartItems.innerHTML = state.cart.map((item, index) => `
    <div class="cart-line">
      <img class="cart-line-image" src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="cart-line-info"><strong>${item.name}</strong><span>${item.restaurant} &middot; ${formatPrice(item.price)}</span></div>
      <div class="quantity-control"><button type="button" data-quantity="${index}" data-change="-1" aria-label="Quitar uno">&minus;</button><span>${item.quantity}</span><button type="button" data-quantity="${index}" data-change="1" aria-label="Agregar uno">+</button></div>
    </div>
  `).join('');
  cartEmpty.hidden = count > 0;
  cartSummary.hidden = count === 0;
  cartSubtotal.textContent = formatPrice(subtotal);
  cartTotal.textContent = formatPrice(subtotal + 4.9);
  document.querySelectorAll('[data-quantity]').forEach((button) => button.addEventListener('click', () => updateQuantity(Number(button.dataset.quantity), Number(button.dataset.change))));
}

function toggleCart(isOpen) {
  cartDrawer.classList.toggle('open', isOpen);
  drawerOverlay.classList.toggle('open', isOpen);
  cartDrawer.setAttribute('aria-hidden', String(!isOpen));
}

let toastTimeout;
function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelectorAll('.category').forEach((button) => button.addEventListener('click', () => {
  state.category = button.dataset.category;
  document.querySelectorAll('.category').forEach((category) => {
    const isActive = category === button;
    category.classList.toggle('active', isActive);
    category.setAttribute('aria-selected', String(isActive));
  });
  renderRestaurants();
}));

document.querySelector('#sortSelect').addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderRestaurants();
});

document.querySelector('#heroSearchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  state.search = document.querySelector('#heroSearch').value.trim();
  document.querySelector('#restaurantes').scrollIntoView({ behavior: 'smooth' });
  renderRestaurants();
});

document.querySelector('#cartButton').addEventListener('click', () => toggleCart(true));
document.querySelector('#closeCart').addEventListener('click', () => toggleCart(false));
drawerOverlay.addEventListener('click', () => toggleCart(false));
document.querySelector('#checkoutButton').addEventListener('click', () => {
  toggleCart(false);
  showToast('Pedido recibido. Pronto confirmaremos tu entrega.');
  state.cart = [];
  renderCart();
});
document.querySelector('#partnerButton').addEventListener('click', () => partnerDialog.showModal());
document.querySelector('#favoritesButton').addEventListener('click', (event) => {
  state.favoritesOnly = !state.favoritesOnly;
  event.currentTarget.classList.toggle('active', state.favoritesOnly);
  event.currentTarget.setAttribute('aria-pressed', String(state.favoritesOnly));
  document.querySelector('#restaurantes').scrollIntoView({ behavior: 'smooth' });
  renderRestaurants();
  showToast(state.favoritesOnly ? 'Mostrando tus favoritos' : 'Mostrando todos los restaurantes');
});
document.querySelector('#closeMenu').addEventListener('click', () => menuDialog.close());
document.querySelector('#closePartner').addEventListener('click', () => partnerDialog.close());
document.querySelector('#partnerForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const business = new FormData(event.currentTarget).get('business');
  partnerDialog.close();
  event.currentTarget.reset();
  showToast(`Solicitud de ${business} enviada`);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') toggleCart(false);
});

renderRestaurants();
renderCart();
