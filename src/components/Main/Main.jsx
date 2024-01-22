import React from "react";
import PropTypes from 'prop-types';
import BurgerIngredients from "../BurgerIngregients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from './Main.module.css';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function Main({ingredients, modal}) {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.section}>
                <BurgerIngredients ingredients={ingredients} modal={modal}/>
                <BurgerConstructor ingredients={ingredients} modal={modal}/>
            </main>
        </DndProvider>
    );
}

Main.propTypes = {
    modal: PropTypes.object,
}

export default Main;
