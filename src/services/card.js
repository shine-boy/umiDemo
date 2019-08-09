import request from '@/utils/request';


export async function getList() {

    return request('/api/unity', {
        method: 'GET',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            "Transfer-Encoding":"chunked"
        },
        
    });
}


export async function deleteListById(id) {
    
    return request(`/api/unity/${id}`, {
        method: 'DELETE',
    });
}

export async function addList(payload) {
   
    return request(`/api/unity`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function updateList(payload) {

    return request(`/api/unity`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}