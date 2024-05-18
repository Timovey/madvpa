function handleImage(el, binding) {
    const val = binding.value;
    const src = val?.src ?? val;
    const default_image = val?.default_image ?? '/images/svg/person.svg';

    const image = new Image();
    image.src = src;

    image.onload = function () {
        el.src = src;
    };

    image.onerror = function () {
        el.src = default_image;
    };
}

export default {
    mounted(el, binding) {
        handleImage(el, binding);
    },
    updated(el, binding) {
        handleImage(el, binding);
    }
};
