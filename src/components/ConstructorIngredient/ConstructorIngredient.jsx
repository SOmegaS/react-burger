import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {REMOVE_INGR, DRAG_INGR} from "../../services/actions";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ConstructorIngredient.module.css";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from 'prop-types';

const ConstructorIngredient = ({elem, index}) => {
    const dispatch = useDispatch();

    const moveItem = (dragIndex, hoverIndex) => {
        dispatch({
            type: DRAG_INGR,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        });
    }

    const [{isDrag}, drag] = useDrag({
        type: 'constructorElement',
        item: {elem, index},
        collect: (mon) => ({
            isDrag: mon.isDragging(),
        }),
    });
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: 'constructorElement',
        hover: (elem, mon) => {
            console.log("AAAAAAAAAAAAAAAAAA");
            const rect = ref.current?.getBoundingClientRect();
            const center = (rect.bottom - rect.top) / 2;
            const client = mon.getClientOffset().y - rect.top;
            console.log(elem.ind);
            if ((elem.ind > index && client < center) || (elem.ind < index && client > center)) {
                moveItem(elem.ind, index);
                elem.ind = index;
            }
        },
    });
    drag(drop(ref));
    const opasity = isDrag ? 0.5 : 1;
    return !isDrag && (
        <li ref={ref} className={styles.middle_item} key={elem.currentId} style={{opasity}}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image}
                handleClose={() => {
                    dispatch({
                        type: REMOVE_INGR,
                        item: elem,
                    });
                }}
            />
        </li>
    );
}

ConstructorIngredient.propTypes = {
    elem: PropTypes.object,
    index: PropTypes.number,
}

export default ConstructorIngredient;
