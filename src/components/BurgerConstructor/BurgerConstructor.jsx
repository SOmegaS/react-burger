import {Button, CurrencyIcon, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from 'prop-types';
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from './BurgerConstructor.module.css';
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../services/actions/actions";
import {ADD_INGR, REMOVE_INGR} from "../../services/actions";
import {useDrop} from "react-dnd";
import ConstructorIngredient from "../ConstructorIngredient/ConstructorIngredient";

function BurgerConstructor({modal}) {
    const dispatch = useDispatch();
    let ingrList = useSelector(store => store.mainReducer.ingredientsConstructorList);

    const onClick = () => {
        dispatch(createOrder(ingrList));
        modal.open('', <OrderDetails/>);
    };

    const onGragNDrop = (item) => {
        if (item.type === 'bun') {
            const bun = ingrList.find((elem) => elem.type === 'bun');
            console.log(ingrList);
            console.log(bun);
            if (bun) {
                dispatch({
                    type: REMOVE_INGR,
                    item: bun,
                });
            }
        }
        dispatch({
            type: ADD_INGR,
            item: item,
            id: Date.now(),
        });
    };

    const [, dropTarget] = useDrop({
        accept: 'constructorItem',
        drop(item) {
            onGragNDrop(item);
        },
    });

    const bun = (ingrList.find((elem) => elem.type === 'bun'));
    // let bun = ingrList[0];
    const ingrs = ingrList.filter((elem) => {
        return elem.type !== "bun"
    });
    let price = 0;
    if (bun) {
        price = 2 * bun.price;
    }

    return (
        <section ref={dropTarget} className={styles.section}>
            <div className={styles.elements}>
                {bun && <div className={styles.border_item}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>}

                <ul className={styles.scrollbar}>
                    {
                        ingrs.map((elem, i) => {
                            price += parseInt(elem.price);
                            return <ConstructorIngredient elem={elem} index={i} key={elem.currentId}/>;
                        })
                    }
                </ul>

                {bun && <div className={styles.border_item}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + " (низ)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>}
            </div>

            <div className={styles.bottom}>
                <div className={styles.price_section}>
                    <span className="text text_type_digits-medium">{price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" onClick={onClick} disabled={price === 0} size="medium" type="primary">Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    modal: PropTypes.object,
}

export default BurgerConstructor;
