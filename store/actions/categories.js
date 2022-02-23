export const FETCH_CATEGORY = "FETCH_CATEGORY"

export const fetchCategories = () => {
    return async dispatch => {
        const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/categories.json`)

        const resData = await response.json();

        dispatch({ type: FETCH_CATEGORY, payload: resData })
    }
}