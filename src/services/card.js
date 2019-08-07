import request from '@/utils/request';


export async function getList() {

    return request('/dev/random_joke', {
        method: 'GET',
    });
}

export async function getListById(id) {

    return request(`/dev/random_joke?ID=${id}`, {
        method: 'GET',
    });
}

export async function deleteListById(id) {
    
    return request(`/dev/random_joke?ID=${id}`, {
        method: 'DELETE',
    });
}

export async function addList(payload) {
    
    return request(`/dev/random_joke`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function updateList(payload) {

    return request(`/dev/random_joke`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}