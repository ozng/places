import { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Text, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Firebase from 'firebase/'
import { auth } from '../../../firebase'

import * as userActions from '../../../store/actions/user'
import { takeImageFromCamera, pickImageFromGallery } from '../../actions/CameraActions'

import Header from '../../components/UI/Header'
import Button from '../../components/UI/Button'
import ButtonOutline from '../../components/UI/ButtonOutline'
import Uploading from '../../components/Uploading'

import { colors, fontSizes } from '../../../constans/Styles'

const UserSettings = ({ navigation }) => {
    const userData = useSelector(state => state.userData.user)
    const currentUserData = auth.currentUser;

    const [nick, setNick] = useState(userData[0]?.displayName)
    const [pickedImage, setPickedImage] = useState()
    const [avatar, setAvatar] = useState(userData[0]?.imageUrl)
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setUser())
            .then(() => setLoading(false))
    }, [dispatch])

    const updateUserHandler = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', pickedImage, true);
            xhr.send(null);
        });

        const ref = Firebase.storage().ref().child(new Date().toISOString());
        const snapshot = ref.put(blob);

        snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED, () => {
            setUploading(true)
        },
            (error) => {
                console.log(error);
                blob.close();
                return;
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setAvatar(url)
                    setUploading(false)
                    setUploaded(true)
                    blob.close();
                    dispatch(userActions.updateUserHandler(nick, url, currentUserData.photoURL, currentUserData.uid))
                })
            }
        )
    };

    if (uploading) {
        return <Uploading
            label="Resim Yükleniyor..."
            iconType="upload-to-cloud"
        />
    } else {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                {
                    loading
                        ? <ActivityIndicator size="large" color={colors.btnBackground} />
                        : (
                            <View style={{
                                flex: 1
                            }}>
                                <Header
                                    headerTitle=""
                                    onPress={() => navigation.toggleDrawer()}
                                />
                                <View style={styles.screen}>
                                    <View style={styles.userDataContainer}>
                                        <Image
                                            style={styles.image}
                                            source={{ uri: userData[0]?.imageUrl }}
                                        />
                                        <Text style={styles.nick}>{userData[0]?.displayName}</Text>
                                        <Text style={styles.emailText}>{userData[0]?.email}</Text>
                                    </View>
                                    <View style={styles.btnContainer}>
                                        <Button
                                            title="Kamera"
                                            onPress={async () => {
                                                const res = await takeImageFromCamera();
                                                setPickedImage(res)
                                                setAvatar(res)
                                            }}
                                        />
                                        <ButtonOutline
                                            title="Galeri"
                                            onPress={async () => {
                                                const res = await pickImageFromGallery();
                                                setPickedImage(res)
                                                setAvatar(res)
                                            }}
                                        />
                                    </View>
                                    <View style={styles.saveBtnContainer}>
                                        <ButtonOutline
                                            title="Kaydet"
                                            disabled={pickedImage ? false : true}
                                            onPress={updateUserHandler}
                                        />
                                    </View>
                                    <View style={styles.logoutBtn}>
                                        <ButtonOutline
                                            title="Çıkış Yap"
                                            onPress={() => {
                                                navigation.closeDrawer()
                                                dispatch(userActions.logoutHandler())
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                }
            </View>
        )
    }
}

export default UserSettings

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    userDataContainer: {
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    nick: {
        fontSize: fontSizes.large,
        color: colors.btnBackground,
        marginTop: 10,
        fontFamily: 'bitter-regular'
    },
    emailText: {
        marginVertical: 20,
        color: colors.fadedFont,
        fontSize: 12,
        fontFamily: 'bitter-regular'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    saveBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    logoutBtn: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center'
    }
})
