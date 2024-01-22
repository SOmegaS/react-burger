import React from "react";
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from './Ingredient.module.css';
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";
import {SET_INGR_DETAIL} from "../../services/actions";

const Ingredient = ({ingredient, modal}) => {
    const dispatch = useDispatch();

    const [{isDrag}, ref] = useDrag({
        type: 'constructorItem',
        item: ingredient,
        collect: mon => ({
            isDrag: mon.isDragging(),
        }),
    });

    const onCLick = () => {
        dispatch({
            type: SET_INGR_DETAIL,
            item: ingredient,
        })
        modal.open('Детали ингредиента', <IngredientDetails ingredient={ingredient}/>);
    };

    return !isDrag && (
        <div ref={ref} className={styles.ingredient} onClick={onCLick}>
            {ingredient.counter !== 0 && <Counter count={ingredient.counter} size="default"/>}

            <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>

            <div className={styles.price}>
                <p className="text text_type_digits-default pr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>

            <p className="text text_type_main-default">{ingredient.name}</p>
        </div>
    );
}

Ingredient.propTypes = {
    modal: PropTypes.object,
}

export default Ingredient;
