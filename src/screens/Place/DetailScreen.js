import { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { calculatePoint } from '../../actions/PlaceHandlers'
import { fetchOwnerData, addStar } from '../../actions/FetchActions'
import * as userActions from '../../../store/actions/user'
import * as placeActions from '../../../store/actions/places'
import { showModalHandler } from '../../actions/UIHandlers'
//Components
import HeadImage from '../../components/DetailScreens/Image';
import MapModal from '../../components/Modals/MapModal';
import Comments from '../../components/DetailScreens/Comments';
import ShowRating from '../../components/DetailScreens/ShowRating'
import UserInfo from '../../components/DetailScreens/UserInfo';
import Description from '../../components/DetailScreens/Description';
import ShowOnMap from '../../components/DetailScreens/ShowOnMap'
import Title from '../../components/DetailScreens/Title'
import Address from '../../components/DetailScreens/Address'

import { auth } from '../../../firebase';
import { colors } from '../../../constans/Styles'

const DetailScreen = ({ navigation, route, }) => {
    const [showModal, setShowModal] = useState(false)
    const [userInfo, setUserInfo] = useState()
    const [favorite, setIsFavorite] = useState(false)
    const [disableRate, setDisableRate] = useState(false)
    const [rate, setRate] = useState("")
    const [point, setPoint] = useState("")
    const [loading, setIsLoading] = useState(true)
    const [totalPointLength, setTotalPointLength] = useState("0")

    const dispatch = useDispatch();

    const data = route.params.detailData
    const currentUserId = auth.currentUser.uid

    const userFavorite = useSelector(state => state.userData.userFavorites)
    // Calculating the stars.
    useEffect(() => {
        (
            async () => {
                const res = await calculatePoint(data.item.id, currentUserId, rate);
                setPoint(res.point)
                setTotalPointLength(res.totalPointLength)
                setDisableRate(res.disableRate)
                setIsLoading(false)
            }
        )()

    }, [data.item])
    // Fetch favorite.
    useEffect(() => {
        for (const key in userFavorite) {
            if (userFavorite && (userFavorite[key].id === data.item.id)) {
                setIsFavorite(true)
            }
        }
    }, [data.item])
    // Fetch user data.
    useEffect(() => {
        (
            async () => {
                const ownerData = await fetchOwnerData(data.item.ownerId)
                setUserInfo(ownerData)
            }
        )()
    }, [data.item])

    const addFavHandler = () => {
        dispatch(userActions.addToFav(data.item))
        setIsFavorite(prevState => !prevState)
    }

    const deleteFavHandler = () => {
        dispatch(userActions.deleteToFav(data.item.id))
        setIsFavorite(prevState => !prevState)
    }

    const addStarHandler = async () => {
        const res = await addStar(data.item.id, currentUserId, rate)
        dispatch(placeActions.giveStar(data.item.id, res.pointArr))
        setDisableRate(true)
    }

    const commentsData = {
        placeId: data.item.id,
        title: data.item.title,
        currentUserId: currentUserId
    }

    return (
        <>
            {
                loading
                    ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} >
                            <ActivityIndicator size="large" color={colors.btnBackground} />
                        </View>
                    )
                    : (
                        <View style={{ paddingTop: '10%', flex: 1, backgroundColor: colors.background }}>
                            <ScrollView>
                                <HeadImage navigation={navigation} data={data.item} favorite={favorite} deleteFavHandler={deleteFavHandler} addFavHandler={addFavHandler} />
                                <Title data={data.item} />
                                {
                                    userInfo && (
                                        <UserInfo userInfo={userInfo} />
                                    )
                                }
                                <ShowRating setRate={setRate} addStarHandler={addStarHandler} disableRate={disableRate} point={point} totalPointLength={totalPointLength} />
                                <Description data={data.item} />
                                <ShowOnMap setShowModal={setShowModal} showModal={showModal} showModalHandler={showModalHandler} />
                                <Comments
                                    onPress={() => navigation.navigate('Comments', commentsData)}
                                />
                                <Address data={data.item} />
                                <MapModal
                                    onPress={() => setShowModal(showModalHandler(showModal))}
                                    showModal={showModal}
                                    data={data.item}
                                />
                            </ScrollView>
                        </View>
                    )
            }
        </>
    )
}

export default DetailScreen