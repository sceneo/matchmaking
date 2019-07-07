// import CSS library animate.css to avoid JavaScript overhead and call functions for start and end of animations

import 'animate.css';

function animateElement(element, animation, delay, callback) {

    if (element) {
        const node = document.querySelector(element)

        if (node) {
            node.classList.add('animated', animation)

            function onAnimationEnd() {
                node.classList.remove('animated', animation)
                node.removeEventListener('animationend', onAnimationEnd)

                if (typeof callback === 'function') callback()
            }

            node.addEventListener('animationend', onAnimationEnd)
        }
    }

    return new Promise(resolve => {
        setTimeout(function() {
            resolve();
        }, delay);
    });
}

export default animateElement;