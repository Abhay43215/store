// Catalog Animations
document.addEventListener('DOMContentLoaded', function() {
  // Product card hover animations
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this.querySelector('.product-actions'), {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.1
      });
      
      if (this.querySelector('.hover-image')) {
        gsap.to(this.querySelector('.hover-image'), {
          opacity: 1,
          duration: 0.5
        });
      }
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(this.querySelector('.product-actions'), {
        opacity: 0,
        x: 20,
        duration: 0.3
      });
      
      if (this.querySelector('.hover-image')) {
        gsap.to(this.querySelector('.hover-image'), {
          opacity: 0,
          duration: 0.5
        });
      }
    });
  });
  
  // Filter dropdown animation
  const filterToggle = document.querySelector('.filter-toggle');
  const filterDropdown = document.querySelector('.filter-dropdown');
  
  if (filterToggle && filterDropdown) {
    filterToggle.addEventListener('click', function() {
      if (!filterDropdown.classList.contains('active')) {
        filterDropdown.classList.add('active');
        gsap.fromTo(filterDropdown, 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.3 }
        );
      } else {
        gsap.to(filterDropdown, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          onComplete: () => {
            filterDropdown.classList.remove('active');
          }
        });
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.catalog-filter') && filterDropdown.classList.contains('active')) {
        gsap.to(filterDropdown, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          onComplete: () => {
            filterDropdown.classList.remove('active');
          }
        });
      }
    });
  }
  
  // Quick view modal animations
  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  const quickViewModal = document.getElementById('quickViewModal');
  const closeModal = document.querySelector('.close-modal');
  
  if (quickViewButtons.length > 0 && quickViewModal) {
    quickViewButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        quickViewModal.classList.add('active');
        
        gsap.fromTo(quickViewModal, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.3 }
        );
        
        gsap.fromTo(quickViewModal.querySelector('.modal-content'), 
          { y: 50 }, 
          { y: 0, duration: 0.4, delay: 0.1 }
        );
        
        // Here you would typically load the product data via AJAX
        // For demo purposes, we'll just show a loading state
        setTimeout(() => {
          document.querySelector('.loading-spinner').style.display = 'none';
          // In a real implementation, you would populate this with product data
        }, 1000);
      });
    });
    
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        gsap.to(quickViewModal, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            quickViewModal.classList.remove('active');
            document.querySelector('.loading-spinner').style.display = 'block';
          }
        });
      });
    }
    
    // Close modal when clicking outside content
    quickViewModal.addEventListener('click', function(e) {
      if (e.target === quickViewModal) {
        gsap.to(quickViewModal, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            quickViewModal.classList.remove('active');
            document.querySelector('.loading-spinner').style.display = 'block';
          }
        });
      }
    });
  }
  
  // Add to cart animation
  const addToCartForms = document.querySelectorAll('.add-to-cart-form');
  
  addToCartForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const button = this.querySelector('.add-to-cart-btn');
      const originalText = button.innerHTML;
      
      // Animate button
      button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Adding...';
      
      // Reset after animation
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 1500);
      }, 1000);
    });
  });
});