import React from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from '../common.module.css';
import styles from './Profile.module.css';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../services/actions/profile";
import { updeteUser } from "../../services/actions/profile";

export default function Profile() {
    const nameInputRef = React.useRef(null);
    const emailInputRef = React.useRef(null);
    const passwordInputRef = React.useRef(null);

    const { user } = useSelector(store => store.profile);

    const dispatch = useDispatch();

    const active = { disabled: false, icon: 'CloseIcon' };
    const inactive = { disabled: true, icon: 'EditIcon' };

    const [inputs, setInputs] = React.useState({ name: inactive, email: inactive, password: inactive });
    const [form, setValue] = React.useState({ ...user, password: '' });
    const [disabledForm, setDisabledForm] = React.useState(true);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    const handleClick = () => {
        dispatch(logout(localStorage.getItem('token')));
    }

    const onIconClick = inputRef => {
        setDisabledForm(false);
        setInputs({ ...inputs, [inputRef.current.name]: active });
    }

    const onBlur = e => {
        setInputs({ ...inputs, [e.target.name]: inactive });
    }

    const handleReset = e => {
        e.preventDefault();
        setValue({ ...user, password: '' });
        setDisabledForm(true);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (form.password === '') {
            dispatch(updeteUser({ name: form.name, email: form.email }));
        } else {
            dispatch(updeteUser(form));
        }
        setDisabledForm(true);
    }

    return (
        <main className={styles.main}>
            <div className={styles.links}>
                <NavLink
                    to='/profile'
                    className={({ isActive }) =>
                        isActive ? `${styles.activeLink} text text_type_main-medium mb-9`
                            : `${styles.link} text text_type_main-medium mb-9`}>
                    Профиль
                </NavLink>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        isActive ? `${styles.activeLink} text text_type_main-medium mb-9`
                            : `${styles.link} text text_type_main-medium mb-9`}>
                    История заказов
                </NavLink>
                <a className={`${styles.link} text text_type_main-medium mb-9`} onClick={handleClick}>
                    Выход
                </a>
                <p className={`${styles.text} text text_type_main-default text_color_inactive mr-15 mt-20`}>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={commonStyles.input}>
                    <Input type='text'
                        name='name'
                        placeholder='Имя'
                        value={form.name}
                        icon={inputs.name.icon}
                        size="default"
                        disabled={inputs.name.disabled}
                        onChange={onChange}
                        onIconClick={() => { onIconClick(nameInputRef) }}
                        ref={nameInputRef}
                        onBlur={onBlur} />
                </div>
                <div className={commonStyles.input}>
                    <Input type='email'
                        name='email'
                        placeholder='Логин'
                        value={form.email}
                        icon={inputs.email.icon}
                        size="default"
                        disabled={inputs.email.disabled}
                        onChange={onChange}
                        onIconClick={() => { onIconClick(emailInputRef) }}
                        ref={emailInputRef}
                        onBlur={onBlur} />
                </div>
                <div className={commonStyles.input}>
                    <Input type='password'
                        name='password'
                        placeholder='Пароль'
                        value={form.password}
                        icon={inputs.password.icon}
                        size="default"
                        disabled={inputs.password.disabled}
                        onChange={onChange}
                        onIconClick={() => { onIconClick(passwordInputRef) }}
                        ref={passwordInputRef}
                        onBlur={onBlur} />
                </div>
                {!disabledForm && <div className={`${styles.buttons}`}>
                    <Button type="secondary" size="medium" onClick={handleReset}>
                        Отмена
                    </Button>
                    <Button type="primary" size="medium">Сохранить</Button>
                </div>}
            </form>
        </main>
    )
}