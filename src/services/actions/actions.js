import {GET_INGR_LIST, REMOVE_ALL, SET_ORDER_NUMBER} from ".";
import {checkResponse} from "../../utils/utils";

const url = "https://norma.nomoreparties.space/api";
const ingredientsEndpoint = "/ingredients";
const orderEndpoint = "/orders";

export function getIngredients() {
    return function (dispatch) {
        checkResponse(fetch(url + ingredientsEndpoint))
            .then((res) => {
                dispatch({
                    type: GET_INGR_LIST,
                    data: res.data,
                    isFetched: true,
                });
            });
    }
}

export function createOrder(order) {
    return function (dispatch) {
        checkResponse(fetch(url + orderEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                ingredients: order.map((elem) => elem._id),
            }),
        })).then((res) => {
            dispatch({
                type: SET_ORDER_NUMBER,
                number: res.order.number,
            });
        }).then(() => {
            dispatch({
                type: REMOVE_ALL,
            })
        });
    }
}
