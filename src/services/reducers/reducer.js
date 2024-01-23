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
import {hover} from "@testing-library/user-event/dist/hover";

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
            return {
                ...state,
                fetchedIngredients: action.data.map((elem) => {
                    return {...elem, counter: 0};
                }),
                isFetched: action.isFetched,
            };
        case ADD_INGR:
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
        case REMOVE_INGR:
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
        case DRAG_INGR:
            // const first = state.ingredientsConstructorList.slice(0, action.dragIndex);
            // const second = state.ingredientsConstructorList.slice(action.dragIndex + 1, action.hoverIndex);
            // const third = [ingr];
            // const fourth = state.ingredientsConstructorList.slice(action.hoverIndex, state.ingredientsConstructorList.length);
            // const ingrList = first.concat(second).concat(third).concat(fourth);
            // console.log(first);
            // .slice(0, action.dragIndex)
            // .concat(state.ingredientsConstructorList.slice(action.dragIndex + 1))
            // .slice(0, action.hoverIndex)
            // .concat(ingr)
            // .concat(state.ingredientsConstructorList.slice(action.hoverIndex));

            const ingrList = state.ingredientsConstructorList.slice();
            const ingr = ingrList[action.dragIndex];
            for (let i = action.dragIndex; i < action.hoverIndex; i += 1) {
                ingrList[i] = ingrList[i + 1];
            }
            ingrList[action.hoverIndex] = ingr;

            return {
                ...state,
                ingredientsConstructorList: ingrList,
            }
        case REMOVE_ALL:
            return {
                ...state,
                fetchedIngredients: state.fetchedIngredients.map((elem) => {
                    return {...elem, counter: 0};
                }),
                ingredientsConstructorList: [],
            };
        case SET_INGR_DETAIL:
            return {...state, currentIngredient: action.item};
        case REMOVE_INGR_DETAIL:
            return {...state, currentIngredient: {}};
        case SET_ORDER_NUMBER:
            return {...state, order: action.number};
    }
    return state;
};
