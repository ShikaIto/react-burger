import React, { ChangeEvent, SyntheticEvent } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../common.module.css';
import { Link } from "react-router-dom";
import { useDispatch } from "../../utils/hooks";
import { login } from "../../services/actions/profile";

export default function Login() {
    const dispatch = useDispatch();

    const [form, setValue] = React.useState({ email: '', password: '' });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = React.useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(form, 'login'))
    }, [dispatch, form]);


    return (
        <main className={styles.main}>
            <h1 className={`${styles.title} text text_type_main-medium mb-6`}>Вход</h1>
            <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <Input type='email'
                        name="email"
                        onChange={onChange}
                        placeholder='E-mail'
                        size="default"
                        value={form.email} />
                </div>
                <div className={styles.input}>
                    <Input
                        type='password'
                        name="password"
                        onChange={onChange}
                        placeholder='Пароль'
                        icon='ShowIcon'
                        size="default"
                        value={form.password} />
                </div>
                <div>
                    <Button type="primary" size="medium" htmlType="submit">Войти</Button>
                </div>
            </form>
            <p className='text text_type_main-default text_color_inactive'>
                Вы - новый пользователь?
                <Link to='/register'>
                    <Button type="secondary" size="medium" htmlType="button">
                        Зарегистрироваться
                    </Button>
                </Link>
            </p>
            <p className='text text_type_main-default text_color_inactive'>
                Забыли пароль?
                <Link to='/forgot-password'>
                    <Button type="secondary" size="medium" htmlType="button">
                        Восстановить пароль
                    </Button>
                </Link>
            </p>
        </main >
    )
}