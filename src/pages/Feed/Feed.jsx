import styles from './Feed.module.css';

export default function Feed() {
    const wsConnect = false;
    const wsFailed = false;

    return (
        <>
            {wsConnect && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Загрузка...</h1>}
            {wsFailed && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Произошла ошибка...</h1>}
            {!wsConnect && !wsFailed &&
                <main className={`${styles.main} pb-10`}>
                    <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
                    <section className={styles.feed}>
                    </section>
                    <section className={styles.info}>
                    </section>
                </main>
            }
        </>
    )
}