class Place {
    constructor(id, ownerId, address, city, district, lat, lng, points, comments, title, description, image, date, categoryId) {
        this.id = id;
        this.ownerId = ownerId;
        this.address = address;
        this.city = city;
        this.district = district;
        this.lat = lat;
        this.lng = lng;
        this.points = points;
        this.comments = comments;
        this.title = title;
        this.description = description;
        this.image = image;
        this.date = date;
        this.categoryId = categoryId;
        this.star = this.calculate();
        this.totalPoints = this.totalVote();
    }

    calculate = () => {
        const pointArray = this.points;
        let star = 0;
        if (pointArray && pointArray.length > 0) {
            for (const key in pointArray) {
                star = star + Number(pointArray[key].star);
            }
            return star / (pointArray.length);
        } else {
            return star
        }
    }

    totalVote = () => {
        const pointArray = this.points;
        return pointArray?.length;
    }
}

export default Place;