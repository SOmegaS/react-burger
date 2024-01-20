import React from "react";
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from "../Ingredient/Ingredient";
import styles from './BurgerIngredients.module.css';

function BurgerIngredients({ingredients, modal}) {
    const [current, setCurrent] = React.useState('bun')

    const bunArray = ingredients.filter((item) => item.type === 'bun');
    const sauceArray = ingredients.filter((item) => item.type === 'sauce');
    const mainArray = ingredients.filter((item) => item.type === 'main');

    return (
        <section className={styles.section}>
            <p className="text text_type_main-large pt-8 pb-5">Соберите бургер</p>

            <div className={styles.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
            </div>

            <div className={styles.scrollbar}>
                <p className="text text_type_main-medium pt-10 pb-6">Булки</p>
                <div className={styles.choose_block}>
                    {
                        bunArray.map((elem) => {
                            return <BurgerIngredient ingredient={elem} key={elem._id} modal={modal}/>;
                        })
                    }
                </div>

                <p className="text text_type_main-medium pt-10 pb-6">Соусы</p>
                <div className={styles.choose_block}>
                    {
                        sauceArray.map((elem) => {
                            return <BurgerIngredient ingredient={elem} key={elem._id} modal={modal}/>;
                        })
                    }
                </div>

                <p className="text text_type_main-medium pt-10 pb-6">Начинки</p>
                <div className={styles.choose_block}>
                    {
                        mainArray.map((elem) => {
                            return <BurgerIngredient ingredient={elem} key={elem._id} modal={modal}/>;
                        })
                    }
                </div>
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.array,
    modal: PropTypes.element,
}

export default BurgerIngredients;
