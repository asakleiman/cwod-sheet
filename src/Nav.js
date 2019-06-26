import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from 'firebase';
import './journal.css';

class Nav extends React.Component {
    state = {
        user: null
    }

    // Registers an observer to set the user in state when the user is logged in/out
    // Needed because React only re-renders when state changes, and we're displaying
    // the user's name/phone number and sign-out link in the render function
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({user})
        );
    }

    // Unregister the listener so there's not multiple listeners when navigating pages
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    // Sign-out, then redirect back home
    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        const {user} = this.state;

        const userDisplayName = user ? (
            <strong>
                {user.displayName || user.phoneNumber}
            </strong>
         ) : null;
        const signOut = user ? <button className = 'button' onClick={this.signOut}>Sign Out</button> : null;

        return (
            <div>
                {userDisplayName}
                
                <div className='thinWrapper'>
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/createSheet">Sheets</Link></div>
                    <div>{signOut}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Nav);