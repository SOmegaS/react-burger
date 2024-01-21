import React, {useCallback, useState} from "react";

export function useModal() {
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
