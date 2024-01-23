import React, {useEffect} from "react";
import AppHeader from "../AppHeader/AppHeader";
import MainSection from "../Main/Main";
import Modal from "../Modal/Modal";
import {useModal} from "../../hooks/useModal";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/actions";

function App() {
    const modal = useModal();
    const isDataGot = useSelector(store =>  store.mainReducer.isFetched);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader/>
            {isDataGot && (<MainSection modal={modal}/>)}
            {isDataGot && modal.getIsOpen && (<Modal title={modal.getTitle} modal={modal}></Modal>)}
        </>
    );
}

export default App;
