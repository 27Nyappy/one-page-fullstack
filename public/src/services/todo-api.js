const URL = '/api';

function fetchWithError(url, options) {
    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.jason().then(json => {
                    throw json.error;
                });
            }
        });
}

export function getTodos(options) {
    const showAll = options && options.showAll;
    const url = `${URL}/todos${showAll ? '?show=all' : ''}`;
    return fetchWithError(url);
}