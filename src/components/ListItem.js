import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';

import { fontSizes, colors } from '../../constans/Styles'

const ListItem = ({ onpress, data, deletable, deleteItem }) => {

    return (
        <TouchableOpacity
            onPress={onpress}
            activeOpacity={0.9}
        >
            <View style={styles.screen}>
                <View style={styles.row}>
                    <Image
                        source={{ uri: data.image }}
                        style={styles.image}
                    />
                    <View style={styles.titleCont}>
                        <Text
                            style={styles.titleText}
                            numberOfLines={1}
                        >
                            {data.title}
                        </Text>
                        <Text style={styles.titleDesc}>{data.city} / {data.district}</Text>
                        {data.totalPoints &&
                            <View
                                style={{
                                    alignSelf: 'flex-start',
                                    marginLeft: 15
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Rating
                                        type="star"
                                        readonly
                                        fractions={0}
                                        startingValue={data.star}
                                        imageSize={10}
                                    />
                                    <Text style={styles.totalStarLength}>({data.totalPoints})</Text>
                                </View>
                            </View>
                        }
                    </View>
                    {
                        deletable && (
                            <View style={styles.deleteIcon}>
                                <MaterialCommunityIcons
                                    name="delete-outline"
                                    size={18}
                                    color={colors.btnBackground}
                                    onPress={deleteItem}
                                />
                            </View>
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    screen: {
        marginLeft: 7,
        marginVertical: 10,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colors.background,
        elevation: 5,
    },
    image: {
        height: 100,
        width: 100,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40
    },
    row: {
        flexDirection: 'row'
    },
    titleCont: {
        height: 80,
        width: '60%',
        paddingTop: 7
    },
    titleText: {
        marginHorizontal: 15,
        fontSize: fontSizes.medium,
        color: colors.btnBackground,
        fontFamily: 'barlow-medium'
    },
    titleDesc: {
        color: colors.fadedFont,
        fontSize: 12,
        margin: 15,
        fontStyle: 'italic'
    },
    deleteIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 5
    },
    totalStarLength: {
        marginLeft: 7,
        fontSize: 10,
        color: '#f1c40f'
    }
})

export default ListItem
