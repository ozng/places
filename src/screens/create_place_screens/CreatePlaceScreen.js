import { useState } from 'react'
import { StyleSheet, View, ImageBackground, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import Firebase from 'firebase/'
import Button from '../../components/UI/Button'
import { auth } from '../../../firebase'
import { EvilIcons } from '@expo/vector-icons';

import * as placeActions from '../../../store/actions/places'
import { pickImageFromGallery, takeImageFromCamera } from '../../../store/actions/common'
import { colors } from '../../../constans/Styles';
import Uploading from '../../components/Uploading';

const CreatePlaceScreen = ({ navigation, route }) => {
    const placeData = route.params?.placeData;
    const params = route.params;
    const userId = auth.currentUser.uid


    const [imageUrl, setImageUrl] = useState(placeData ? placeData.image : "");
    const [firebaseUrl, setFirebaseUrl] = useState(placeData ? placeData.firebaseUrl : "")
    const [upload, setIsUpload] = useState(false);
    const [uploading, setIsUploading] = useState(false);

    const dispatch = useDispatch();

    const addPlaceHandler = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', imageUrl, true);
            xhr.send(null);
        });

        const ref = Firebase.storage().ref().child(new Date().toISOString());
        const snapshot = ref.put(blob);

        snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED, () => {
            setIsUploading(true);
        },
            (error) => {
                setIsUploading(false);
                console.log(error);
                blob.close();
                return;
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setIsUploading(false);
                    setIsUpload(true);
                    setFirebaseUrl(url);
                    dispatch(placeActions.addPlace({
                        ownerId: userId,
                        title: params.title,
                        description: params.description,
                        imageUrl: url,
                        city: params.city,
                        district: params.district,
                        address: params.address,
                        location: {
                            latitude: params.location.latitude,
                            longitude: params.location.longitude
                        },
                        categoryID: params.categoryID
                    }))
                    blob.close();
                    navigation.navigate('Home')
                })
            }
        )
    };

    const updatePlaceHandler = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', imageUrl, true);
            xhr.send(null);
        });

        const ref = Firebase.storage().ref().child(new Date().toISOString());
        const snapshot = ref.put(blob);

        snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED, () => {
            setIsUploading(true);
        },
            (error) => {
                setIsUploading(false);
                console.log(error);
                blob.close();
                return;
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setIsUploading(false);
                    setIsUpload(true);
                    setFirebaseUrl(url);
                    dispatch(placeActions.updatePlace({
                        id: placeData.id,
                        ownerId: userId,
                        title: params.title,
                        description: params.description,
                        imageUrl: url,
                        city: params.city,
                        district: params.district,
                        address: params.address,
                        categoryID: params.categoryID,
                        location: {
                            latitude: params.location.latitude,
                            longitude: params.location.longitude
                        },
                        categoryID: params.categoryID
                    }))
                    blob.close();
                    navigation.navigate('Home')
                })
            }
        )
    }

    if (uploading) {
        return <Uploading
            label="Ekleniyor..."
            iconType="location"
        />
    } else {
        return (
            <View style={styles.screen}>
                <View style={styles.previewContainer}>
                    {
                        imageUrl
                            ? <ImageBackground
                                source={{ uri: imageUrl }}
                                style={styles.image}
                            >

                            </ImageBackground>
                            : <Text style={styles.imageText}>Fotoğraf seçilmedi.</Text>
                    }
                    <View style={styles.iconContainer}>
                        <EvilIcons
                            name="image"
                            size={60}
                            color={colors.btnBackground}
                            onPress={async () => {
                                const res = await pickImageFromGallery()
                                setImageUrl(res)
                            }}
                        />
                        <EvilIcons
                            name="camera"
                            size={60}
                            color={colors.btnBackground}
                            onPress={async () => {
                                const res = await takeImageFromCamera()
                                setImageUrl(res)
                            }}
                        />
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Button
                        title={placeData ? "Düzenle" : "Kaydet"}
                        color="darkred"
                        onPress={placeData ? updatePlaceHandler : addPlaceHandler}
                        disabled={firebaseUrl || imageUrl ? false : true}
                    />
                </View>
            </View>
        )
    }
}

export default CreatePlaceScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    previewContainer: {
        height: '60%',
        width: '100%'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imageText: {
        fontSize: 20,
        height: '100%',
        color: colors.btnBackground,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    btnContainer: {
        height: '40%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    }
})
