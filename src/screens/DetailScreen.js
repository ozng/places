import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from 'react-native-elements';

import * as userActions from '../../store/actions/user'
import * as placeActions from '../../store/actions/places'

import Button from '../components/UI/Button'
import MapModal from '../components/Modals/MapModal';
import Comments from '../components/DetailScreens/Comments';

import { auth } from '../../firebase';
import { colors, fontSizes } from '../../constans/Styles'

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

    const data = route.params.detailData;
    const currentUserId = auth.currentUser.uid

    const userFavorite = useSelector(state => state.userData.userFavorites)

    const fetchPoints = async () => {
        const response = await fetch(`https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app/places/${data.id}.json`)
        const resData = await response.json();
        return resData
    }

    const showModalHandler = () => {
        setShowModal(prevState => !prevState)
    };

    useEffect(() => {
        (
            async () => {
                const resData = await fetchPoints();
                const star = resData.star
                if (resData && star && resData.star.length > 0) {
                    let sayi = 0
                    setTotalPointLength(star.length)
                    for (let i in star) {
                        sayi = sayi + Number(star[i].star)
                        if (star[i].ownerId === currentUserId) {
                            setDisableRate(true)
                        }
                    }
                    const result = Number(sayi) / star.length
                    setPoint(result)
                } else {
                    setPoint(rate)
                }
                setIsLoading(false)
            }
        )()

    }, [data.id])

    useEffect(() => {
        for (const key in userFavorite) {
            if (userFavorite && (userFavorite[key].id === data.id)) {
                setIsFavorite(true)
            }
        }
    }, [data])

    useEffect(() => {
        (
            async () => {
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
                const userIndex = placeOwner.findIndex(user => user.userId === data.ownerId)
                setUserInfo(placeOwner[userIndex]);
            }
        )()
    }, [data])

    const addFavHandler = () => {
        dispatch(userActions.addToFav(data))
        setIsFavorite(prevState => !prevState)
    }

    const deleteFavHandler = () => {
        dispatch(userActions.deleteToFav(data.id))
        setIsFavorite(prevState => !prevState)
    }

    const addStarHandler = async () => {
        const resData = await fetchPoints();
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

        dispatch(placeActions.giveStar(data.id, pointArr))
        setDisableRate(true)
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
                        <View style={styles.screen}>
                            <ScrollView>
                                <ImageBackground
                                    source={{ uri: data.image }}
                                    style={styles.image}
                                >
                                    <View style={styles.topBtnsContainer}>
                                        <View style={styles.bckBtnContainer}>
                                            <TouchableOpacity
                                                onPress={() => navigation.goBack()}
                                            >
                                                <Ionicons
                                                    name="arrow-back-sharp"
                                                    size={24}
                                                    color="black"

                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.bckBtnContainer}>
                                            <Ionicons
                                                name={favorite ? "bookmark" : "bookmark-outline"}
                                                size={24}
                                                color="black"
                                                onPress={favorite ? deleteFavHandler : addFavHandler}
                                            />
                                        </View>
                                    </View>
                                </ImageBackground>
                                <Text style={styles.title}>{data.title}</Text>
                                {
                                    userInfo && (
                                        <View style={styles.userContainer}>
                                            <Image
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 50,
                                                }}
                                                source={{
                                                    uri: userInfo.photoURL
                                                }}
                                            />
                                            <View style={styles.userTextContainer}>
                                                <Text style={styles.userDNText}>{userInfo.displayName} <Text style={{ fontFamily: 'barlow-regular', color: 'grey' }}>tarafından</Text></Text>
                                            </View>
                                        </View>
                                    )
                                }
                                <View style={styles.ratingContainer}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                        <Rating
                                            // showRating
                                            readonly={disableRate}
                                            imageSize={20}
                                            onFinishRating={rate => setRate(rate)}
                                            style={styles.rating}
                                            fraction={20}
                                            type="star"
                                            startingValue={point}
                                        />
                                        <Text style={styles.totalStarLength}>({totalPointLength})</Text>
                                    </View>
                                    {
                                        disableRate && <Text style={[styles.totalStarLength, { marginTop: 5 }]}>Tekrar oy kullanamazsınız...</Text>
                                    }
                                    <Button
                                        title="Paun Ver"
                                        onPress={addStarHandler}
                                        disabled={disableRate}
                                        style={styles.voteBtn}
                                    />
                                </View>

                                <View style={styles.descriptionCntnr}>
                                    <Text style={styles.description}>{data.description}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={showModalHandler}
                                    activeOpacity={0.85}
                                >
                                    <View style={styles.mapRow}>
                                        <Text style={{ fontFamily: 'bitter-regular' }}>Haritada Görüntüle</Text>
                                        <Ionicons name="location-outline" size={24} color="black" />
                                    </View>
                                </TouchableOpacity>
                                {/* Comments Section  */}
                                <View style={{ marginVertical: 20 }}>
                                    <Comments
                                        onPress={() => navigation.navigate('Comments', {
                                            placeId: data.id,
                                            title: data.title,
                                            currentUserId: currentUserId
                                        })}
                                    />
                                </View>
                                <View style={styles.addressConteiner}>
                                    <Text style={styles.addressText}>{data.city} - {data.district}</Text>
                                    <Text style={styles.addressText}>{data.address}</Text>
                                </View>
                                <MapModal
                                    onPress={showModalHandler}
                                    showModal={showModal}
                                    data={data}
                                />

                            </ScrollView>
                        </View>
                    )
            }
        </>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    screen: {
        paddingTop: '10%',
        flex: 1,
        backgroundColor: colors.background
    },
    image: {
        width: '100%',
        height: 300,
        alignSelf: 'center',
    },
    topBtnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bckBtnContainer: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: "rgba(255,255,255, 0.6)",
        borderRadius: 15,
        elevation: 5
    },
    userContainer: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center'
    },
    userTextContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    userDNText: {
        fontSize: 12,
        fontFamily: 'barlow-medium'
    },
    title: {
        fontSize: fontSizes.max,
        padding: 10,
        textAlign: 'center',
        marginVertical: 10,
        color: colors.btnBackground,
        fontFamily: 'barlow-medium'
    },
    ratingContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10
    },
    rating: {
        alignSelf: 'center',
    },
    totalStarLength: {
        marginLeft: 7,
        fontSize: 12,
        color: '#f1c40f'
    },
    voteBtn: {
        marginTop: 20
    },
    addressConteiner: {
        alignItems: 'center',
        marginVertical: 10
    },
    addressText: {
        fontSize: fontSizes.small,
        paddingTop: 4,
        color: colors.fadedFont,
        fontStyle: 'italic',
    },
    detailText: {
        textAlign: 'center',
        fontSize: fontSizes.large,
        paddingVertical: 10,
        marginRight: 10
    },
    showDetailCntnr: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    descriptionCntnr: {
        borderRadius: 20,
        margin: 5,
    },
    description: {
        paddingHorizontal: 10,
        marginVertical: 20,
        lineHeight: 25,
        textAlign: 'left',
        fontSize: fontSizes.small,
        color: 'black',
        fontFamily: 'barlow-regular'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    mapRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 100,
        borderColor: '#ccc',
        borderWidth: 0.2,
        padding: 15,
        marginVertical: 20,
        marginHorizontal: 50,
        elevation: 2,
    }
})
