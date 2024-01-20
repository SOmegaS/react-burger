import React, {useCallback, useEffect, useState} from "react";
import AppHeader from "../AppHeader/AppHeader";
import MainSection from "../Main/Main";
import Modal from "../Modal/Modal";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [ingredients, setIngredients] = React.useState([]);
    const [isDataGot, setIsDataGot] = React.useState(false);
    const modal = CreateModal();

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

function CreateModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(<></>);

    const open = useCallback((header, content) => {
        setIsOpen(true);
        setContent(content);
        setTitle(header);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        getIsOpen: isOpen,
        getContent: content,
        getTitle: title,
        open,
        close,
    };
}

export default App;
