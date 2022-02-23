import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../constans/Styles'

import { MaterialIcons } from '@expo/vector-icons';

const CategoryModal = ({ visible, data, setValue, setVisible, }) => {
    return (
        <View>
            <Modal visible={visible} >
                <View style={styles.container}>
                    <FlatList
                        numColumns={2}
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
                                            <MaterialIcons name={item.icon} size={18} color='white' style={{
                                                paddingVertical: 20,
                                                paddingRight: 20
                                            }} />
                                        </View>
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
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '10%',
        marginVertical: 10,
        backgroundColor: colors.btnBackground,
        borderRadius: 10,
    },
    itemText: {
        color: 'white',
        paddingVertical: 20,
        paddingLeft: 20,
        fontFamily: 'barlow-regular'
    }
})