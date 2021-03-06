import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import * as Location from 'expo-location';

import Inputs from '../../../components/UI/Inputs'
import Button from '../../../components/UI/Button'
import ButtonOutline from '../../../components/UI/ButtonOutline'
import { Entypo } from '@expo/vector-icons';
import { colors } from '../../../../constans/Styles'
import { useSelector } from 'react-redux';

import CategoryModal from '../../../components/Modals/CategoryModal';

const FirstStep = ({ route, navigation }) => {
    const placeData = route.params?.placeData;

    const [title, setTitle] = useState(placeData ? placeData.title : "");
    const [description, setDescription] = useState(placeData ? placeData.description : "");
    const [disableBtn, setDisableBtn] = useState(true);
    const [location, setLocation] = useState({
        latitude: placeData ? placeData?.lat : 41.025726706382486,
        longitude: placeData ? placeData?.lng : 28.974306013341945,
    });
    const [categoryModal, setCategoryModal] = useState(false)
    const [category, setCategory] = useState(null)
    const [layout, setLayout] = useState({})

    const categories = useSelector(state => state.categories.categories)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status)
            if (status !== 'granted') {
                alert('Konum için gerekli izin verilmedi!');
                return;
            } else {
                console.log('Konum izni verildi')
            }
        })();
    }, []);

    useEffect(() => {
        if (title.trim().length > 4 && description.trim().length > 4 && category) {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }, [title, description, category])

    const pickLocationHandler = async () => {
        const loc = await Location.getCurrentPositionAsync({
            accuracy: 1
        })
        setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
        })
    }

    useEffect(() => {
        pickLocationHandler()
    }, [])


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Inputs
                    title="Başlık"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    placeholder="En az 4 karakter içermelidir."
                />
                <Inputs
                    title="Açıklama"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="En az 4 karakter içermelidir."
                    multiline={true}
                    textAlignVertical="top"
                    style={{ height: 100 }}
                />
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.touchOpacity} onPress={() => setCategoryModal(true)}>
                        <Text style={styles.modalText}>{category ? category.name : "Kategori Seçin"}</Text>
                        <Entypo name="chevron-down" size={24} color="#323532" />
                    </TouchableOpacity>
                    <View onLayout={(e) => {
                        const { x, y, width, height } = e.nativeEvent.layout;
                        setLayout({ x, y, width, height })
                    }}>
                        <CategoryModal
                            visible={categoryModal}
                            data={categories}
                            setValue={setCategory}
                            setVisible={setCategoryModal}
                            layout={layout}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <Button
                        title="İlerle"
                        disabled={disableBtn}
                        onPress={() => navigation.navigate('SecondStep', {
                            title: title,
                            description: description,
                            placeData: placeData,
                            location: location,
                            categoryID: category.categoryID
                        })}
                    />
                    <ButtonOutline
                        title="Vazgeç"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default FirstStep

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: '5%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20
    },
    modal: {
        borderColor: "#323532",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 20
    },
    modalText: {
        color: '#323532',
    },
    touchOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})
