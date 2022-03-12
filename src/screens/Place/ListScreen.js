import { useState, useEffect, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../../components/UI/Header'
import ListItem from '../../components/ListItem'

import * as placesActions from '../../../store/actions/places'
import * as userActions from '../../../store/actions/user'
import * as commentsActions from '../../../store/actions/comments'

const ListScreen = ({ navigation }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const data = useSelector(state => state.places.places)

    const dispatch = useDispatch();

    const loadPlaces = useCallback(() => {
        setIsRefreshing(true)
        dispatch(placesActions.setPlaces())
        dispatch(userActions.setFav())
        dispatch(commentsActions.fetchComments())
        setIsRefreshing(false)
    }, [dispatch])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadPlaces);

        return () => {
            unsubscribe();
        };
    }, [loadPlaces, dispatch]);


    return (
        <View style={{
            backgroundColor: '#fff',
            flex: 1
        }}>
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
                                detailData: { item }
                            })}
                            data={item}
                        />
                    )
                }}
            />
        </View>
    )
}

export default ListScreen