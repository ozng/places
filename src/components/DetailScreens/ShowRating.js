import { StyleSheet, Text, View } from 'react-native'
import Button from '../UI/Button'
import { Rating } from 'react-native-elements';

const ShowRating = ({ disableRate, point, totalPointLength, addStarHandler, setRate }) => {
    return (
        <View style={styles.ratingContainer}>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <Rating
                    readonly={disableRate}
                    imageSize={20}
                    onFinishRating={r => setRate(r)}
                    style={styles.rating}
                    fraction={20}
                    type="star"
                    startingValue={point}
                />
                <Text style={styles.totalStarLength}>({totalPointLength})</Text>
            </View>
            {
                disableRate && <Text style={[styles.totalStarLength, { marginTop: 5 }]}>Tekrar oy kullanamazsınız...</Text>
            }
            <Button
                title="Paun Ver"
                onPress={addStarHandler}
                disabled={disableRate}
                style={styles.voteBtn}
            />
        </View>
    )
}

export default ShowRating

const styles = StyleSheet.create({
    ratingContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10
    },
    rating: {
        alignSelf: 'center',
    },
    totalStarLength: {
        marginLeft: 7,
        fontSize: 12,
        color: '#f1c40f'
    },
    voteBtn: {
        marginTop: 20
    },
})