import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ title, onClose, children }) {

    const navigate = useNavigate();

    const close = React.useCallback(() => {
        if (onClose) {
            onClose(false);
        } else {
            navigate(-1);
        }
    }, [onClose]);

    const closeEsc = React.useCallback((e) => {
        if (e.key === 'Escape') {
            close();
        }
    }, [close])

    React.useEffect(() => {
        document.addEventListener('keydown', closeEsc);

        return () => {
            document.removeEventListener('keydown', closeEsc);
        }
    }, [closeEsc]);

    return ReactDOM.createPortal(
        (
            <>
                <div className={modalStyles.container}>
                    <div className={modalStyles.modal}>
                        <span className={modalStyles.close} onClick={close}>
                            <CloseIcon type='primary' />
                        </span>
                        {title &&
                            <h2 className={`text text_type_main-large mt-10 ${modalStyles.title}`}>{title}</h2>}
                        {children}
                    </div>
                    <ModalOverlay close={close} />
                </div>
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func
}