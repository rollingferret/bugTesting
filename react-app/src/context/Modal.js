import { createContext, useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './Modal.css';

const FormModalContext = createContext();

const ModalProvider = ({children}) => {
    const formRef = useRef();
    const [ value, setValue ] = useState(null);

    useEffect(() => {
        setValue(formRef.current);
    }, [])

    return (
        <>
            <FormModalContext.Provider value={value}>
                {children}
            </FormModalContext.Provider>
            <div ref={formRef} />
        </>
    )
};

export const FormModal = ({ onClose, children}) => {
    const formModal = useContext(FormModalContext);
    if (!formModal) return null;

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={onClose}/>
            <div id='modal-content'>
                {children}
            </div>
        </div>,
        formModal
    )
}

export default ModalProvider;
