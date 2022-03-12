import { fetchPoints } from './FetchActions'

// Calculate Points
export const calculatePoint = async (id, currentUserId, rate) => {
    const resData = await fetchPoints(id);
    const star = resData.star
    let disableRate = false
    let point
    let totalPointLength
    if (resData && star && resData.star.length > 0) {
        let sayi = 0
        for (let i in star) {
            sayi = sayi + Number(star[i].star)
            if (star[i].ownerId === currentUserId) {
                disableRate = true
            }
        }
        const result = Number(sayi) / star.length
        point = result
        totalPointLength = star.length
    } else {
        point = rate
        totalPointLength = 0
    }

    return {
        totalPointLength,
        disableRate,
        point
    }
}

