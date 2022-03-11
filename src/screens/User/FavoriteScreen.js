import { useEffect, useCallback } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../../components/UI/Header'
import ListItem from '../../components/ListItem'

import * as userActions from '../../../store/actions/user'


const FavoriteScreen = ({ navigation }) => {
    const data = useSelector(state => state.userData.userFavorites)
    const dispatch = useDispatch()

    const loadPlaces = useCallback(async () => {
        await dispatch(userActions.setFav())
    }, [dispatch])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadPlaces);

        return () => {
            unsubscribe();
        };
    }, [loadPlaces, dispatch]);

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Header
                headerTitle="Favorilerim"
                onPress={() => navigation.toggleDrawer()}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <ListItem
                            data={item}
                            onpress={() => navigation.navigate('Detail', {
                                detailData: { item }
                            })}
                        />
                    )
                }}
            />
        </View>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({})
