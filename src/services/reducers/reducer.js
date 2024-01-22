import {
    GET_INGR_LIST,
    ADD_INGR,
    REMOVE_INGR,
    DRAG_INGR,
    REMOVE_ALL,
    SET_INGR_DETAIL,
    REMOVE_INGR_DETAIL,
    SET_ORDER_NUMBER,
} from "../actions";

function getIngrList(state, action) {
    return {
        ...state,
        fetchedIngredients: action.data.map((elem) => {
            return {...elem, counter: 0};
        }),
        isFetched: action.isFetched,
    };
}

function addIngr(state, action) {
    return {
        ...state,
        fetchedIngredients: state.fetchedIngredients.map((elem) => {
            const flag = elem._id === action.item._id && (elem.type !== "bun" || elem.counter === 0);
            return {
                ...elem,
                counter: elem.counter + flag,
            };
        }),
        ingredientsConstructorList: [
            ...state.ingredientsConstructorList,
            {...action.item, currentId: action.id},
        ],
    };
}

function removeIngr(state, action) {
    return {
        ...state,
        fetchedIngredients: state.fetchedIngredients.map((elem) => {
            return {
                ...elem,
                counter: elem.counter + (elem._id === action.item._id ? -1 : 0),
            }
        }),
        ingredientsConstructorList: state.ingredientsConstructorList.filter((elem) => {
            return elem.currentId !== action.item.currentId;
        }),
    };
}


function dragIngr(state, action) {
    const ingr = state.ingredientsConstructorList[action.dragIndex];
    return {
        ...state,
        ingredientsConstructorList: state.ingredientsConstructorList
            .filter((elem, index) => {
                return index !== action.dragIndex;
            })
            .splice(action.hoverIndex, 0, ingr),
    };
}


function removeAll(state, action) {
    return {
        ...state,
        fetchedIngredients: state.fetchedIngredients.map((elem) => {
            return {...elem, counter: 0};
        }),
        ingredientsConstructorList: [],
    };
}


function setIngrDetail(state, action) {
    return {...state, currentIngredient: action.item};
}


function removeIngrDetail(state, action) {
    return {...state, currentIngredient: {}};
}


function setOrderNumber(state, action) {
    return {...state, order: action.number};
}

export const reducer = (state, action) => {
    if (!state) {
        state = {
            fetchedIngredients: [],
            ingredientsConstructorList: [],
            currentIngredient: {},
            order: 0,
            isFetched: false,
        };
    }
    switch (action.type) {
        case GET_INGR_LIST:
            return getIngrList(state, action);
        case ADD_INGR:
            return addIngr(state, action);
        case REMOVE_INGR:
            return removeIngr(state, action);
        case DRAG_INGR:
            return dragIngr(state, action);
        case REMOVE_ALL:
            return removeAll(state, action);
        case SET_INGR_DETAIL:
            return setIngrDetail(state, action);
        case REMOVE_INGR_DETAIL:
            return removeIngrDetail(state, action);
        case SET_ORDER_NUMBER:
            return setOrderNumber(state, action);
    }
    return state;
};