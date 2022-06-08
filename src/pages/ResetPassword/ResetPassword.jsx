import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../common.module.css';
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions/profile";
import React from "react";

export default function ResetPassword() {
    const dispatch = useDispatch();
    const { forgot, reset } = useSelector(store => store.profile);

    const [form, setValue] = React.useState({ password: '', token: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = React.useCallback(e => {
        e.preventDefault();
        dispatch(resetPassword(form));
    }, [dispatch, form]);

    if (reset) {
        return <Navigate to='/login' replace={true} />
    } else if (!forgot) {
        return <Navigate to='/forgot-password' replace={true} />
    }

    return (
        <main className={styles.main}>
            <h1 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</h1>
            <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <Input type='password'
                        name="password"
                        placeholder='Введите новый пароль'
                        icon='ShowIcon'
                        size="default"
                        onChange={onChange}
                        value={form.password} />
                </div>
                <div className={styles.input}>
                    <Input type='text'
                        name="token"
                        placeholder='Введите код из письма'
                        size="default"
                        onChange={onChange}
                        value={form.token} />
                </div>
                <div>
                    <Button type="primary" size="medium">Сохранить</Button>
                </div>
            </form>
            <p className='text text_type_main-default text_color_inactive'>
                Вспомнили пароль?
                <Link to='/login'>
                    <Button type="secondary" size="medium">
                        Войти
                    </Button>
                </Link>
            </p>
        </main >
    )
}