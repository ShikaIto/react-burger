import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './FeedElement.module.css';
import React, { FC } from "react";
import { useSelector, useDispatch } from "../../utils/hooks";
import { getDate } from "../../utils/utils";
import { SET_CURRENT_ORDER } from "../../services/actions/main";
import { TOrder, TIngredient } from '../../utils/types'

interface IFeedElement {
    data: TOrder,
    profile?: boolean
}

const FeedElement: FC<IFeedElement> = ({ data, profile = false }) => {
    const [dataIngredients, setIngredients] = React.useState<TIngredient[]>([]);
    const [total, setTotal] = React.useState(0);
    const allIngredients = useSelector(store => store.main.ingredients);

    const dispatch = useDispatch();

    const status: { [index: string]: string } = { created: 'Создан', pending: 'Готовится', done: 'Выполнен' };

    React.useEffect(() => {
        if (dataIngredients.length <= 0) {
            const ingredients: any = data.ingredients.map(
                ingredientId =>
                    allIngredients.find(
                        ingredient =>
                            ingredient._id === ingredientId
                    )
            );
            setIngredients(ingredients?.filter((el: TIngredient) => el !== undefined));
        }
        const sum = dataIngredients.reduce((sum, curr) => { return sum + curr.price }, 0);
        setTotal(sum);
    }, [data, dataIngredients]);

    const handleClick = React.useCallback((item: TOrder) => {
        dispatch({ type: SET_CURRENT_ORDER, order: item });
    }, [dispatch]);

    return (
        <li className={`${styles.item} p-6 mb-4`} onClick={() => { handleClick(data) }}>
            <div className={styles.container}>
                <p className="text text_type_digits-default">{`#${data.number}`}</p>
                <p className="text text_type_main-default text_color_inactive">{getDate(data.createdAt)}</p>
            </div>
            <div>
                <h3 className="text text_type_main-medium">{data.name}</h3>
                {profile && <p className='text text_type_main-default mt-2'
                    style={{ color: data.status === 'done' ? '#00cccc' : '#f2f2f3' }}>
                    {status[data.status]}
                </p>}
            </div>
            <div className={styles.container}>
                <ul className={styles.list}>
                    {dataIngredients.map((el, index) => {
                        return (index < 6 && <li
                            key={index}
                            className={styles.list_item}
                            style={{ zIndex: `${dataIngredients.length - index}` }}>
                            <img src={el.image_mobile}
                                alt={el.name}
                                className={styles.image}
                                style={{ opacity: dataIngredients.length > 6 && index === 5 ? 0.6 : 1 }} />
                            {dataIngredients.length > 6 && index === 5 &&
                                <span className={`text text_type_digits-default ${styles.span}`}>
                                    {`+${dataIngredients.length - 6}`}
                                </span>}
                        </li>)
                    }
                    )}
                </ul>
                <div className={styles.total}>
                    <p className="text text_type_digits-default">{total}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </li>
    )
}

export default FeedElement