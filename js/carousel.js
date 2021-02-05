import { initCarousel } from './utils.js';

export function Carousel(imagesArr, parentEl, options = {}) {
  // change slideWidth property
  // create the carousel object an assigng option proprties if set
  const carousel = {
    numberOfSlides: imagesArr.length,
    images: imagesArr,
    activeID: 0,
    dragAxis: 'x',
    dragResist: options.dragResist === undefined ? 0.0 : options.dragResist,
    slideWidth: options.width === undefined ? 60 : options.width,
    animationSpeed: options.speed === undefined ? 0.5 : options.speed,
    easeVal: options.ease === undefined ? Power2.inOut : options.ease,
    easeVal2: options.ease2 === undefined ? Power2.Out : options.ease2,
    scaleVal: 1,
    overflow: options.overflow === undefined ? true : options.overflow,
    wrapper: null,
    viewport: null,
    container: null,
    pagination: options.pagination === undefined ? true : options.pagination,
    navigation: options.navigation === undefined ? false : options.navigation,
  };
  // create the DOM structure for the carousel
  parentEl.classList.add('parentEl');
  carousel.wrapper = document.createElement('div');
  carousel.wrapper.classList.add('carousel-wrapper');
  carousel.container = document.createElement('div');
  carousel.container.classList.add('carousel-container');
  // if the overflow is set to false, create a viewport that hides off-screen content
  if (carousel.overflow === false) {
    carousel.viewport = document.createElement('div');
    carousel.viewport.classList.add('carousel-viewport');
    carousel.viewport.appendChild(carousel.container);
    carousel.wrapper.appendChild(carousel.viewport);
    // if overflow is false then add the overflow class to elements
  } else if (carousel.overflow === true) {
    carousel.container.classList.add('overflow');
    carousel.wrapper.classList.add('overflow');
    carousel.wrapper.appendChild(carousel.container);
    carousel.scaleVal = 1.2;
  }
  // if the pagination option is set to true, create the container for it
  if (carousel.pagination === true) {
    carousel.pagination = document.createElement('div');
    carousel.pagination.classList.add('carousel-pagination');
    carousel.wrapper.appendChild(carousel.pagination);
  }
  // if the navigation option is set to true then create the navigation elements
  if (carousel.navigation === true) {
    carousel.navigation = document.createElement('div');
    carousel.navigation.classList.add('carousel-navigation');
    const template = `<div class="carousel-button arrow-prev">
  <svg class="arrow-prev" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      width="36" height="35" viewBox="0 0 36 35">
      <defs>
          <clipPath id="clip-Index_8">
              <rect width="36" height="35" />
          </clipPath>
      </defs>
      <g id="Index_8" data-name="Index – 8" clip-path="url(#clip-Index_8)">
          <g id="Groupe_614" data-name="Groupe 614" transform="translate(-5817.75 -6010)">
              <path id="Tracé_1157" data-name="Tracé 1157" d="M0,0,8.86,8.86,0,17.72"
                  transform="translate(5839.361 6036.632) rotate(180)" fill="none" stroke="#000"
                  stroke-width="3" />
          </g>
      </g>
  </svg>
</div>
<div class="carousel-button arrow-next"> <svg class="arrow-next" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="35" viewBox="0 0 36 35">
      <defs>
          <clipPath id="clip-Index_9">
              <rect width="36" height="35" />
          </clipPath>
      </defs>
      <g id="Index_9" data-name="Index – 9" clip-path="url(#clip-Index_9)">
          <g id="Groupe_614" data-name="Groupe 614" transform="translate(-5817.75 -6010)">
              <path id="Tracé_1157" data-name="Tracé 1157" d="M0,0,8.86,8.86,0,17.72"
                  transform="translate(5832.5 6018.912)" fill="none" stroke="#000" stroke-width="3" />
          </g>
      </g>
  </svg></div>`;
    // create a DOM fragment from the template string
    const buttons = document.createRange().createContextualFragment(template);
    carousel.navigation.appendChild(buttons);
    carousel.wrapper.appendChild(carousel.navigation);
  }
  // append the carousel as the first child of the parentEl
  parentEl.insertAdjacentElement('afterbegin', carousel.wrapper);
  // initialize the carousel
  initCarousel(carousel);
}

// Hero Carousel function
export function HeroCarousel(
  imagesArr,
  headlinesArr,
  ctaLinksArr,
  descriptionsArr,
  parentEl,
  options = {}
) {
  // change slideWidth property
  // create the carousel object an assigng option proprties if set
  const carousel = {
    numberOfSlides: imagesArr.length,
    images: imagesArr,
    headlines: headlinesArr,
    ctaLinks: ctaLinksArr,
    description: descriptionsArr,
    activeID: 0,
    activeIDInv: imagesArr.length - 1,
    dragAxis: 'y',
    dragResist: options.dragResist === undefined ? 0.0 : options.dragResist,
    slideWidth: options.width === undefined ? 100 : options.width,
    animationSpeed: options.speed === undefined ? 0.4 : options.speed,
    easeVal: options.ease === undefined ? Power2.inOut : options.ease,
    easeVal2: options.ease2 === undefined ? Power2.Out : options.ease2,
    callToAction: options.cta === undefined ? 'Learn more' : options.cta,
    backgroundColor:
      // eslint-disable-next-line prettier/prettier
      options.backgroundColor === undefined ? '#0466c8' : options.backgroundColor,
    backgroundColor2:
      // eslint-disable-next-line prettier/prettier
      options.backgroundColor2 === undefined ? '#0353a4' : options.backgroundColor2,
    scaleVal: 1,
    overflow: options.overflow === undefined ? true : options.overflow,
    wrapper: null,
    viewport: null,
    container: null,
    containerYPos: null,
    container2: null,
    container2YPos: null,
    pagination: options.pagination === undefined ? true : options.pagination,
    navigation: options.navigation === undefined ? false : options.navigation,
  };
  // create hero carousel DOM structure
  parentEl.classList.add('parentEl');
  carousel.wrapper = document.createElement('div');
  carousel.wrapper.classList.add('hero', 'carousel-wrapper');
  carousel.viewport = document.createElement('div');
  carousel.viewport.classList.add('carousel-viewport');
  carousel.container = document.createElement('div');
  carousel.container.classList.add('carousel-container', 'left');
  carousel.container2 = document.createElement('div');
  carousel.container2.classList.add('carousel-container', 'right');
  carousel.viewport.appendChild(carousel.container);
  carousel.viewport.appendChild(carousel.container2);
  carousel.wrapper.appendChild(carousel.viewport);
  // if pagination is to true create the container for it
  if (carousel.pagination === true) {
    carousel.pagination = document.createElement('div');
    carousel.pagination.classList.add('carousel-pagination');
    carousel.wrapper.appendChild(carousel.pagination);
  }
  // append the carousel as the first child of the parentEl
  parentEl.insertAdjacentElement('afterbegin', carousel.wrapper);
  // initialize the carousel
  initCarousel(carousel);
}
