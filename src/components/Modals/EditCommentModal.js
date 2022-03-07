import { View, Text, Modal, StyleSheet, TextInput } from 'react-native';

import { colors } from '../../../constans/Styles';
import Button from '../UI/Button'
import ButtonOutline from '../UI/ButtonOutline'

const EditCommentModal = (props) => {

    return (
        <View>
            <Modal
                visible={props.visible}
                animationType='fade'
                transparent={false}
                style={styles.modal}
            >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Yorum Düzenle</Text>
                    </View>
                    <View>
                        <TextInput
                            value={props.value}
                            onChangeText={props.onChangeText}
                            style={styles.input}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.btn}>
                        <Button
                            title="Tamam"
                            onPress={props.onPress}
                        />
                        <ButtonOutline
                            title="İptal Et"
                            onPress={props.onCancel}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'barlow-regular',
        fontSize: 18,
        textAlign: 'center',
        color: colors.btnBackground,
        paddingBottom: 10
    },
    input: {
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 100,
        textAlignVertical: 'top',
        fontFamily: 'barlow-regular'
    },
    btn: {
        marginTop: 10,
        alignItems: 'center'
    }
})

export default EditCommentModal
