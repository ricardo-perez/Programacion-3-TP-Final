const gamesList = [
  {
    id: 1,
    name: 'Clair Obscur: Expedition 33',
    year: 2025,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series S/X'],
    genres: ['RPG'],
    rating: 4.48,
    price: 49.99,
    img: 'https://i.ibb.co/YCQJ8Lk/4667f17fdee9ebbcea2049e54f8e2b96.jpg',
  },
  {
    id: 2,
    name: 'Death Stranding 2: On The Beach',
    year: 2025,
    platforms: ['PC', 'PlayStation 5'],
    genres: ['Action', 'Adventure'],
    rating: 4.35,
    price: 69.99,
    img: 'https://i.ibb.co/LDyGrxyk/b85bc300d42588af66fb516b7563f74f.jpg',
  },
  {
    id: 3,
    name: 'Hades II',
    year: 2025,
    platforms: ['Xbox Series S/X', 'PC', 'Nintendo Switch'],
    genres: ['Action', 'Adventure', 'RPG', 'Indie'],
    rating: 4.35,
    price: 29.99,
    img: 'https://i.ibb.co/23f6T3Vw/8fd2e8317849fd265ad8781c324d4ec2.jpg',
  },
  {
    id: 4,
    name: 'Replaced',
    year: 2026,
    platforms: ['PC', 'Xbox Series S/X'],
    genres: ['Action', 'Platformer'],
    rating: 3.74,
    price: 49.99,
    img: 'https://i.ibb.co/7tSbwyH9/041e04184322bc859d617b790d8bfab9.jpg',
  },
  {
    id: 5,
    name: 'Resident Evil 9: Requiem',
    year: 2026,
    platforms: ['PlayStation 5', 'Xbox Series S/X', 'PC'],
    genres: ['Action', 'Horror'],
    rating: 4.5,
    price: 53.0,
    img: 'https://i.ibb.co/ycSwHrNd/ed613937e113a4d43fa0db771e527a2f.jpg',
  },
  {
    id: 6,
    name: 'Ghost of Yotei',
    year: 2025,
    platforms: ['PlayStation 5'],
    genres: ['Action', 'RPG'],
    rating: 4.21,
    price: 69.99,
    img: 'https://i.ibb.co/nN3LLKHP/30b195c2321d763f807366967ffad793.jpg',
  },
  {
    id: 7,
    name: 'Hollow Knight: Silksong',
    year: 2025,
    platforms: [
      'Xbox Series S/X',
      'Xbox One',
      'PlayStation 5',
      'PlayStation 4',
      'PC',
      'Linux',
      'macOS',
      'Nintendo Switch',
    ],
    genres: ['Action', 'Adventure', 'Indie', 'Platformer'],
    rating: 4.38,
    price: 29.99,
    img: 'https://i.ibb.co/0y77xtpB/27cd8b7dead05a870f8a514a9a1915ad.jpg',
  },
  {
    id: 8,
    name: "Assassin's Creed Shadows",
    year: 2025,
    platforms: ['PC', 'macOS', 'PlayStation 5', 'Xbox Series S/X'],
    genres: ['Action', 'Adventure'],
    rating: 3.21,
    price: 69.99,
    img: 'https://i.ibb.co/mF6zpdGh/526881e0f5f8c1550e51df3801f96ea3.jpg',
  },
  {
    id: 9,
    name: '007 First Light',
    year: 2026,
    platforms: ['Xbox Series S/X', 'Nintendo Switch', 'PC', 'PlayStation 5'],
    genres: ['Action', 'Adventure'],
    rating: 4.48,
    price: 39.99,
    img: 'https://i.ibb.co/gbSX3rG0/86f2dc1b9671f25a13ff92e069b51786.jpg',
  },
];
let cart = [];

const offcanvas = document.getElementById('offcanvas-cart');
const cartItemTemplate = document.getElementById('cart-item-template');
const cartList = offcanvas.querySelector('ul');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

const updateCartUI = () => {
  cartList.innerHTML = '';
  cart.forEach((gameInCart) => {
    const list = cartItemTemplate.content.cloneNode(true);
    list.querySelector('h6').textContent = gameInCart.name;
    list.querySelector('small').textContent = `$${gameInCart.price.toFixed(2)}`;
    list.querySelector('.js-cart-item-qty').textContent = gameInCart.quantity;
    list.querySelector('.js-cart-item-subtotal').textContent =
      `$${(gameInCart.price * gameInCart.quantity).toFixed(2)}`;
    list.querySelector('button').onclick = () => {
      removeFromCart(gameInCart.id);
    };
    cartList.appendChild(list);
  });
  const total = cart.reduce((acc, game) => acc + game.quantity * game.price, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartCount.textContent = cart.reduce((acc, game) => acc + game.quantity, 0);
};
const addToCart = (gameId) => {
  const existingGame = cart.find((game) => game.id === gameId);
  if (existingGame) {
    existingGame.quantity++;
  } else {
    const gameData = gamesList.find((game) => game.id === gameId);
    cart.push({
      id: gameId,
      name: gameData.name,
      quantity: 1,
      price: gameData.price,
    });
  }
  updateCartUI();
};
const removeFromCart = (gameId) => {
  cart = cart.filter((game) => game.id !== gameId);
  updateCartUI();
};
const clearCart = () => {
  cart = [];
  updateCartUI();
};

const createCard = (template, game) => {
  const card = template.content.cloneNode(true);
  const img = card.querySelector('img');
  img.src = game.img;
  img.alt = game.name;
  card.querySelector('time').textContent = game.year;
  card.querySelector('h2').textContent = game.name;

  const platformContainer = card.querySelector('.js-platform-container');
  const platformModel = platformContainer.querySelector('span');
  game.platforms.forEach((platform, index) => {
    const platformSpan = platformModel.cloneNode(true);
    platformSpan.textContent = platform;
    platformContainer.appendChild(platformSpan);
  });
  platformModel.remove();

  card.querySelector('.js-genres').textContent = game.genres.join(', ');
  card.querySelector('.js-rating').textContent = game.rating.toFixed(2);
  card.querySelector('.js-price').textContent = game.price.toFixed(2);

  card.querySelector('button').onclick = () => addToCart(game.id);

  return card;
};
const createProducts = (gamesList) => {
  const template = document.getElementById('product-template');
  const container = document.getElementById('products');
  gamesList.forEach((game) => {
    const card = createCard(template, game);
    container.appendChild(card);
  });
};
const contact = () => {
  const contactForm = document.getElementById('contactForm');
  const contactModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById('contactModal'),
  );
  contactForm.addEventListener('submit', () => {
    alert('Mensaje enviado correctamente.');
    setTimeout(() => {
      contactForm.reset();
      contactModal.hide();
    }, 125);
  });
};
const init = () => {
  document.getElementById('cart-btn-buy').onclick = () => {
    if (cart.length > 0) {
      alert('Compra realizada con éxito');
      clearCart();
    }
  };
  document.getElementById('cart-btn-clear').onclick = () => {
    if (cart.length > 0) {
      clearCart();
    }
  };
  createProducts(gamesList);
  updateCartUI();
  contact();
};
init();
