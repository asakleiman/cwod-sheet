import React from 'react';
import firebase from 'firebase';

// Library for including auth buttons + UI
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default class Home extends React.Component {
    // Config for telling `react-firebaseui` which auth flows and callbacks should be displayed
    uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // redirects to /journal after successful sign-in
            signInSuccessWithAuthResult: () => this.props.history.push('/sheets')
        }
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        )
    }
}