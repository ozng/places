import Categories from '../../models/Categories'
import { FETCH_CATEGORY } from '../actions/categories';

const initialState = {
    categories: []
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY:
            const allCategories = []
            const resData = action.payload;

            for (const key in resData) {
                allCategories.push(new Categories(
                    key,
                    resData[key].id,
                    resData[key].name,
                    resData[key].icon,
                    resData[key].iconType
                ))
            }
            return {
                ...state,
                categories: allCategories
            }
        default: {
            return state;
        }
    }
}

export default categoryReducer;