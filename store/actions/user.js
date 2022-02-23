import User from '../../models/User'
import Place from '../../models/Place'
import { auth, storage } from '../../firebase'

export const ADD_USER = "ADD_USER";
export const SET_USER_DATA = "SET_USER_DATA";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const DELETE_TO_FAVORITE = "DELETE_TO_FAVORITE";
export const SET_FAVORITES = "SET_FAVORITES";


export const setUser = () => {
    return async dispatch => {
        const currentUserData = auth.currentUser;

        const userData = new User(
            currentUserData.uid,
            currentUserData.email,
            currentUserData.photoURL,
            currentUserData.displayName
        )


        dispatch({ type: SET_USER_DATA, payload: userData })
    }
}

export const loginHandler = (email, password) => {
    return async dispatch => {
        try {
            const response = await auth.signInWithEmailAndPassword(email, password)
            const userData = await response.user;

            const loggedUser = new User(
                userData.uid,
                userData.email,
                userData.photoURL,
                userData.displayName
            )

            dispatch({ type: LOGIN, payload: loggedUser })
        }
        catch (err) {
            console.log(err.message)
            switch (err.message) {
                case "There is no user record corresponding to this identifier. The user may have been deleted.":
                    throw new Error("Geçersiz bir email adresi girdiniz.")
                case "The password is invalid or the user does not have a password.":
                    throw new Error("Geçersiz parola girildi.")
                case "The email address is badly formatted.":
                    throw new Error("Geçerli formatta bir email adresi girilmedi.")
                default:
                    throw new Error("Birşeyler yanlış gitti.")
            }
        }
    }
}

export const createUser = (email, password) => {
    return async dispatch => {
        try {
            const response = await auth.createUserWithEmailAndPassword(email, password)
            const userData = await response.user

            // Kullanıcı bilgilerinin yedeğini db içerisine alıyoruz.
            await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userData.uid,
                    email: userData.email,
                    photoURL: userData.photoURL,
                    displayName: userData.displayName,
                })
            })
            const newUser = new User(
                userData.uid,
                userData.email,
                userData.photoURL,
                userData.displayName
            )
            dispatch({ type: ADD_USER, payload: newUser })
        } catch (err) {
            console.log(err.message)
            switch (err.message) {
                case "The password must be 6 characters long or more.":
                    throw new Error("Parola en az 6 karakter uzunluğunda olmalı.")
                case "The email address is already in use by another account.":
                    throw new Error("Email adresi başka biri tarafından kullanılıyor.")
                case "The email address is badly formatted.":
                    throw new Error("Email adresini doğru girdiğinizden emin olun.")
                default:
                    throw new Error("Birşeyler yanlış gitti!")
            }
        }
    }
}

export const logoutHandler = () => {
    return async dispatch => {
        await auth.signOut()
        dispatch({ type: LOGOUT })
    }
}

export const updateUserHandler = (nick, avatar, oldAvatar, userId) => {
    return async dispatch => {
        await auth.currentUser.updateProfile({
            displayName: nick,
            photoURL: avatar,
        })

        const userResData = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users.json`)

        const userRes = await userResData.json();

        const keys = [];

        for (const key in userRes) {
            keys.push({
                id: key,
                ownerId: userRes[key].userId,
            })
        }

        const data = await keys.filter(key => key.ownerId === userId)

        await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users/${data[0].id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                photoURL: avatar,
                displayName: nick,
            })
        })

        if (oldAvatar) {
            let imageRef = storage.refFromURL(oldAvatar);
            imageRef.delete().then(() => {
                console.log("Old Avatar Deleted")
            }).catch(err => console.log(err))
        } else {
            console.log('Eski avatar yok')
        }

        dispatch({ type: UPDATE_USER_DATA, payload: { nick, avatar, userId } })
    }
}

export const addToFav = (place) => {
    return async dispatch => {
        const currentUserId = await auth.currentUser.uid;

        const userResData = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users.json`)

        const userRes = await userResData.json();

        const keys = [];

        for (const key in userRes) {
            keys.push({
                id: key,
                ownerId: userRes[key].userId,
            })
        }

        const data = await keys.filter(key => key.ownerId === currentUserId)

        const userUrl = `https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users/${data[0].id}.json`

        const oldFav = await fetch(userUrl)
        const oldFavJson = await oldFav.json()
        const existinceFav = await oldFavJson.userFavorites

        let favArr = [];

        if (existinceFav) {
            favArr = existinceFav
        }

        favArr.push(place.id)

        await fetch(userUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userFavorites: favArr,
            })
        })

        dispatch({ type: ADD_TO_FAVORITE, payload: place })
    }
}

export const deleteToFav = (placeId) => {
    return async dispatch => {
        const currentUserId = await auth.currentUser.uid;

        const userResData = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users.json`)

        const userRes = await userResData.json();

        const keys = [];

        for (const key in userRes) {
            keys.push({
                id: key,
                ownerId: userRes[key].userId,
            })
        }

        const data = await keys.filter(key => key.ownerId === currentUserId)

        const userUrl = `https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users/${data[0].id}.json`

        const oldFav = await fetch(userUrl)
        const oldFavJson = await oldFav.json()
        const existinceFav = await oldFavJson.userFavorites

        const index = existinceFav.filter(fav => fav !== placeId)

        await fetch(userUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userFavorites: index,
            })
        })

        dispatch({ type: DELETE_TO_FAVORITE, payload: placeId })
    }
}

export const setFav = () => {
    return async dispatch => {
        const currentUserId = await auth.currentUser.uid;
        const userResData = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users.json`)

        const userRes = await userResData.json();

        const keys = [];

        for (const key in userRes) {
            keys.push({
                id: key,
                ownerId: userRes[key].userId,
            })
        }

        const data = await keys.filter(key => key.ownerId === currentUserId)

        const userUrl = `https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users/${data[0].id}.json`

        const oldFav = await fetch(userUrl)
        const oldFavJson = await oldFav.json()
        const userFavArray = await oldFavJson.userFavorites;

        const allPlaces = await fetch('https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/places.json')
        const allPlacesJson = await allPlaces.json();
        const allPlacesArr = [];

        for (const key in allPlacesJson) {
            allPlacesArr.push(new Place(
                key,
                allPlacesJson[key].ownerId,
                allPlacesJson[key].address.address,
                allPlacesJson[key].address.city,
                allPlacesJson[key].address.district,
                allPlacesJson[key].address.coordinates.lat,
                allPlacesJson[key].address.coordinates.lng,
                allPlacesJson[key].star,
                [],
                allPlacesJson[key].title,
                allPlacesJson[key].description,
                allPlacesJson[key].imageUrl,
                allPlacesJson[key].date,
                [],
            ))
        }

        let filteredData = []

        for (const key in userFavArray) {
            filteredData.push(allPlacesArr.find(place => place.id === userFavArray[key]))
        }

        dispatch({ type: SET_FAVORITES, payload: filteredData })
    }
}
