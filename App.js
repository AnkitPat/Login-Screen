'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, ImageBackground, TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';

import {Button, Card} from 'react-native-elements'

let firebase = require("firebase");


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default class App extends Component {



    constructor(props) {
        super(props);

        this.state = {}

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().languageCode = 'en';
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });
    }

    componentWillMount() {

        var config = {
            apiKey: "AIzaSyCY0QWodTor266o_GlWZROqhPzUzMgRq2A",
            authDomain: "fir-demo-e708f.firebaseapp.com",
            databaseURL: "https://fir-demo-e708f.firebaseio.com",
            projectId: "fir-demo-e708f",
            storageBucket: "fir-demo-e708f.appspot.com",
            messagingSenderId: "263229205866"
        };
        firebase.initializeApp(config);


    }

    state = {wrongCredentials: true};

    renderWrongCredentailsLayout() {
        if (this.state.wrongCredentials) return (
            <View style={{flexDirection: 'row', marginTop: 5, marginHorizontal: 36}}>
                <Text style={{flex: 0.5, color: '#c63923'}}>Wrong Credentials</Text>
                <Text style={{flex: 0.5, textAlign: 'right', color: '#c63923', textDecorationLine: 'underline'}}>Forrgot
                    Password?</Text>
            </View>
        );

    }

    render() {
        return (


            /* <ImageBackground
                 source={require('./screen.jpg')} style={styles.backgroundImage}>
                 <View style={styles.container}>

                     <Text style={styles.loginText}>Login</Text>

                         <TextInputLayout
                             style={styles.inputLayout}
                             checkValid={t => EMAIL_REGEX.test(t)}
                         >
                             <TextInput
                                 style={styles.textInput}
                                 placeholder={'Email'}
                             />
                         </TextInputLayout>
                         <TextInputLayout style={styles.inputLayout}>
                             <TextInput
                                 style={styles.textInput}
                                 placeholder={'Password'}
                                 secureTextEntry={true}
                             />
                         </TextInputLayout>


                         <TouchableOpacity style={styles.loginButton}>
                             <Image style={{width: 70, height: 70, alignSelf: 'center'}}
                                    source={require('./icons8-enter-96.png')}/>
                         </TouchableOpacity>

                         <Text style={styles.separationText}>----------------- OR -----------------</Text>


                         <View style={styles.loginIconButton}>
                             <TouchableOpacity style={styles.googleLoginButton}>
                                 <Image style={{width: 70, height: 70, alignSelf: 'center'}}
                                        source={require('./icons8-google-plus-528.png')}/>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.facebookLoginButton}>
                                 <Image style={{width: 60, height: 60, alignSelf: 'center'}}
                                        source={require('./facebook.png')}/>
                             </TouchableOpacity>

                         </View>



                 </View>
             </ImageBackground>*/
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'grey'}}>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1, paddingTop: 20, paddingBottom: 10, justifyContent: 'center'}}>
                    <Card style={styles.container}>

                        <Text style={styles.loginText}>Login</Text>

                        <TextInputLayout
                            style={styles.inputLayout}
                            checkValid={t => EMAIL_REGEX.test(t)}
                        >
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Email'}
                            />
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Password'}
                                secureTextEntry={true}
                            />
                        </TextInputLayout>

                        {this.renderWrongCredentailsLayout()}

                        <TouchableOpacity style={styles.loginButton}>
                            <Image style={{width: 70, height: 70, alignSelf: 'center'}} onPress={() => {

                                firebase.auth().signInWithPopup(provider).then(function (result) {
                                    // This gives you a Google Access Token. You can use it to access the Google API.
                                    var token = result.credential.accessToken;
                                    // The signed-in user info.
                                    var user = result.user;

                                    console.log(user)

                                    // ...
                                }).catch(function (error) {
                                    // Handle Errors here.
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    // The email of the user's account used.
                                    var email = error.email;
                                    // The firebase.auth.AuthCredential type that was used.
                                    var credential = error.credential;

                                    console.log(errorMessage);
                                });
                            }

                            }

                                   source={require('./icons8-enter-96.png')}/>
                        </TouchableOpacity>

                        <Text style={styles.separationText}>----------------- OR -----------------</Text>


                        <View style={styles.loginIconButton}>
                            <TouchableOpacity style={styles.googleLoginButton}>
                                <Image style={{width: 70, height: 70, alignSelf: 'center'}}
                                       source={require('./icons8-google-plus-528.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.facebookLoginButton}>
                                <Image style={{width: 60, height: 60, alignSelf: 'center'}}
                                       source={require('./facebook.png')}/>
                            </TouchableOpacity>

                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25}}>
                            <Text>Don't have account?</Text>
                            <Text style={{textDecorationLine: 'underline', color: '#c63923'}}> Create New</Text>
                        </View>

                    </Card>
                </ScrollView>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    loginText: {
        fontSize: 50,
        color: '#000',
        alignSelf: 'center',
        marginBottom: 10
    },
    cardBackground: {

        backgroundColor: 'transparent'
    },
    backgroundImage: {

        flex: 1,
        resizeMode: 'cover'

    },
    container: {

        backgroundColor: '#f8f8f8',
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        color: '#00ff00',

        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },

    loginButton: {

        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 36
    },
    separationText: {
        marginTop: 5,
        color: '#000',
        alignSelf: 'center',
        marginHorizontal: 36
    },

    loginIconButton: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    googleLoginButton: {
        alignSelf: 'center'
    },

    facebookLoginButton: {
        alignSelf: 'center'
    }
});