
// Fetch points on firebase server
export const fetchPoints = async (id) => {
    const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/places/${id}.json`)
    const resData = await response.json();
    return resData
}