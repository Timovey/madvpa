export function handleErrorsFromTheServer(error) {
    if (error.response?.data?.errors) {
        let res = {};
        error.response.data.errors.forEach((err) => {
            res[err.path] = err.msg;
        });
        throw res;
    }
    if (error.response?.data?.message) {
        throw error.response.data.message;
    }
    if (error.message) {
        throw error.message;
    }
    throw error;
}
