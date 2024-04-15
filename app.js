const section1 = document.getElementById('section--1');
const header = document.querySelector('.head');
const source = document.getElementById('source');
const navLinks = document.querySelectorAll('.nav__link');

//Functions
const vidSource = function () {
    let i = 1;
    return function () {
        const video = document.querySelector('video');
        video.src = `vid${i}.mp4`;
        i = (i % 3) + 1;
    }
}
const changeVideo = vidSource();



const headSelect = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.head').querySelectorAll('.nav__link');
        const logo = link.closest('.head').querySelector('img');

        siblings.forEach(el => {
            if (el !==link) el.style.opacity = this;
        })
        logo.style.opacity = this;
    }
}

//Event Listeners
header.addEventListener('mouseover', headSelect.bind(0.5));
header.addEventListener('mouseout', headSelect.bind(1));

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav__link');

    //Section Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Get the target section's id
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});



//Background Video Change Interval
setInterval(changeVideo, 2000);

//slider
const slider = function () {

    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    let curSlide = 0;
    const maxSlide = slides.length;
    const dotContainer = document.querySelector('.dots');
    const sliderContainer = document.querySelector('.slider');
    let startX = 0;

    const createDots = function () {
        slides.forEach(function (s, i) {
            dotContainer.insertAdjacentHTML('beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`)
        })
    }

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove
            ('dots__dot--active'));

        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
    }
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    }
    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    };

    init();

//ev handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        e.key === 'ArrowLeft' && prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    })

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const {slide} = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    })

    sliderContainer.addEventListener('touchstart', function(e) {
        e.preventDefault();
        startX = e.touches[0].clientX;
    })
    sliderContainer.addEventListener('touchmove', function(event) {
        event.preventDefault();
        const deltaX = event.touches[0].clientX - startX;

        const threshold = 10;

        if (deltaX > threshold) {
            prevSlide();
        } else if (deltaX < -threshold) {
            nextSlide();
        }
    });
    sliderContainer.addEventListener('touchend', function() {
        event.preventDefault();
        startX = 0;
    });


}
slider();

