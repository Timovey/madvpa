export const swal_types = {
    error: {
        title: 'Произошла ошибка',
        toast: true,
        timer: 2000,
        position: 'bottom',
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false,
        color: 'red'
    },
    warning: {
        title: '',
        toast: true,
        timer: 2000,
        position: 'bottom',
        icon: 'warning',
        showCloseButton: true,
        showConfirmButton: false,
        color: 'orange'
    },
    success: {
        title: '',
        toast: true,
        timer: 1500,
        position: 'bottom',
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false,
        color: 'green'
    },
    confirm: {
        title: 'Вы уверены ?',
        showDenyButton: true,
        confirmButtonText: 'Да',
        denyButtonText: 'Нет',
        confirmButtonColor: '#F99723',
        denyButtonColor: 'gray'
    },
    missing_permission: {
        title: 'Отсутствуют привилегии',
        toast: true,
        timer: 1500,
        position: 'bottom',
        showConfirmButton: false,
        color: 'orange'
    }
};
