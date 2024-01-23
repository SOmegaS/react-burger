const url = "https://norma.nomoreparties.space/api";

export const checkResponse = (resp) => {
    return resp.then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
    }).then((res) => {
        if (res.success) {
            return res;
        } else {
            return Promise.reject(`Data error`);
        }
    }).catch(console.error);
}
