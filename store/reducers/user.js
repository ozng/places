import User from "../../models/User";
import { ADD_USER, SET_USER_DATA, LOGIN, LOGOUT, UPDATE_USER_DATA, ADD_TO_FAVORITE, DELETE_TO_FAVORITE, SET_FAVORITES } from "../actions/user";

const initialState = {
    user: [],
    userFavorites: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                user: state.user.concat(action.payload)
            }
        case ADD_USER:
            return {
                user: state.user.concat(action.payload)
            }
        case LOGIN:
            return {
                user: state.user.concat(action.payload)
            }
        case LOGOUT:
            return {
                user: []
            }
        case UPDATE_USER_DATA:
            const userID = action.payload.userId
            const userState = state.user;
            const userIndex = state.user.findIndex(user => user.id === userID)
            const updatedUserInfo = new User(
                userState[userIndex].id,
                userState[userIndex].email,
                action.payload.avatar,
                action.payload.nick,
            )

            const updateUser = [...state.user];
            updateUser[userIndex] = updatedUserInfo

            return {
                ...state,
                user: updateUser
            }
        case ADD_TO_FAVORITE:
            return {
                ...state,
                userFavorites: state.userFavorites.concat(action.payload)
            }
        case DELETE_TO_FAVORITE:
            return {
                ...state,
                userFavorites: state.userFavorites.filter(fav => fav.id !== action.payload)
            }
        case SET_FAVORITES:
            return {
                ...state,
                userFavorites: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;