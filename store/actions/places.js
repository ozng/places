import Place from "../../models/Place"
import { auth, storage } from '../../firebase'

export const ADD_PLACE = "ADD_PLACE"
export const UPDATE_PLACE = "UPDATE_PLACE"
export const DELETE_PLACE = "DELETE_PLACE"
export const SET_PLACES = "SET_PLACES"
export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE"

export const GIVE_STAR = "GIVE_STAR"

export const setPlaces = () => {
    return async dispatch => {
        const response = await fetch('https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/places.json')

        const resData = await response.json()

        const userId = await auth.currentUser.uid

        const loadedPlaces = [];

        for (const key in resData) {
            loadedPlaces.push(new Place(
                key,
                resData[key].ownerId,
                resData[key].address.address,
                resData[key].address.city,
                resData[key].address.district,
                resData[key].address.coordinates.lat,
                resData[key].address.coordinates.lng,
                resData[key].star,
                [],
                resData[key].title,
                resData[key].description,
                resData[key].imageUrl,
                resData[key].date,
                resData[key].categoryID,
            ))
        }

        dispatch({
            type: SET_PLACES,
            payload: loadedPlaces,
            myPlaces: loadedPlaces.filter(place => place.ownerId === userId)
        })
    }
}

export const addPlace = (place) => {
    return async dispatch => {
        const response = await fetch('https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/places.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: place.title,
                description: place.description,
                imageUrl: place.imageUrl,
                address: {
                    city: place.city,
                    district: place.district,
                    address: place.address,
                    coordinates: {
                        lat: place.location.latitude,
                        lng: place.location.longitude,
                    }
                },
                ownerId: place.ownerId,
                star: [],
                comments: [],
                categoryId: place.categoryID,
                date: new Date().toString(),
            })
        })

        const resData = await response.json();

        dispatch({
            type: ADD_PLACE, payload: {
                place,
                id: resData.name
            }
        })
    }
}

export const updatePlace = (place) => {
    return async dispatch => {
        await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/places/${place.id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: place.title,
                description: place.description,
                imageUrl: place.imageUrl,
                address: {
                    city: place.city,
                    district: place.district,
                    address: place.address,
                    coordinates: {
                        lat: place.location.latitude,
                        lng: place.location.longitude,
                    }
                },
                ownerId: place.ownerId,
                star: [],
                comments: [],
                categoryId: place.categoryID,
                date: new Date().toString(),
            })
        })

        dispatch({ type: UPDATE_PLACE, payload: place })
    }
}

export const deletePlace = (placeId, imageUrl) => {
    return async dispatch => {
        await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/places/${placeId}.json`, {
            method: 'DELETE',
        })

        let imageRef = storage.refFromURL(imageUrl);
        imageRef.delete().then(() => {
            console.log("Deleted")
        }).catch(err => console.log(err))

        dispatch({ type: DELETE_PLACE, payload: placeId })
    }
}

export const giveStar = (placeId, newPoints) => {
    return async dispatch => {
        await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/places/${placeId}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                star: newPoints
            })
        })

        dispatch({ type: GIVE_STAR, payload: newPoints })
    }
}
