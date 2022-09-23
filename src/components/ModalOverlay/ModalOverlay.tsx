import { FC } from 'react';
import overlayStyles from './ModalOverlay.module.css';

interface IModalOverlay {
    close: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({ close }) => {

    return (
        <div className={overlayStyles.overlay} onClick={close}>
        </div>
    )
}

export default ModalOverlay