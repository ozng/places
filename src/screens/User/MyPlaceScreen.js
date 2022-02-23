import React, { useEffect, useCallback, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../../../components/Header'
import ListItem from '../../../components/ListItem'
import DeleteModal from '../../../components/DeleteModal'
import * as placesActions from '../../../store/actions/places'
import * as categoriesActions from '../../../store/actions/categories'

const MyPlaceScreen = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("")
    const [placeID, setPlaceID] = useState("")
    const [placeImg, setPlaceImg] = useState("")

    const data = useSelector(state => state.places.myPlaces)
    const dispatch = useDispatch()

    const loadPlaces = useCallback(async () => {
        dispatch(placesActions.setPlaces())
        dispatch(categoriesActions.fetchCategories())
    }, [dispatch])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadPlaces);

        return () => {
            unsubscribe();
        };
    }, [loadPlaces]);

    const deleteMesssage = "Seçilen yer silinecektir, silme işlemi geri alınamaz. Emin misiniz?"

    return (
        <View style={styles.screen}>
            <Header
                headerTitle="Yerlerim"
                onPress={() => navigation.toggleDrawer()}
                createPlace={() => navigation.navigate('FirstStep')}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <ListItem
                                onpress={() => navigation.navigate('FirstStep', {
                                    placeData: item
                                })}
                                data={item}
                                deleteItem={() => {
                                    setVisible(prevState => !prevState)
                                    setTitle(item.title)
                                    setPlaceID(item.id)
                                    setPlaceImg(item.image)
                                }}
                                deletable
                            />
                        </View>
                    )
                }}
            />
            <DeleteModal
                label={deleteMesssage}
                visible={visible}
                onCancel={() => {
                    setPlaceID("")
                    setTitle("")
                    setPlaceImg("")
                    setVisible(prevState => !prevState)
                }}
                onConfirm={() => {
                    setPlaceID("")
                    setTitle("")
                    setPlaceImg("")
                    setVisible(prevState => !prevState)
                    dispatch(placesActions.deletePlace(placeID, placeImg))
                    navigation.navigate('User')
                }}
                title={title}
            />
        </View>
    )
}

export default MyPlaceScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    }
})
