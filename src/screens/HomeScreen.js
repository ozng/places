import React, { useState, useEffect, useCallback } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../components/Header'

import ListItem from '../../components/ListItem'
import * as placesActions from '../../store/actions/places'
import * as userActions from '../../store/actions/user'
import * as commentsActions from '../../store/actions/comments'

const HomeScreen = ({ navigation }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const data = useSelector(state => state.places.places)

    const dispatch = useDispatch();

    const loadPlaces = useCallback(async () => {
        setIsRefreshing(true)
        await dispatch(placesActions.setPlaces())
        await dispatch(userActions.setFav())
        await dispatch(commentsActions.fetchComments())
        setIsRefreshing(false)
    }, [dispatch])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadPlaces);

        return () => {
            unsubscribe();
        };
    }, [loadPlaces, dispatch]);


    return (
        <View style={styles.screen}>
            <Header
                headerTitle="Keşfet"
                onPress={() => navigation.toggleDrawer()}
            />
            <FlatList
                data={data}
                refreshing={isRefreshing}
                onRefresh={loadPlaces}
                renderItem={({ item }) => {
                    return (
                        <ListItem
                            onpress={() => navigation.navigate('Detail', {
                                detailData: {
                                    id: item.id,
                                    ownerId: item.ownerId,
                                    title: item.title,
                                    city: item.city,
                                    district: item.district,
                                    image: item.image,
                                    description: item.description,
                                    address: item.address,
                                    lat: item.lat,
                                    lng: item.lng,
                                    categoryID: item.categoryId
                                }
                            })}
                            data={item}
                        />
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#fff',
        flex: 1
    }
})

export default HomeScreen