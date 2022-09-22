import overlayStyles from './ModalOverlay.module.css';

interface IModalOverlay {
    close: () => void
}

export default function ModalOverlay({ close }: IModalOverlay) {

    return (
        <div className={overlayStyles.overlay} onClick={close}>
        </div>
    )
}