import { ADD_COMMENT, DELETE_COMMENT, DOWN_VOTE, SET_COMMENTS, SET_PLACE_COMMENT, UPDATE_COMMENT, UP_VOTE } from "../actions/comments"
import Comment from "../../models/Comment"
import { auth } from "../../firebase"

const initialState = {
    comments: [],
    myComments: [],
    placeComments: []
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            const currentUserID = auth.currentUser.uid
            return {
                ...state,
                comments: action.payload,
                myComments: action.payload.filter(comment => comment.ownerId === currentUserID)
            }
        case ADD_COMMENT:
            const newComment = new Comment(
                action.payload.id,
                action.payload.comment.ownerId,
                auth.currentUser.photoURL,
                auth.currentUser.displayName,
                action.payload.comment.placeId,
                action.payload.comment.content,
                action.payload.date,
            )
            return {
                ...state,
                comments: state.comments.concat(newComment),
                myComments: state.myComments.concat(newComment),
                placeComments: state.placeComments.concat(newComment)
            }
        case UPDATE_COMMENT:
            const commentId = action.payload.commentId;

            const commentIndex = state.comments.findIndex(comment => comment.id === commentId)
            const myCommentIndex = state.myComments.findIndex(comment => comment.id === commentId)

            const updateComment = new Comment(
                state.comments[commentIndex].id,
                state.comments[commentIndex].ownerId,
                state.comments[commentIndex].ownerPhoto,
                state.comments[commentIndex].ownerName,
                state.comments[commentIndex].placeId,
                action.payload.newComment,
                state.comments[commentIndex].date,
                state.comments[commentIndex].upVote,
                state.comments[commentIndex].downVote
            )

            const updatedComments = [...state.comments];
            updatedComments[commentIndex] = updateComment;

            const updatedMyComments = [...state.myComments];
            updatedMyComments[myCommentIndex] = updateComment;

            return {
                ...state,
                comments: updatedComments,
                myComments: updatedMyComments
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(c => c.id !== action.payload),
                myComments: state.myComments.filter(c => c.id !== action.payload)
            }
        case UP_VOTE:
            const commentID = action.payload.commentID
            const upVoteCommentIndex = state.comments.findIndex(c => c.id === commentID)
            const placeCommentIndex = state.placeComments.findIndex(c => c.id === commentID)

            const upVotedComment = new Comment(
                state.comments[upVoteCommentIndex].id,
                state.comments[upVoteCommentIndex].ownerId,
                state.comments[upVoteCommentIndex].ownerPhoto,
                state.comments[upVoteCommentIndex].ownerName,
                state.comments[upVoteCommentIndex].placeId,
                state.comments[upVoteCommentIndex].content,
                state.comments[upVoteCommentIndex].date,
                action.payload.likedUserId,
                action.payload.unLikedUserId,
            )

            const allComment = [...state.comments];
            allComment[upVoteCommentIndex] = upVotedComment;

            const allPlaceComment = [...state.placeComments];
            allPlaceComment[placeCommentIndex] = upVotedComment

            return {
                ...state,
                comments: allComment,
                placeComments: allPlaceComment
            }
        case DOWN_VOTE:
            const downCommentID = action.payload.commentID
            const downVoteCommentIndex = state.comments.findIndex(c => c.id === downCommentID)
            const downPlaceCommentIndex = state.placeComments.findIndex(c => c.id === downCommentID)

            const downVotedComment = new Comment(
                state.comments[downVoteCommentIndex].id,
                state.comments[downVoteCommentIndex].ownerId,
                state.comments[downVoteCommentIndex].ownerPhoto,
                state.comments[downVoteCommentIndex].ownerName,
                state.comments[downVoteCommentIndex].placeId,
                state.comments[downVoteCommentIndex].content,
                state.comments[downVoteCommentIndex].date,
                action.payload.likedUserId,
                action.payload.unLikedUserID,
            )

            const allComments = [...state.comments];
            allComments[downVoteCommentIndex] = downVotedComment;

            const allPlaceComments = [...state.placeComments];
            allPlaceComments[downPlaceCommentIndex] = downVotedComment

            return {
                ...state,
                comments: allComments,
                placeComments: allPlaceComments
            }
        case SET_PLACE_COMMENT:
            return {
                ...state,
                placeComments: state.comments.filter(comment => comment.placeId === action.payload)
            }
    }
    return state;
}

export default commentsReducer