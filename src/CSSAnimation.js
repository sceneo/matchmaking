import 'animate.css';

function animateElement(element, animation, animationDuration, callback) {

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
        }, animationDuration);
    });
}

export default animateElement;