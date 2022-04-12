import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';

const modalRoot = document.getElementById('react-modals');

export default function Modal(props) {
    const close = React.useCallback((e) => {
        props.onClose(false);
    }, [props.onClose])
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
    }, []);

    return ReactDOM.createPortal(
        (
            <>
                <div className={modalStyles.container}>
                    <div className={modalStyles.modal}>
                        <span className={modalStyles.close} onClick={close}>
                            <CloseIcon type='primary' />
                        </span>
                        {props.title &&
                            <h2 className={`text text_type_main-large mt-10 ${modalStyles.title}`}>{props.title}</h2>}
                        {props.children}
                    </div>
                    <ModalOverlay close={close} />
                </div>
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.element.isRequired
}