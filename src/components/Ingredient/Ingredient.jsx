import React from "react";
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from './Ingredient.module.css';

const Ingredient = ({ingredient, modal}) => {
    const onCLick = () => {
        modal.open('Детали ингредиента', <IngredientDetails ingredient={ingredient}/>);
    };

    return (
        <div className={styles.ingredient} onClick={onCLick}>
            <Counter count={1} size="default"/>

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
    ingredients: PropTypes.array,
    modal: PropTypes.element,
}

export default Ingredient;
