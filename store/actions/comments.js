import Comment from '../../models/Comment'

export const ADD_COMMENT = "ADD_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const SET_COMMENTS = "SET_COMMENTS"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const UP_VOTE = "UP_VOTE"
export const DOWN_VOTE = "DOWN_VOTE"
export const SET_PLACE_COMMENT = "SET_PLACE_COMMENT"

export const fetchComments = () => {
    return async dispatch => {
        const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/comments.json`);

        const resData = await response.json();

        const loadedComments = []

        const fetchUser = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
        const userData = await fetchUser.json();
        const allUsers = []
        for (const key in userData) {
            allUsers.push({
                id: key,
                userId: userData[key].userId,
                photoURL: userData[key].photoURL,
                displayName: userData[key].displayName
            })
        }

        for (const key in resData) {
            const displayName = await allUsers.find(user => user.userId === resData[key].ownerId).displayName
            const photo = await allUsers.find(user => user.userId === resData[key].ownerId).photoURL
            loadedComments.push(new Comment(
                key,
                resData[key].ownerId,
                await photo,
                await displayName,
                resData[key].placeId,
                resData[key].content,
                resData[key].date,
                resData[key].upVote,
                resData[key].downVote,
            ))
        }


        dispatch({ type: SET_COMMENTS, payload: loadedComments })
    }
}

export const fetchPlaceComments = placeID => {
    return async dispatch => {
        dispatch({ type: SET_PLACE_COMMENT, payload: placeID })
    }
}

export const addComment = (comment) => {
    return async dispatch => {

        const monts = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",]

        const d = new Date();
        const dayOfAMonth = d.getDate();
        const month = monts[d.getMonth()]
        const year = d.getFullYear()
        const hour = d.getHours()
        const minutes = d.getMinutes()
        const fullDate = `${dayOfAMonth}.${month}.${year} ${hour}:${minutes}`

        const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/comments.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: comment.ownerId,
                placeId: comment.placeId,
                content: comment.content,
                date: fullDate,
            })
        })

        const resData = await response.json()

        dispatch({
            type: ADD_COMMENT, payload: {
                id: resData.name,
                comment: comment,
                date: fullDate
            }
        })
    }
}

export const updateComment = (commentId, newComment) => {
    return async dispatch => {
        await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentId}.json`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newComment
            })
        })

        dispatch({
            type: UPDATE_COMMENT, payload: {
                commentId,
                newComment
            }
        })
    }
}

export const deleteComment = commentId => {
    return async dispatch => {
        await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentId}.json`, {
            method: 'DELETE'
        })

        dispatch({ type: DELETE_COMMENT, payload: commentId })
    }
}

// const isVoted = async (commentID, userID, type) => {
//     const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentID}.json`)
//     const resData = await response.json();

//     switch (type) {
//         case "upVote":
//             if (!resData.downVote || resData.downVote?.findIndex(c => c === userID) < 0) {
//                 return false;
//             } else {
//                 return true;
//             }
//         case "downVote":
//             if (!resData.upVote || resData.upVote?.findIndex(c => c === userID) < 0) {
//                 return false;
//             } else {
//                 return true;
//             }
//     }
// }

export const upVote = (commentID, userID) => {
    return async dispatch => {
        const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentID}.json`)
        const resData = await response.json();

        let likedUserId = []
        let unLikedUserId = []

        unLikedUserId = resData.downVote?.slice(0)
        const unLikeUserIDIndex = resData.downVote?.findIndex(c => c === userID)

        if (resData.upVote && resData?.upVote.length > 0) {
            const userIDIndex = resData?.upVote.findIndex(c => c === userID)
            likedUserId = resData.upVote.slice(0)
            if (userIDIndex >= 0) {
                likedUserId.splice(userIDIndex, 1)
            } else {
                likedUserId.push(userID)
            }
        } else {
            likedUserId.push(userID)
        }

        // const isDownVoted = await isVoted(commentID, userID, "upVote");
        if (unLikeUserIDIndex >= 0) {
            unLikedUserId.splice(unLikeUserIDIndex, 1)
        }

        await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentID}.json`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                upVote: likedUserId,
                downVote: unLikedUserId
            })
        })

        dispatch({
            type: UP_VOTE, payload: {
                commentID,
                likedUserId,
                unLikedUserId
            }
        })
    }
}

export const downVote = (commentID, userID) => {
    return async dispatch => {
        const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentID}.json`)
        const resData = await response.json();

        let likedUserId = []
        let unLikedUserID = []

        likedUserId = resData.upVote?.slice(0)
        const likedUserIDIndex = resData.upVote?.findIndex(c => c === userID)

        if (resData.downVote && resData?.downVote.length > 0) {
            const userIDIndex = resData?.downVote.findIndex(c => c === userID)
            unLikedUserID = resData.downVote.slice(0)
            if (userIDIndex >= 0) {
                unLikedUserID.splice(userIDIndex, 1)
            } else {
                unLikedUserID.push(userID)
            }
        } else {
            unLikedUserID.push(userID)
        }

        if (likedUserIDIndex >= 0) {
            likedUserId.splice(likedUserIDIndex, 1)
        }

        await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentID}.json`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                upVote: likedUserId,
                downVote: unLikedUserID
            })
        })

        dispatch({
            type: DOWN_VOTE, payload: {
                commentID,
                unLikedUserID,
                likedUserId
            }
        })
    }
}