export const promiseTimeout = (ms, promise) => {
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(()=> {
            clearTimeout(id);
            reject('Timed out in' + ms + 'ms.')},ms)
        });
    return Promise.race([
        promise,
        timeout
    ])
};