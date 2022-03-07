import { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import Inputs from '../../components/UI/Inputs'
import Button from '../../components/UI/Button';

import { colors } from '../../../constans/Styles';


const SecondStep = ({ route, navigation }) => {
    const placeData = route.params?.placeData;

    const title = route.params.title;
    const description = route.params.description;
    const locationParams = route.params.location;
    const categoryID = route.params.categoryID;

    const [city, setCity] = useState(placeData ? placeData.city : "");
    const [district, setDistrict] = useState(placeData ? placeData.district : "");
    const [address, setAddress] = useState(placeData ? placeData.address : "");
    const [location, setLocation] = useState({
        latitude: placeData ? placeData.lat : locationParams.latitude,
        longitude: placeData ? placeData.lng : locationParams.longitude,
    });
    const [disableBtn, setDisableBtn] = useState(true);

    useEffect(() => {
        if (city.trim().length >= 4 && district.trim().length >= 4 && address.trim().length >= 4) {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }, [city, district, address])

    return (
        <View style={styles.screen}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.007,
                        longitudeDelta: 0.007,
                    }}
                    onPress={response => {
                        setLocation({
                            latitude: response.nativeEvent.coordinate.latitude,
                            longitude: response.nativeEvent.coordinate.longitude,
                        })
                    }}
                >
                    <Marker
                        title='Seçildi'
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    />
                </MapView>
            </View>
            <View style={styles.inputContainer}>
                <Inputs
                    title="Adres"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    placeholder="En az 4 karakter içermelidir."
                />
                <Inputs
                    title="Şehir"
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    placeholder="En az 4 karakter içermelidir."
                />
                <Inputs
                    title="Semt"
                    value={district}
                    onChangeText={(text) => setDistrict(text)}
                    placeholder="En az 4 karakter içermelidir."
                />
                <View style={{
                    alignItems: 'center'
                }}>
                    <Button
                        title="İlerle"
                        disabled={disableBtn}
                        onPress={() => navigation.navigate('Create', {
                            title: title,
                            description: description,
                            location: location,
                            city: city,
                            district: district,
                            address: address,
                            placeData: placeData,
                            categoryID: categoryID
                        })}
                    />
                </View>
            </View>
        </View>
    )
}

export default SecondStep

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.background
    },
    map: {
        width: '100%',
        height: '100%'
    },
    button: {
        position: 'absolute',
        bottom: 25,
        left: '40%'
    },
    mapContainer: {
        flex: 1,
    },
    inputContainer: {
        marginVertical: 20
    }
})
