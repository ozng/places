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
    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState(" ");

    const dispatch = useDispatch()

    const loginUserHandler = async () => {
        setErrorMessage("")
        try {
            dispatch(userActions.loginHandler(email, password))
        }
        catch (err) {
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
                        title="Password"
                        autoCapitalize="none"
                        secureTextEntry={true}
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
                        onPress={() => {
                            Keyboard.dismiss()
                            navigation.navigate('Register')
                        }}
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
