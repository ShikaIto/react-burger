export type TIngredient = {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    __v: number,
    _id: string,
    id: string,
    count: number
}

export type TOrder = {
    _id: string,
    ingredients: string[],
    name: string,
    number: number,
    owner: string,
    status: string,
    updateAt: string,
    __v: number,
    createdAt: string
}

export type TUser = {
    email: string,
    name: string
}