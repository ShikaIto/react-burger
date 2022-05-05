import orderStyles from './OrderDetails.module.css';
import done from '../../images/done.svg';
import { useSelector } from 'react-redux';

export default function OrderDetails() {
    const { order, orderRequest, orderFailed } = useSelector(store => store);
    return (
        <>
            <h3 className={!orderFailed && !orderRequest ? `text text_type_digits-large mt-30` : 'text text_type_main-medium mt-30'}>
                {orderRequest ? 'Загрузка...' : orderFailed ? 'Произошла ошибка...' : order}
            </h3>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <img src={done} alt='иконка' className='mt-15 mb-15'></img>
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}