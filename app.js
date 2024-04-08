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