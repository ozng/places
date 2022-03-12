
// Fetch points on firebase server
export const fetchPoints = async (id) => {
    const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/places/${id}.json`)
    const resData = await response.json();
    return resData
}

// Fetch owner of the place.

export const fetchOwnerData = async (ownerID) => {
    const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
    const resData = await response.json();
    const placeOwner = []
    for (const key in resData) {
        placeOwner.push({
            id: key,
            userId: resData[key].userId,
            email: resData[key].email,
            photoURL: resData[key].photoURL,
            displayName: resData[key].displayName,
        })
    }
    const userIndex = placeOwner.findIndex(user => user.userId === ownerID)
    return placeOwner[userIndex]
}

// Add star to firebase database

export const addStar = async (placeID, currentUserId, rate) => {
    const resData = await fetchPoints(placeID);
    let pointArr = [];
    if (resData.star && resData?.star.length > 0) {
        pointArr = resData.star.slice(0)
        pointArr.push({
            ownerId: currentUserId,
            star: rate
        })
    } else {
        pointArr.push({
            ownerId: currentUserId,
            star: rate
        })
    }
    return {
        pointArr
    }
}

