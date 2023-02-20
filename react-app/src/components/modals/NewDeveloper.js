import NewDeveloperForm from "../forms/NewDev";
import { FormModal } from "../../context/Modal";
import { useState } from "react";

const NewDevModal = () => {
    const [renderModal, setRenderModal] = useState(false);


    return (
        <>
            <div className='new-dev-btn' onClick={() => setRenderModal(true)}>Become a Dev</div>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <NewDeveloperForm onClose={() => setRenderModal(false)}/>
                </FormModal>
                ) : null
            }
        </>
    )
};

export default NewDevModal;
