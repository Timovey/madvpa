import { Swal, swal_types } from '@/shared';
const overflow_nodes = document.querySelectorAll('html, body');
let isString = (value) => typeof value === 'string' || value instanceof String;

function handle_request_error(error) {
    console.error(error);

    if (error && isString(error)) {
        return Swal.fire({
            ...swal_types.error,
            title: error
        });
    }
    const err_res = error?.response?.data;
    if (err_res && isString(err_res)) {
        return Swal.fire({
            ...swal_types.error,
            title: err_res
        });
    } else if (err_res && err_res.message) {
        return Swal.fire({
            ...swal_types.error,
            title: err_res.message
        });
    }

    const err_messages = error?.response?.data?.errors ?? [];

    if (!err_messages?.length) {
        return Swal.fire(swal_types.error);
    }

    Swal.fire({
        ...swal_types.warning,
        timer: 5000,
        title: err_messages[0].msg ?? 'Произошла ошибка'
    });
}

function debounce(func, timeout = 600) {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function format_date(date_str) {
    return new Date(date_str)
        .toLocaleDateString('ru-Ru', {
            hour: '2-digit',
            minute: '2-digit'
        })
        .replace(',', '');
}

function toggle_page_overflow(display) {
    overflow_nodes.forEach((node) => {
        node.style.overflowY = display ? 'initial' : 'hidden';
        node.style.overflowX = 'clip';
    });
}

export { debounce, format_date, handle_request_error, toggle_page_overflow };
