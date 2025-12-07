document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const cartIcon = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');
    const cartCountElement = document.getElementById('cart-count');

    // --- State ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- Initialization ---
    init();

    function init() {
        updateCartUI();
        setupGlobalListeners();

        // Page Specific Logic
        const path = window.location.pathname;

        if (path.includes('catalog.html')) {
            renderCatalog();
        } else if (path.includes('product.html')) {
            renderProductDetails();
        } else if (path.includes('index.html') || path.endsWith('/') || path.endsWith('aromaloom/')) {
            renderTestimonialCarousel();
        } else if (path.includes('collections.html')) {
            renderCollections();
        } else if (path.includes('contact.html')) {
            setupContactForm();
        }
    }

    // --- Cart Logic ---
    function updateCartUI() {
        // Update Count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) cartCountElement.textContent = totalItems;

        // Update Total Price
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotalElement) cartTotalElement.textContent = `S/ ${totalPrice.toFixed(2)}`;

        // Render Items
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío.</p>';
            } else {
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <img src="${item.img}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">S/ ${item.price.toFixed(2)}</p>
                            <div class="cart-item-controls">
                                <button class="qty-btn minus" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });
            }
        }

        // Save to LocalStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(id, productData = null) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else if (productData) {
            cart.push({
                id: id,
                name: productData.name,
                price: parseFloat(productData.price),
                img: productData.image || productData.img, // Handle both keys if inconsistent
                quantity: 1
            });
        }

        updateCartUI();
        openCart(); // Optional: open cart when adding
    }

    function removeFromCart(id) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity -= 1;
            if (existingItem.quantity <= 0) {
                cart = cart.filter(item => item.id !== id);
            }
        }

        updateCartUI();
    }

    function openCart() {
        if (cartModal) {
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCart() {
        if (cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function setupGlobalListeners() {
        if (cartIcon) cartIcon.addEventListener('click', openCart);
        if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
        if (cartModal) {
            cartModal.addEventListener('click', (e) => {
                if (e.target === cartModal) closeCart();
            });
        }

        // Event Delegation for Cart Items (since they are dynamic)
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('plus')) {
                    const id = e.target.dataset.id;
                    addToCart(id);
                } else if (e.target.classList.contains('minus')) {
                    const id = e.target.dataset.id;
                    removeFromCart(id);
                }
            });
        }

        // Global Add to Cart Delegation (for static and dynamic buttons)
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const card = e.target.closest('.product-card') || e.target.closest('.product-detail-wrapper');
                if (card) {
                    // Try to get data from attributes first (static), then fallback to lookup (dynamic)
                    let id = card.dataset.id || e.target.dataset.id;
                    let name = card.dataset.name;
                    let price = card.dataset.price;
                    let img = card.dataset.img;

                    // If rendering from JS, we might not have all data attributes, or we might want to look up from 'products' array
                    if ((!name || !price) && typeof products !== 'undefined') {
                        const product = products.find(p => p.id === id);
                        if (product) {
                            name = product.name;
                            price = product.price;
                            img = product.image;
                        }
                    }

                    if (id && name && price) {
                        addToCart(id, { name, price, img });
                    }
                }
            }
        });
    }

    // --- Catalog Logic ---
    function renderCatalog() {
        const grid = document.getElementById('catalog-grid');
        const filterSelect = document.getElementById('category-filter');
        const sortSelect = document.getElementById('sort-filter');

        if (!grid) return;

        function render(items) {
            grid.innerHTML = items.map(product => `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
                        <button class="add-to-cart-btn">Añadir al carrito</button>
                    </div>
                    <div class="product-info">
                        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
                        <p class="price">S/ ${product.price.toFixed(2)}</p>
                    </div>
                </div>
            `).join('');
        }

        // Initial Render
        render(products);

        // Filter Logic
        function filterAndSort() {
            let filtered = products;
            const category = filterSelect ? filterSelect.value : 'all';
            const sort = sortSelect ? sortSelect.value : 'default';

            if (category !== 'all') {
                filtered = filtered.filter(p => p.category === category);
            }

            if (sort === 'price-asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sort === 'price-desc') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sort === 'name-asc') {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            }

            render(filtered);
        }

        if (filterSelect) filterSelect.addEventListener('change', filterAndSort);
        if (sortSelect) sortSelect.addEventListener('change', filterAndSort);
    }

    // --- Product Detail Logic ---
    function renderProductDetails() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const container = document.getElementById('product-detail-container');

        if (!container || !id) return;

        const product = products.find(p => p.id === id);

        if (!product) {
            container.innerHTML = '<p>Producto no encontrado.</p>';
            return;
        }

        // Update Page Title
        document.title = `${product.name} | AromaLoom`;

        container.innerHTML = `
            <div class="product-detail-wrapper" data-id="${product.id}">
                <div class="detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-info">
                    <h1>${product.name}</h1>
                    <p class="detail-price">S/ ${product.price.toFixed(2)}</p>
                    <p class="detail-desc">${product.description}</p>
                    <div class="detail-notes">
                        <strong>Notas:</strong> ${product.notes}
                    </div>
                    <button class="add-to-cart-btn btn-large" data-id="${product.id}">Añadir al carrito</button>
                    
                    <div class="detail-meta">
                        <p>Categoría: ${product.category}</p>
                    </div>
                </div>
            </div>
        `;

        // Render Related (Simple logic: same category)
        const relatedContainer = document.getElementById('related-products');
        if (relatedContainer) {
            const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
            if (related.length > 0) {
                relatedContainer.innerHTML = related.map(p => `
                    <div class="product-card" data-id="${p.id}">
                        <div class="product-image">
                            <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
                            <button class="add-to-cart-btn">Añadir al carrito</button>
                        </div>
                        <div class="product-info">
                            <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
                            <p class="price">S/ ${p.price.toFixed(2)}</p>
                        </div>
                    </div>
                `).join('');
            } else {
                document.getElementById('related-section').style.display = 'none';
            }
        }
    }

    // --- Collections Logic ---
    function renderCollections() {
        const container = document.getElementById('collections-container');
        if (!container) return;

        const categories = [...new Set(products.map(p => p.category))];

        container.innerHTML = categories.map(cat => {
            const catProducts = products.filter(p => p.category === cat);
            return `
                <div class="collection-group">
                    <h2>${cat}</h2>
                    <div class="products-grid">
                        ${catProducts.map(p => `
                            <div class="product-card" data-id="${p.id}">
                                <div class="product-image">
                                    <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
                                    <button class="add-to-cart-btn">Añadir al carrito</button>
                                </div>
                                <div class="product-info">
                                    <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
                                    <p class="price">S/ ${p.price.toFixed(2)}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- Testimonial Carousel (Home) ---
    function renderTestimonialCarousel() {
        const container = document.querySelector('.testimonials-grid');

        if (container && typeof testimonials !== 'undefined') {
            container.innerHTML = '';
            container.classList.add('carousel-container');

            // Create slides
            testimonials.forEach((t, index) => {
                const card = document.createElement('div');
                card.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;

                // Generate stars
                const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);

                card.innerHTML = `
                    <div class="star-rating">${stars}</div>
                    <p>“${t.text}”</p>
                    <h4>– ${t.author}</h4>
                `;
                container.appendChild(card);
            });

            // Auto rotation
            let currentIndex = 0;
            const slides = document.querySelectorAll('.testimonial-slide');

            setInterval(() => {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }, 5000); // 5 seconds
        }
    }

    // --- Contact Form Logic ---
    function setupContactForm() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const message = document.getElementById('message').value;

                // Construct WhatsApp URL
                const phoneNumber = "51912345678"; // Replace with actual number if provided, otherwise generic
                const text = `Hola, soy ${name}. Mi teléfono es ${phone}. Mensaje: ${message}`;
                const encodedText = encodeURIComponent(text);
                const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;

                window.open(url, '_blank');
            });
        }
    }
});
