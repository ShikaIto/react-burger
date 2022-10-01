import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../common.module.css';
import { Link, Navigate } from "react-router-dom";
import React, { ChangeEvent, SyntheticEvent, FC } from "react";
import { useSelector, useDispatch } from "../../utils/hooks";
import { forgotPassword } from "../../services/actions/profile";

const ForgotPassword: FC = () => {
    const dispatch = useDispatch();
    const forgot = useSelector(store => store.profile.forgot);

    const [form, setValue] = React.useState({ email: '' });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = React.useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(forgotPassword(form));
    }, [dispatch, form]);

    if (forgot) {
        return <Navigate to='/reset-password' replace={true} />
    }

    return (
        <main className={styles.main}>
            <h1 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</h1>
            <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <Input
                        type='email'
                        name="email"
                        placeholder='Укажите e-mail'
                        size="default"
                        onChange={onChange}
                        value={form.email} />
                </div>
                <div>
                    <Button type="primary" size="medium" htmlType="submit">Восстановить</Button>
                </div>
            </form>
            <p className='text text_type_main-default text_color_inactive'>
                Вспомнили пароль?
                <Link to='/login'>
                    <Button type="secondary" size="medium" htmlType="button">
                        Войти
                    </Button>
                </Link>
            </p>
        </main >
    )
}

export default ForgotPassword