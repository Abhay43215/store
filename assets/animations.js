// Initialize GSAP animations
document.addEventListener('DOMContentLoaded', () => {
  // Fade in page content
  gsap.from('#PageContainer', {
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  });

  // Animate product categories
  gsap.from('.product-categories li', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  });

  // Animate product cards on scroll
  gsap.utils.toArray('.product-card').forEach(card => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Hero section parallax effect
  if (document.querySelector('.hero-section')) {
    gsap.to('.hero-section', {
      backgroundPosition: '50% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Button hover animations
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Hero 3D Animation
  initHero3DAnimation();
  
  // Category 3D Models
  initCategoryModels();
});

function initHero3DAnimation() {
  const canvas = document.getElementById('hero-3d-model');
  if (!canvas) return;
  
  // Set up Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create a smartphone model (simplified)
  const phoneGeometry = new THREE.BoxGeometry(2, 4, 0.2);
  const screenGeometry = new THREE.PlaneGeometry(1.8, 3.6);
  
  const phoneMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x333333,
    specular: 0x111111,
    shininess: 100
  });
  
  const screenMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x3a86ff,
    opacity: 0.9,
    transparent: true
  });
  
  const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
  scene.add(phone);
  
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.z = 0.11;
  phone.add(screen);
  
  // Position camera
  camera.position.z = 6;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the phone
    phone.rotation.y += 0.01;
    phone.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

function initCategoryModels() {
  const categoryModels = document.querySelectorAll('.category-model');
  
  categoryModels.forEach(canvas => {
    const modelUrl = canvas.dataset.modelUrl;
    if (!modelUrl) {
      createDefaultCategoryModel(canvas);
      return;
    }
    
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Load 3D model
    const loader = new THREE.GLTFLoader();
    loader.load(
      modelUrl,
      function(gltf) {
        const model = gltf.scene;
        scene.add(model);
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.set(scale, scale, scale);
        
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;
        
        // Animation loop
        function animate() {
          requestAnimationFrame(animate);
          model.rotation.y += 0.01;
          renderer.render(scene, camera);
        }
        
        animate();
      },
      undefined,
      function(error) {
        console.error('An error occurred loading the model:', error);
        createDefaultCategoryModel(canvas);
      }
    );
    
    // Position camera
    camera.position.z = 5;
    
    // Handle window resize
    window.addEventListener('resize', function() {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
  });
}

function createDefaultCategoryModel(canvas) {
  // Set up Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create a simple geometric shape
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0x3a86ff,
    specular: 0x111111,
    shininess: 30
  });
  
  const shape = new THREE.Mesh(geometry, material);
  scene.add(shape);
  
  // Position camera
  camera.position.z = 3;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the shape
    shape.rotation.y += 0.01;
    shape.rotation.x += 0.005;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}