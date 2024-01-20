import React from "react";
import PropTypes from 'prop-types';
import BurgerIngredients from "../BurgerIngregients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from './Main.module.css';

function Main({ingredients, modal}) {
    return (
        <main className={styles.section}>
            <BurgerIngredients ingredients={ingredients} modal={modal}/>
            <BurgerConstructor ingredients={ingredients} modal={modal}/>
        </main>
    );
}

Main.propTypes = {
    ingredients: PropTypes.array,
    modal: PropTypes.element,
}

export default Main;
