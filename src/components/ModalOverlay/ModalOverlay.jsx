import PropTypes from 'prop-types';
import overlayStyles from './ModalOverlay.module.css';

export default function ModalOverlay({ close }) {

    return (
        <div className={overlayStyles.overlay} onClick={close}>
        </div>
    )
}

ModalOverlay.propTypes = {
    close: PropTypes.func.isRequired,
}