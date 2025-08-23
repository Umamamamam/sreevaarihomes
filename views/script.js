let count = false;
let isNight = true; 

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

const slideshow = document.getElementById('home-slideshow');
let slides = Array.from(slideshow.querySelectorAll('.slide'));
let currentIndex = 0;
const transitionDuration = 1000;
const visibleDuration = 3000;
let slideInterval;

// Initialize slide positions
function initSlides() {
  slides.forEach((slide, index) => {
    slide.style.position = 'absolute';
    slide.style.width = '100%';
    slide.style.height = '100%';
    slide.style.left = `${index * 100}%`;
    slide.style.transition = `left ${transitionDuration / 1000}s ease-in-out`;
  });
}

// Slide to next (move first to end)
function slideToNext() {
  slides.forEach((slide) => {
    const currentLeft = parseFloat(slide.style.left);
    slide.style.left = `${currentLeft - 100}%`;
  });

  setTimeout(() => {
    const first = slides.shift();
    first.style.transition = 'none';
    first.style.left = `${(slides.length) * 100}%`;
    slideshow.appendChild(first);
    slides.push(first);

  
    void first.offsetWidth;

    first.style.transition = `left ${transitionDuration / 1000}s ease-in-out`;
  }, transitionDuration);
}

// Slide to previous (move last to front)
function slideToPrev() {
  const last = slides.pop();
  last.style.transition = 'none';
  last.style.left = `${-100}%`;
  slideshow.insertBefore(last, slides[0]);
  slides.unshift(last);


  void last.offsetWidth;

  last.style.transition = `left ${transitionDuration / 1000}s ease-in-out`;

  slides.forEach((slide) => {
    const currentLeft = parseFloat(slide.style.left);
    slide.style.left = `${currentLeft + 100}%`;
  });
}


document.getElementById('nextBtn').addEventListener('click', () => {
  clearInterval(slideInterval);
  slideToNext();
  restartInterval();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  clearInterval(slideInterval);
  slideToPrev();
  restartInterval();
});


function startInterval() {
  slideInterval = setInterval(slideToNext, visibleDuration);
}

function restartInterval() {
  clearInterval(slideInterval);
  startInterval();
}

slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
slideshow.addEventListener('mouseleave', () => startInterval());


initSlides();
startInterval();


function downloadForm() {
  document.querySelector('.download-form-overlay').style.display = 'block';
  document.querySelector('.download-form-container').style.display = 'block';
  document.body.classList.add('no-scroll');
}

function hidedownloadForm() {
  document.querySelector('.download-form-overlay').style.display = 'none';
  document.querySelector('.download-form-container').style.display = 'none';
  document.body.classList.remove('no-scroll');
}
function closedownloadForm() {
  document.querySelector('.download-form-overlay').style.display = 'none';
  document.querySelector('.download-form-container').style.display = 'none';
  document.body.classList.remove('no-scroll');
}

function viewForm() {
  document.querySelector('.view-form-overlay').style.display = 'block';
  document.querySelector('.view-form-container').style.display = 'block';
  document.body.classList.add('no-scroll');
}

function hideviewForm() {
  document.querySelector('.view-form-overlay').style.display = 'none';
  document.querySelector('.view-form-container').style.display = 'none';
  document.body.classList.remove('no-scroll');
}
function closeviewForm() {
  document.querySelector('.view-form-overlay').style.display = 'none';
  document.querySelector('.view-form-container').style.display = 'none';
  document.body.classList.remove('no-scroll');
}
function viewHidden (event) {
  event.preventDefault(); 
  const hiddenContent = document.querySelector('.hidden-content');
  const viewMoreButton = document.querySelector('.view-more-button');
 
  hiddenContent.style.display = 'block';
  
}

 
  function closeSidebar() {
    document.getElementById('mob-sidebar').classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  document.querySelectorAll('#mob-sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      closeSidebar();
    });
  });

  
  document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('mob-sidebar');
    const isClickInside = sidebar.contains(event.target);
    const isMenuButton = event.target.closest('.mobile-menu');

    if (!isClickInside && !isMenuButton && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });


document.addEventListener("DOMContentLoaded", function () {
  const tabSection = document.querySelector('#nearby');
  const tabButtons = document.querySelectorAll('.nearby-tab');
  const tabContents = document.querySelectorAll('.nearby-content');
  let currentIndex = 0;
  let autoSwitchInterval = null;
  let autoStarted = false;

  function switchTab(index) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    if (tabButtons[index] && tabContents[index]) {
      tabButtons[index].classList.add('active');
      tabContents[index].classList.add('active');
    }
  }

  function startAutoSwitch() {
    if (autoStarted) return; 
    autoStarted = true;
    autoSwitchInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % tabButtons.length;
      switchTab(currentIndex);
    }, 2000);
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      clearInterval(autoSwitchInterval);
      autoSwitchInterval = null;
      currentIndex = index;
      switchTab(currentIndex);
      startAutoSwitch();
    });
  });

  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      switchTab(currentIndex); 
      startAutoSwitch();       
    }
  }, { threshold: 0.5 });

  observer.observe(tabSection);

  
  switchTab(currentIndex);
});



const video = document.getElementById("myVideo");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause(); 
    }
  });
}, { threshold: 0.5 });

observer.observe(video);

function openPopup() {
  document.getElementById('enquiryPopup').classList.add('show');
 
  document.body.classList.add('no-scroll');
}


function closePopup() {
  document.getElementById('enquiryPopup').classList.remove('show');
  document.body.classList.remove('no-scroll');
}



document.getElementById('closePopup').addEventListener('click', closePopup);


document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closePopup();
  }
});
document.addEventListener('click', function (event) {
  const popup = document.getElementById('enquiryPopup');
  const isClickInside = popup.contains(event.target);
  const isPopupVisible = popup.classList.contains('show');

  if (!isClickInside && isPopupVisible) {
    closePopup();
  }
});


function switcher2() {
  const gallery_image_2_night = document.getElementById('gallery_image_2_night');
  const gallery_image_2_day = document.getElementById('gallery_image_2_day');

  if (isNight) {
    gallery_image_2_night.style.display = 'none';
    gallery_image_2_day.style.display = 'block';
  } else {
    gallery_image_2_night.style.display = 'block';
    gallery_image_2_day.style.display = 'none';
  }
}

function switcher3() {
  const gallery_image_3_night = document.getElementById('gallery_image_3_night');
  const gallery_image_3_day = document.getElementById('gallery_image_3_day');

  if (isNight) {
    gallery_image_3_night.style.display = 'none';
    gallery_image_3_day.style.display = 'block';
  } else {
    gallery_image_3_night.style.display = 'block';
    gallery_image_3_day.style.display = 'none';
  }
}

function handleThemeToggle() {
  switcher2();
  switcher3();
  isNight = !isNight; 
}


 function openSidebar() {
    document.getElementById('mob-sidebar').classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeSidebar() {
    document.getElementById('mob-sidebar').classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

function handleAnchorClick(event, element) {
    event.preventDefault(); 

    const targetId = element.getAttribute("href").split("#")[1]; 
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });

  
      
    }
  }
 