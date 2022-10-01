import styles from './NotFound404.module.css';
import { Link } from 'react-router-dom';
import { FC } from 'react';

const NotFound: FC = () => {
    return (
        <main className={styles.main}>
            <h2 className={`${styles.title} text text_type_digits-large`}>Not Found 404</h2>
            <Link to='/' className={`${styles.link} text text_type_main-medium mt-30`}>
                Вернуться на главную
            </Link>
        </main>
    )
}

export default NotFound