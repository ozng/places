class Comment {
    constructor(id, ownerId, ownerPhoto, ownerName, placeId, content, date, upVote, downVote) {
        this.id = id;
        this.ownerId = ownerId;
        this.ownerPhoto = ownerPhoto
        this.ownerName = ownerName
        this.placeId = placeId;
        this.content = content;
        this.date = date;
        this.upVote = upVote;
        this.downVote = downVote;
    }
}

export default Comment;