import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import overlayStyles from './ModalOverlay.module.css';
import Modal from '../Modal/Modal.jsx';
import { menuItemPropTypes } from '../../utils/constants.js';

const modalRoot = document.getElementById('react-modals');

export default function ModalOverlay(props) {

    const close = (e) => {
        props.setIsModal(false);
    }
    const closeEsc = (e) => {
        if (e.key === 'Escape') {
            close();
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', closeEsc);

        return () => {
            document.removeEventListener('keydown', closeEsc);
        }
    })

    return ReactDOM.createPortal(
        (
            <div className={overlayStyles.overlay} onClick={close}>
                <Modal close={close} ingredient={props.ingredient} order={props.order} />
            </div>
        ),
        modalRoot
    );
}

ModalOverlay.prototypes = {
    setIsModal: PropTypes.func.isRequired,
    order: PropTypes.bool,
    ingredient: menuItemPropTypes
}