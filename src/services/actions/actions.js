import {GET_INGR_LIST, REMOVE_ALL, SET_ORDER_NUMBER} from ".";

const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";
const orderUrl = "https://norma.nomoreparties.space/api/orders";

export function getIngredients() {
    return function(dispatch) {
        fetch(ingredientsUrl)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error ${res.status}`);
            })
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: GET_INGR_LIST,
                        data: res.data,
                        isFetched: true,
                    });
                } else {
                    return Promise.reject(`Data error`);
                }
            })
            .catch(console.error);
    }
}

export function createOrder(order) {
    return function(dispatch) {
        fetch(orderUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                ingredients: order.map((elem) => elem._id),
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: SET_ORDER_NUMBER,
                        number: res.order.number,
                    });
                } else {
                    return Promise.reject(`Data error`);
                }
            })
            .then(() => {
                dispatch({
                    type: REMOVE_ALL,
                })
            })
            .catch(console.error);
    }
}