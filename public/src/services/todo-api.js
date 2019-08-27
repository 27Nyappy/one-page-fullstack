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

export function addTodo(todo) {
    const url = `${URL}/todos`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });
}

export function updateTodo(todo) {
    const url = `${url}/TODOS/${todo.id}`;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });
}