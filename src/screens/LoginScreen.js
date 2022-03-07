import { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useDispatch } from 'react-redux';

import * as userActions from '../../store/actions/user'

import WarningModal from '../components/Modals/WarningModal'
import Button from '../components/UI/Button';
import ButtonOutline from '../components/UI/ButtonOutline';

import { colors } from '../../constans/Styles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState(" ");

    const dispatch = useDispatch()

    const createUserHandler = async () => {
        setErrorMessage("")
        try {
            await dispatch(userActions.createUser(email, password))
        } catch (err) {
            setErrorMessage(err.message)
            // setVisible(true)
        }
        setEmail("")
        setPassword("")
    }

    const loginUserHandler = async () => {
        setErrorMessage("")
        try {
            await dispatch(userActions.loginHandler(email, password))
            navigation.replace('Auth')
        }
        catch (err) {
            setErrorMessage(err.message)
            // setVisible(true)
        }
        setEmail("")
        setPassword("")
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='height'
        >
            {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
            <View style={styles.inputContainer}>
                <TextInput
                    value={email}
                    onChangeText={text => {
                        setEmail(text)
                        setErrorMessage(" ")
                    }}
                    style={styles.input}
                    placeholder='E-mail'
                    autoCapitalize='none'
                />
                <TextInput
                    value={password}
                    onChangeText={text => {
                        setPassword(text)
                        setErrorMessage(" ")
                    }}
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry
                />
            </View>
            <Text style={styles.errorMsg}>{errorMessage}</Text>
            <View style={styles.btnContainer}>
                <View style={{ marginBottom: 10 }}>
                    <Button
                        onPress={loginUserHandler}
                        title="Giriş Yap"
                    />
                </View>
                <ButtonOutline
                    onPress={createUserHandler}
                    title="Kayıt Ol"
                />
            </View>
            <View>
                <WarningModal
                    visible={visible}
                    label={errorMessage}
                    onPress={() => setVisible(prevState => !prevState)}
                />
            </View>
            {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    btnContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    btn: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    btnOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    btnOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
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
