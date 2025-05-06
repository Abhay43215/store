document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Product quantity selectors
  const quantityDecrease = document.querySelectorAll('.quantity-decrease');
  const quantityIncrease = document.querySelectorAll('.quantity-increase');
  
  quantityDecrease.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.parentNode.querySelector('.quantity-input');
      const value = parseInt(input.value);
      if (value > 1) {
        input.value = value - 1;
        // Trigger change event for cart updates
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
      }
    });
  });
  
  quantityIncrease.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.parentNode.querySelector('.quantity-input');
      const value = parseInt(input.value);
      input.value = value + 1;
      // Trigger change event for cart updates
      const event = new Event('change', { bubbles: true });
      input.dispatchEvent(event);
    });
  });
  
  // Product image gallery
  const productThumbnails = document.querySelectorAll('.product-thumbnail');
  const productFeaturedImage = document.querySelector('#ProductPhotoImg');
  
  if (productThumbnails.length && productFeaturedImage) {
    productThumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        const newSrc = this.querySelector('img').getAttribute('src').replace('150x150', '800x');
        productFeaturedImage.setAttribute('src', newSrc);
        
        // Update active thumbnail
        productThumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
  
  // Product accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isOpen = content.style.display === 'block';
      
      // Close all accordions
      document.querySelectorAll('.accordion-content').forEach(item => {
        item.style.display = 'none';
      });
      
      document.querySelectorAll('.accordion-icon').forEach(icon => {
        icon.textContent = '+';
      });
      
      // Open clicked accordion if it was closed
      if (!isOpen) {
        content.style.display = 'block';
        this.querySelector('.accordion-icon').textContent = '-';
      }
    });
  });
  
  // Collection filter toggle (mobile)
  const filterToggle = document.querySelector('.filter-toggle-btn');
  const collectionSidebar = document.querySelector('.collection-sidebar');
  
  if (filterToggle && collectionSidebar) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    document.body.appendChild(overlay);
    
    filterToggle.addEventListener('click', function() {
      collectionSidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('sidebar-open');
    });
    
    overlay.addEventListener('click', function() {
      collectionSidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('sidebar-open');
    });
  }
  
  // Collection view toggle (grid/list)
  const viewGrid = document.querySelector('.view-grid');
  const viewList = document.querySelector('.view-list');
  const productsGrid = document.querySelector('.products-grid');
  
  if (viewGrid && viewList && productsGrid) {
    viewGrid.addEventListener('click', function() {
      productsGrid.classList.remove('list-view');
      productsGrid.classList.add('grid-view');
      viewGrid.classList.add('active');
      viewList.classList.remove('active');
      localStorage.setItem('productView', 'grid');
    });
    
    viewList.addEventListener('click', function() {
      productsGrid.classList.remove('grid-view');
      productsGrid.classList.add('list-view');
      viewList.classList.add('active');
      viewGrid.classList.remove('active');
      localStorage.setItem('productView', 'list');
    });
    
    // Check saved preference
    const savedView = localStorage.getItem('productView');
    if (savedView === 'list') {
      productsGrid.classList.remove('grid-view');
      productsGrid.classList.add('list-view');
      viewList.classList.add('active');
      viewGrid.classList.remove('active');
    }
  }
  
  // Cart page quantity updates
  const cartQuantityInputs = document.querySelectorAll('.cart-item .quantity-input');
  
  cartQuantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      const updateCartBtn = document.querySelector('.update-cart-btn');
      if (updateCartBtn) {
        updateCartBtn.classList.add('pulse');
      }
    });
  });
  
  // Product variant selection
  const variantSelectors = document.querySelectorAll('.option-selector');
  
  if (variantSelectors.length) {
    variantSelectors.forEach(selector => {
      selector.addEventListener('change', function() {
        // This would typically update the selected variant ID
        // For a complete implementation, you would need to add variant JSON data
        console.log('Variant changed');
      });
    });
  }
  
  // Add to cart animation
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // For demo purposes, prevent default form submission
      // e.preventDefault();
      
      // Add animation class
      button.classList.add('adding');
      
      // Remove class after animation completes
      setTimeout(() => {
        button.classList.remove('adding');
      }, 1500);
    });
  });
  
  // Sticky header
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.classList.add('sticky');
      
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('hide');
      } else {
        // Scrolling up
        header.classList.remove('hide');
      }
    } else {
      header.classList.remove('sticky');
      header.classList.remove('hide');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Initialize 3D animations
  if (typeof initHero3DAnimation === 'function') {
    initHero3DAnimation();
  }
  
  if (typeof initCategoryModels === 'function') {
    initCategoryModels();
  }
});

// Add CSS animations
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    
    .pulse {
      animation: pulse 1s infinite;
    }
    
    @keyframes adding {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
    
    .adding {
      animation: adding 0.5s ease;
    }
    
    .sticky {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    
    .sticky.hide {
      transform: translateY(-100%);
    }
    
    .list-view .product-card {
      display: grid;
      grid-template-columns: 250px 1fr auto;
      gap: 1.5rem;
    }
    
    .list-view .product-card-image {
      height: 200px;
    }
    
    .list-view .product-card-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .list-view .product-actions {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
    }
  </style>
`);