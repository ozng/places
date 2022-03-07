import { StyleSheet, Text, View, Modal } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../../constans/Styles'

const MapModal = (props) => {
    return (
        <View>
            <Modal
                visible={props.showModal}
                transparent={true}
            >
                <View style={styles.screen}>
                    <View style={styles.row}>
                        <View style={styles.bckBtnContainer}>
                            <Ionicons
                                name="close"
                                size={24}
                                color={colors.btnBackground}
                                onPress={props.onPress}
                            />
                        </View>
                        <Text style={styles.address}>{props.data.address}</Text>
                    </View>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: props.data.lat,
                            longitude: props.data.lng,
                            latitudeDelta: 0.007,
                            longitudeDelta: 0.007,
                        }}
                    >
                        <Marker
                            title={props.data.title}
                            coordinate={{
                                latitude: props.data.lat,
                                longitude: props.data.lng,
                                latitudeDelta: 0.007,
                                longitudeDelta: 0.007,
                            }}
                        />
                    </MapView>
                </View>
            </Modal>
        </View>
    )
}

export default MapModal

const styles = StyleSheet.create({
    screen: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 15,
        backgroundColor: 'white',
        height: '50%',
        top: '44%'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginLeft: 5
    },
    address: {
        fontFamily: 'barlow-regular',
        fontSize: 12,
        color: colors.fadedFont,
        paddingLeft: 10
    },
    bckBtnContainer: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // width: 30,
        // height: 30,
        backgroundColor: '#fff',
        borderRadius: 50,
        elevation: 5
    },
    map: {
        width: '100%',
        height: '100%'
    },
})
