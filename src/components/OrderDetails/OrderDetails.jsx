import orderStyles from './OrderDetails.module.css';
import done from '../../images/done.svg';

export default function OrderDetails(props) {
    return (
        <>
            <h2 className={`text text_type_digits-large mt-30`}>034536</h2>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <img src={done} alt='иконка' className='mt-15 mb-15'></img>
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}