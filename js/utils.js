export function initCarousel(carousel) {
  // if the inverted id is set then render a hero section carousel
  if (carousel.activeIDInv !== undefined) {
    renderHeroCarousel(carousel);
    carousel.containerYPos = getPosition(carousel.container);
    // if not set render a normal carousel
  } else {
    renderCarousel(carousel);
  }
  // init Drag input
  initDraggable(carousel);
  // if pagination is set then initialise it and add event listeners
  if (carousel.pagination !== false) {
    initPagination(carousel);
    carousel.pagination.querySelectorAll('.dot').forEach((dot) => {
      dot.addEventListener('click', handlePageinationclick);
    });
  }
  // if navigation is set then add event listeners to the navigation elements
  if (carousel.navigation !== false) {
    const btnNext = carousel.navigation.querySelector('.arrow-next');
    btnNext.addEventListener('click', handleButtonClick);
    const btnPrev = carousel.navigation.querySelector('.arrow-prev');
    btnPrev.addEventListener('click', handleButtonClick);
  }
  // handler function responsible for handling navigation clicks
  function handleButtonClick() {
    carousel.activeID = this.classList.contains('arrow-next')
      ? (carousel.activeID += 1)
      : (carousel.activeID -= 1);
    transitionSlide(carousel);
  }
  // handler function responsible for handling click on the pagination dots
  function handlePageinationclick() {
    carousel.activeID = parseInt(this.getAttribute('dot'));
    carousel.activeIDInv =
      // if the inverted id exists set is value to the dotInv attribute
      carousel.activeIDInv !== undefined
        ? parseInt(this.getAttribute('dotInv'))
        : undefined;
    transitionSlide(carousel);
  }
}
// function populates the carousel container with images
function renderCarousel(carousel) {
  for (let i = 0; i < carousel.numberOfSlides; i += 1) {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    slide.setAttribute('slide', i);
    const slideImg = document.createElement('img');
    slideImg.src = carousel.images[i];
    slideImg.loading = i >= 2 ? 'lazy' : 'eager';
    slide.appendChild(slideImg);
    carousel.container.appendChild(slide);
  }
  // the calculates the overall width of the carousel container
  carousel.container.style.width = `${
    carousel.slideWidth * carousel.numberOfSlides
  }vw`;
  // sets the active slide
  gsap.to(
    `.carousel-slide[slide = "${carousel.activeID}"]`,
    carousel.animationSpeed,
    {
      scale: carousel.scaleVal,
      filter: 'brightness(1)',
      ease: carousel.easeVal2,
      delay: carousel.animationSpeed,
    }
  );
}
// function popolates the hero carousel slides with content
function renderHeroCarousel(carousel) {
  for (let i = 0; i < carousel.numberOfSlides; i += 1) {
    const slideLeft = document.createElement('div');
    const slideRight = document.createElement('div');
    slideLeft.classList.add('carousel-slide', 'left');
    slideRight.classList.add('carousel-slide', 'right');
    slideLeft.style.backgroundImage = `url(${
      carousel.images[carousel.numberOfSlides - i - 1]
    })`;
    slideLeft.loading = i >= 1 ? 'lazy' : 'eager';
    slideRight.style.backgroundColor =
      i % 2 === 0 ? carousel.backgroundColor : carousel.backgroundColor2;
    const contentLeft = document.createElement('div');
    const contentRight = document.createElement('div');
    contentLeft.classList.add('slide-contents');
    contentRight.classList.add('slide-contents');
    const headline = document.createElement('h1');
    const button = document.createElement('div');
    const cta = document.createElement('a');
    headline.textContent = carousel.headlines[carousel.numberOfSlides - i - 1];
    button.classList.add('cta-btn', 'hover-filled-slide-right');
    cta.textContent = carousel.callToAction;
    const description = document.createElement('p');
    description.textContent =
      carousel.description[carousel.numberOfSlides - i - 1];
    button.appendChild(cta);
    contentLeft.appendChild(headline);
    contentLeft.appendChild(button);
    contentRight.appendChild(description);
    slideLeft.appendChild(contentLeft);
    slideRight.appendChild(contentRight);
    carousel.container.appendChild(slideLeft);
    carousel.container2.appendChild(slideRight);
  }
  // sets the height of the left carousel container
  carousel.container.style.height = `${
    carousel.slideWidth * carousel.numberOfSlides
  }vw`;
  // sets the height of the right carousel container
  carousel.container2.style.height = `${
    carousel.slideWidth * carousel.numberOfSlides
  }vw`;
  // moves the left container to the last slide
  carousel.container.style.transform = `translateY(-${
    carousel.numberOfSlides * carousel.slideWidth - carousel.slideWidth
  }vh)`;
}
// function creates the pagination dots
function initPagination(carousel) {
  for (let i = 0; i < carousel.numberOfSlides; i += 1) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.setAttribute('dot', i);
    dot.setAttribute('dotInv', carousel.numberOfSlides - i - 1);
    carousel.pagination.appendChild(dot);
  }
  gsap.to('.dot', carousel.animationSpeed / 2, {
    opacity: 0.6,
    ease: carousel.easeVal2,
    delay: 0.1,
  });
  gsap.to(`.dot[dot = "${carousel.activeID}"]`, carousel.animationSpeed / 2, {
    opacity: 1,
    scale: 1.5,
    ease: carousel.easeVal2,
    delay: carousel.animationSpeed,
  });
}
// functions gets called inside transitionSlide()
// updates the pagination to the current slide
function updatePagination(carousel) {
  gsap.to(carousel.pagination.childNodes, carousel.animationSpeed / 2, {
    opacity: 0.6,
    scale: 1,
    transformOrigin: 'center center',
    ease: carousel.easeVal2,
  });
  gsap.to(
    carousel.pagination.querySelector(`[dot = "${carousel.activeID}"]`),
    carousel.animationSpeed / 2,
    {
      opacity: 100,
      scale: 1.5,
      transformOrigin: 'center center',
      ease: carousel.easeVal2,
    }
  );
}
// function get position gets the elements position relative to the top of the document
function getPosition(element) {
  const elPostion = Math.abs(
    element.getBoundingClientRect().top + document.documentElement.scrollTop
  );
  return elPostion;
}
// function transitions the carousel to the target location
function transitionSlide(carousel) {
  if (carousel.activeID >= carousel.numberOfSlides - 1) {
    carousel.activeID = carousel.numberOfSlides - 1;
    carousel.activeIDInv = carousel.activeIDInv !== undefined ? 0 : undefined;
  }
  // if the user swipes right on the first slide the activeID will remain the same
  if (carousel.activeID <= 0) {
    carousel.activeID = 0;
    carousel.activeIDInv =
      carousel.activeIDInv !== undefined
        ? carousel.numberOfSlides - 1
        : undefined;
  }
  // transitionValue is used as a paramter that determines the transition amount on the x axis
  const transitionValue = carousel.activeID * carousel.slideWidth * -1;
  // if the carousel object belongs to a hero carousel then run this section
  if (carousel.activeIDInv !== undefined) {
    const transitionValueInv = carousel.activeIDInv * carousel.slideWidth * -1;
    gsap.to(carousel.container, carousel.animationSpeed, {
      y: `${transitionValueInv}vh`,
      ease: carousel.easeVal,
      onComplete() {
        carousel.containerYPos = getPosition(carousel.container);
      },
    });
    gsap.fromTo(
      carousel.container2,
      carousel.animationSpeed,
      {
        y: `${
          carousel.container2.getBoundingClientRect().top +
          document.documentElement.scrollTop
        }px`,
      },
      {
        y: `${transitionValue}vh`,
        ease: carousel.easeVal,
      }
    );
    // if not then run code for swipe carousel
  } else {
    gsap.to(carousel.container, carousel.animationSpeed, {
      x: `${transitionValue}vw`,
      ease: carousel.easeVal,
    });
    gsap.to(carousel.container.childNodes, carousel.animationSpeed, {
      scale: 1,
      filter: 'brightness(0.5)',
      ease: carousel.easeVal2,
    });
    gsap.to(
      carousel.container.querySelector(`[slide = "${carousel.activeID}"]`),
      carousel.animationSpeed,
      {
        scale: carousel.scaleVal,
        filter: 'brightness(1)',
        ease: carousel.easeVal2,
        delay: carousel.animationSpeed / 2.5,
      }
    );
  }
  // if the pagination exists then update it
  if (carousel.pagination !== false) {
    updatePagination(carousel);
  }
}
// function creates a draggable instance for the carousel
function initDraggable(carousel) {
  Draggable.create(carousel.container, {
    type: carousel.dragAxis,
    bounds: carousel.wrapper,
    edgeResistance: 0.9,
    dragResistance: carousel.dragResist,
    // if this is a hero carousel onDrag will handle the translation of the right carousel container
    onDrag: () => {
      if (carousel.activeIDInv !== undefined) {
        carousel.container2YPos = getPosition(carousel.container2);
        const moveAmount =
          getPosition(carousel.container) - carousel.containerYPos;
        carousel.containerYPos += moveAmount;
        requestAnimationFrame(() => {
          carousel.container2.style.transform = `translateY(-${
            carousel.container2YPos - moveAmount
          }px)`;
        });
      }
    },
    inertia: false,
    onDragEnd() {
      if (carousel.activeIDInv !== undefined) {
        if (this.getDirection('start') === 'up') {
          carousel.activeIDInv += 1;
          carousel.activeID -= 1;
        } else if (this.getDirection('start') === 'down') {
          carousel.activeIDInv -= 1;
          carousel.activeID += 1;
        }
      } else if (this.getDirection('start') === 'left') {
        carousel.activeID += 1;
        console.log(carousel.activeID);
      } else if (this.getDirection('start') === 'right') {
        carousel.activeID -= 1;
        console.log(carousel.activeID);
      }

      transitionSlide(carousel);
    },
  });
}
