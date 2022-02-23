import { ADD_PLACE, UPDATE_PLACE, DELETE_PLACE, SET_PLACES } from "../actions/places";
import Place from '../../models/Place'

const initialState = {
    places: [],
    myPlaces: [],
    favPlaces: []
}

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.payload.id,
                action.payload.ownerId,
                action.payload.place.address,
                action.payload.place.city,
                action.payload.place.district,
                action.payload.place.location.latitude,
                action.payload.place.location.longitude,
                3,
                [],
                action.payload.place.title,
                action.payload.place.description,
                action.payload.place.imageUrl,
                new Date().toString(),
                ["c1", "c3"],
            )
            return {
                ...state,
                places: state.places.concat(newPlace)
            }
        case UPDATE_PLACE:
            const placeIndex = state.places.findIndex(
                place => place.id === action.payload.id
            )
            const updatedPlace = new Place(
                action.payload.id,
                action.payload.ownerId,
                action.payload.address,
                action.payload.city,
                action.payload.district,
                action.payload.location.latitude,
                action.payload.location.longitude,
                0,
                [],
                action.payload.title,
                action.payload.description,
                action.payload.imageUrl,
                new Date().toString(),
                [],
            )
            const updatedPlaces = [...state.places];
            updatedPlaces[placeIndex] = updatedPlace;
            return {
                ...state,
                places: updatedPlaces
            }
        case DELETE_PLACE:
            const placeId = action.payload
            return {
                ...state,
                places: state.places.filter(place => place.id !== placeId),
                myPlaces: state.myPlaces.filter(place => place.id !== placeId)
            }
        case SET_PLACES:
            return {
                places: action.payload,
                myPlaces: action.myPlaces
            }
        default:
            return state;
    }
}

export default placesReducer