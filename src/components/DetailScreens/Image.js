import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const Image = ({ data, favorite, deleteFavHandler, addFavHandler, navigation }) => {
    return (
        <View>
            <ImageBackground
                source={{ uri: data.image }}
                style={styles.image}
            >
                <View style={styles.topBtnsContainer}>
                    <View style={styles.bckBtnContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons
                                name="arrow-back-sharp"
                                size={24}
                                color="black"

                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bckBtnContainer}>
                        <Ionicons
                            name={favorite ? "bookmark" : "bookmark-outline"}
                            size={24}
                            color="black"
                            onPress={favorite ? deleteFavHandler : addFavHandler}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Image

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        alignSelf: 'center',
    },
    topBtnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bckBtnContainer: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: "rgba(255,255,255, 0.6)",
        borderRadius: 15,
        elevation: 5
    },
})