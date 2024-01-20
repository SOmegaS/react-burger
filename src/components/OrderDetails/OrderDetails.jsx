import React from "react";
import styles from './OrderDetails.module.css';

import doneImagePath from '../../images/done.svg';

function OrderDetails() {
    return (
        <div className={styles.details}>
            <p className={styles.number + ' text text_type_digits-large mt-4'}>034536</p>

            <span className='text text_type_main-medium mt-8 mb-15'>идентификатор заказа</span>

            <img src={doneImagePath} alt='заказ принят'/>

            <p className='text text_type_main-default mt-15 mb-2'>Ваш заказ начали готовить</p>

            <span className={styles.text_bottom + ' text text_type_main-default mb-15'}>Дождитесь готовности на орбитальной станции</span>
        </div>
    );
}

export default OrderDetails;
