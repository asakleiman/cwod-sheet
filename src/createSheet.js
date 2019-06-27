import React from 'react';
import blankSheet from './defaultSheet.json';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

const db = firebase.firestore();

class NewSheet extends React.Component{
    


    constructor(props) {
        super(props);
        this.state = {
            newName:'Name Here',
            sheetsNames: []
        }
      }
    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            return this.props.history.push('/');
        }
        this.listener = db
        .collection('users')
        .doc(currentUser.uid)
        .collection('charachterSheets')
            .onSnapshot(snapshot => {
                this.setState({
                    sheetsNames: snapshot.docs
                });
            });
        // if (this.state.sheetsNames.length == 0){
        //     db
        //     .collection('users')
        //     .doc(currentUser.uid)
        //     .collection('charachterSheets')
        //     .doc('Ken Sample')
        //     .set({'name':'Ken Sample'});

        // };
    }
    componentWillUnmount() {
        if (this.listener) {
            this.listener();
        }
    }
    onTextChange = (event) => {
        const entry = event.target.value;
        const fieldName = event.target.name;
        this.setState({[fieldName] : entry});
    }

    //Creates New Sheet in Database
    sheetMap = (event) =>  {
        event.preventDefault();
        const entry = this.state.newName;
        const charSheets =
        db.collection('users').doc(firebase.auth().currentUser.uid)
        .collection('charachterSheets');
        charSheets
        .doc(entry)
        .set({name: entry});
        // create empty structure
        blankSheet.map((item, idx) => {

            charSheets.doc(entry).collection('statBoxes')
            .doc(item.boxname)
            .collection('filler')
            .doc(item.title).set({'position':item.postion})
            
            charSheets.doc(entry).collection('statBoxes')
            .doc(item.boxname)
            .collection('filler')
            .doc(item.title).update({
                'title': item.title

            });       
            charSheets.doc(entry).collection('statBoxes')
            .doc(item.boxname)
            .collection('filler')
            .doc(item.title).update({
                'type':item.type
            });
            charSheets.doc(entry).collection('statBoxes')
            .doc(item.boxname)
            .collection('filler')
            .doc(item.title).update({
                'value': '0'
            });  
            return (<div key={idx} >
                <div>Has to return something. Fix this!</div>
                </div>
                )
        });
        
        charSheets.doc(entry).collection('statBoxes')
        .doc('stats1')
        .collection('filler')
        .doc('Name').update({
            'value': entry
        });
        // charSheets.doc(entry).collection('statBoxes')
        // .doc('stats1')
        // .collection('filler')
        // .doc('Player').update({
        //     'value': entry
        // });
    }


    deleteSheet = (id) =>{
        db
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('charachterSheets')
        .doc(id).delete();
    };

    render(){
        console.log(this.state.playerName);
        const sheetNamesList = this.state.sheetsNames.map(charSheetName => {

        return (
                <li key={charSheetName.id}>
                    <button className = 'button' onClick={(e) => this.deleteSheet(charSheetName.id)}>Delete</button>
                    <Link to={{
                        pathname: '/sheet',
                        state:{sheetName: charSheetName.id}
                    }}>{charSheetName.id}</Link>                    
                </li>
            );
        });
        return (                 
            <div>
                <ul>
                    {sheetNamesList}
                </ul>

                <form className=  'wrapper' onSubmit={this.sheetMap}>
                    <label>CREATE NEW SHEET</label>
                     <input name='newName' onChange={this.onTextChange} value={this.state.newName}/>
                    <button className = 'button' type='submit'>Go!</button>
                </form>
            </div>
        );       
    }
}

export default NewSheet;