import React from "react";
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from "../Ingredient/Ingredient";
import styles from './BurgerIngredients.module.css';
import {useSelector} from "react-redux";

function BurgerIngredients({modal}) {
    const [current, setCurrent] = React.useState('bun')

    const ingrList = useSelector(store => store.mainReducer.fetchedIngredients);
    const bunArray = ingrList.filter((item) => item.type === 'bun');
    const sauceArray = ingrList.filter((item) => item.type === 'sauce');
    const mainArray = ingrList.filter((item) => item.type === 'main');

    const scrollWindow = document.getElementById('scroll_window');
    const buns = document.getElementById('bun');
    const sauces = document.getElementById('sauce');
    const onScroll = (event) => {
        const distBuns = scrollWindow.getBoundingClientRect().top - buns.getBoundingClientRect().top;
        const distSauces = scrollWindow.getBoundingClientRect().top - sauces.getBoundingClientRect().top;
        if (0 < distBuns) {
            setCurrent("bun");
            return;
        }
        if (0 < distSauces) {
            setCurrent("sauce");
            return;
        }
        setCurrent("main");
    }

    return (
        <section className={styles.section}>
            <p className="text text_type_main-large pt-8 pb-5">Соберите бургер</p>

            <div className={styles.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
            </div>

            <div className={styles.scrollbar} onScroll={onScroll} id="scroll_window">
                <p className="text text_type_main-medium pt-10 pb-6" id="bun">Булки</p>
                <div className={styles.choose_block}>
                    {
                        bunArray.map((elem) => {
                            return <BurgerIngredient ingredient={elem} key={elem._id} modal={modal}/>;
                        })
                    }
                </div>

                <p className="text text_type_main-medium pt-10 pb-6" id="sauce">Соусы</p>
                <div className={styles.choose_block}>
                    {
                        sauceArray.map((elem) => {
                            return <BurgerIngredient ingredient={elem} key={elem._id} modal={modal}/>;
                        })
                    }
                </div>

                <p className="text text_type_main-medium pt-10 pb-6" id="main">Начинки</p>
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
    modal: PropTypes.object,
}

export default BurgerIngredients;
