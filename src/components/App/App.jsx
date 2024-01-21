import React, {useEffect} from "react";
import AppHeader from "../AppHeader/AppHeader";
import MainSection from "../Main/Main";
import Modal from "../Modal/Modal";
import {useModal} from "../../hooks/useModal";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [ingredients, setIngredients] = React.useState([]);
    const [isDataGot, setIsDataGot] = React.useState(false);
    const modal = useModal();

    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error ${res.status}`);
            })
            .then((res) => {
                if (res.success) {
                    setIsDataGot(true);
                    setIngredients(res.data);
                } else {
                    return Promise.reject(`Data error`);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <AppHeader/>
            {isDataGot && (<MainSection ingredients={ingredients} modal={modal}/>)}
            {isDataGot && modal.getIsOpen && (<Modal title={modal.getTitle} modal={modal}></Modal>)}
        </>
    );
}

export default App;
