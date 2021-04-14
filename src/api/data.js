import * as api from './api.js';

api.settings.host = 'http://localhost:3030';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getData() {
    return await api.get(api.settings.host + '/data/cars?sortBy=_createdOn%20desc');
}

export async function getMyData(userId) {
    return await api.get(api.settings.host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getDataById(id) {
    return await api.get(api.settings.host + '/data/cars/' + id);
}

export async function deleteData(id) {
    return await api.del(api.settings.host + '/data/cars/' + id);
}

export async function editData(id, newData) {
    return await api.put(api.settings.host + '/data/cars/' + id, newData);
}

export async function createData(car) {
    return await api.post(api.settings.host + '/data/cars', car);
}