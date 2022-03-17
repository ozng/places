import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity } from 'react-native'
import { colors } from '../../../constans/Styles'

import { MaterialIcons } from '@expo/vector-icons';

const CategoryModal = ({ visible, data, setValue, setVisible }) => {
    return (
        <View>
            <Modal style={styles.screen} animationType='fade' visible={visible} >
                <View>
                    <FlatList
                        numColumns={1}
                        data={data}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.container}>
                                    <TouchableOpacity onPress={() => {
                                        setValue({
                                            id: item.id,
                                            categoryID: item.categoryID,
                                            name: item.name
                                        })
                                        setVisible(prevState => !prevState)
                                    }}>
                                        <View style={styles.itemContainer}>
                                            <Text style={[styles.itemText]}>{item.name}</Text>
                                        </View>
                                        <View style={styles.divider} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default CategoryModal

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        // flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        width: '100%',
        color: '#323532',
        fontFamily: 'barlow-medium',
        fontSize: 14,
        paddingVertical: 10,
        textAlign: 'center'
    }
})