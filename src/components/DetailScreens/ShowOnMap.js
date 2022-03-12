import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constans/Styles';

const ShowOnMap = ({ setShowModal, showModalHandler, showModal }) => {
    return (
        <TouchableOpacity
            onPress={() => setShowModal(showModalHandler(showModal))}
            activeOpacity={0.9}
        >
            <View style={styles.mapRow}>
                <Text style={{ fontFamily: 'bitter-regular' }}>Haritada Görüntüle</Text>
                <Ionicons name="location-outline" size={24} color="black" />
            </View>
        </TouchableOpacity>
    )
}

export default ShowOnMap

const styles = StyleSheet.create({
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