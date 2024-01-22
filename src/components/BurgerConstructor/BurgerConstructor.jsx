import {Button, CurrencyIcon, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from 'prop-types';
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from './BurgerConstructor.module.css';

function BurgerConstructor({ingredients, modal}) {
    const onClick = () => {
        modal.open('', <OrderDetails/>);
    };

    let bun = ingredients[0];
    ingredients = ingredients.slice(1).filter((elem) => {
        return elem.type !== "bun"
    });
    let price = 2 * parseInt(bun.price);

    return (
        <section className={styles.section}>
            <div className={styles.elements}>
                <div className={styles.border_item}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>

                <ul className={styles.scrollbar}>
                    {
                        ingredients.map((elem) => {
                            price += parseInt(elem.price);
                            return (
                                <li className={styles.middle_item} key={elem._id}>
                                    <DragIcon type="primary"/>
                                    <ConstructorElement
                                        isLocked={false}
                                        text={elem.name}
                                        price={elem.price}
                                        thumbnail={elem.image}
                                    />
                                </li>
                            );
                        })
                    }
                </ul>

                <div className={styles.border_item}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + " (низ)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.price_section}>
                    <span className="text text_type_digits-medium">{price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" onClick={onClick} size="medium" type="primary">Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.array,
    modal: PropTypes.object,
}

export default BurgerConstructor;
