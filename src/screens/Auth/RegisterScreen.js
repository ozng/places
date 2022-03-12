import { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useDispatch } from 'react-redux';

import * as userActions from '../../../store/actions/user'

import WarningModal from '../../components/Modals/WarningModal'
import Button from '../../components/UI/Button';
import ButtonOutline from '../../components/UI/ButtonOutline';
import Inputs from '../../components/UI/Inputs';

import { colors } from '../../../constans/Styles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("")
    const [displayName, setDisplayName] = useState("");
    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState(" ");

    const dispatch = useDispatch()

    const createUserHandler = async () => {
        if (password !== secondPassword) {
            setErrorMessage("Girilen parola birbiri ile uyuşmuyor.")
            setVisible(true)
            return;
        }
        setErrorMessage("")
        try {
            await dispatch(userActions.createUser(email, password, displayName))
        } catch (err) {
            setErrorMessage(err.message)
            setVisible(true)
        }
        setEmail("")
        setPassword("")
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior='height'
            >
                <View style={styles.inputContainer}>
                    <Inputs
                        onChangeText={text => {
                            setEmail(text)
                            setErrorMessage(" ")
                        }}
                        placeholder="myplace@gmail.com"
                        value={email}
                        title="E-mail"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Inputs
                        onChangeText={text => {
                            setPassword(text)
                            setErrorMessage(" ")
                        }}
                        placeholder="En az 6 karakter içermeli"
                        value={password}
                        title="Parola"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                    <Inputs
                        onChangeText={text => {
                            setSecondPassword(text)
                            setErrorMessage(" ")
                        }}
                        placeholder="En az 6 karakter içermeli"
                        value={secondPassword}
                        title="Parola tekrar"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                    <Inputs
                        onChangeText={text => {
                            setDisplayName(text)
                            setErrorMessage(" ")
                        }}
                        placeholder="OznG"
                        value={displayName}
                        title="Kullanıcı Adı"
                        autoCapitalize="sentences"
                    />
                </View>
                <Text style={styles.errorMsg}>{errorMessage}</Text>
                <View style={styles.btnContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Button
                            onPress={createUserHandler}
                            title="Kaydı Tamamla"
                        />
                    </View>
                    <ButtonOutline
                        onPress={() => {
                            Keyboard.dismiss()
                            navigation.navigate('Login')
                        }}
                        title="Giriş Yap"
                    />
                </View>
                <View>
                    <WarningModal
                        visible={visible}
                        label={errorMessage}
                        onPress={() => setVisible(prevState => !prevState)}
                    />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    inputContainer: {
        width: '90%'
    },
    btnContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    errorMsg: {
        color: colors.btnBackground,
        fontFamily: 'montserrat-medium',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: 5
    }
})
