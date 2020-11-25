/**
 * Event related functions
 *
 * @namespace Behaviours
 */

/**
 * Check whether required DOM elements exist, if so, call fn with provided els
 * @memberof Behaviours
 * @param { Function } fn Function to be called if elements exist
 * @param { Array.<HTMLElement | NodeList> } required All elements in this array are required to exist, otherwise fn won't be called
 * @param { Array.<HTMLElement | NodeList> } [optional] These are optional elements that will be passed to fn if it's called
 */
function callFnWithElementsIfExist(fn, required, optional = []) {
    let call = true;

    required.forEach((el) => {
        if (!el) call = false;
        else if (NodeList.prototype.isPrototypeOf(el) && !el.length) call = false; // eslint-disable-line
    });

    if (call) fn(...required, ...optional);
}

/**
 * Create a debounced version of the passed function
 * @memberof Behaviours
 * @param { Function } fn Function to debounce
 * @param { Integer } delay Delay after which it'll be executed after the last call to de debounced function
 * @return { Function } Debounced function
 */
function debounce(fn, delay) {
    let timeout;

    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(fn, delay);
    };
}

/**
 * Trigger scroll to coordinates relative to the element
 * @param { Element } el Scroll to a particular set of coordinates inside a given element
 * @param { Integer } left Number of pixels along the horizontal axis of the element that will be displayed in the upper left
 * @param { Integer } top Number of pixels along the vertical axis of the element that will be displayed in the upper left
 * @param { Bool } smooth Whether the scrolling should animate smoothly
 * @memberof Behaviours
 */
function scrollIn(el, left, top, smooth) {
    if (smooth) el.scrollTo({ left, top, behavior: 'smooth' });
    else el.scrollTo();
}

/**
 * Trigger scroll to the element
 * @param { Element } el Scroll untill the element is at the top of the viewport (like clicking an anchor tag)
 * @param { Bool } smooth Whether the scrolling should animate smoothly
 * @memberof Behaviours
 */
function scrollTo(el, smooth) {
    if (smooth) el.scrollIntoView({ behavior: 'smooth' });
    else el.scrollIntoView();
}

/**
 * Create a thottled version of the passed function
 * @memberof Behaviours
 * @param { Function } fn Function to throttle
 * @param { Integer } delay Minimum allowed interval of time between two calls of the function
 * @return { Function } Throttled function
 */
function throttle(delay, fn) {
    let wait = false;
    let toExec;

    return () => {
        if (wait) {
            if (toExec) clearTimeout(toExec);

            toExec = setTimeout(fn, delay);
            return;
        }

        if (toExec) clearTimeout(toExec);
        fn();
        wait = true;

        setTimeout(() => {
            wait = false;
        }, delay);
    };
}

export {
    callFnWithElementsIfExist,
    debounce,
    scrollIn,
    scrollTo,
    throttle
};
