export const getFetch = (path = '/') => {
    return fetch("http://127.0.0.1:8080/movies/1", {
        method: 'GET',
        mode: 'no-cors',
    });
}
