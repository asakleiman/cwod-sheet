import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import './journal.css';
import { SelectNumber } from './clickBoxes';

const db = firebase.firestore();



export default class Sheet extends React.Component {

    listener = [];

    constructor(props) {
        super(props);
        this.state = {
            stats1: [],
            attributes: [],
            abilities: [],
            advantages: [],
            health: [],
            renown: [],
            raNoWi: [],
            feraTrib: [],
            user: null,
            sheetName: this.props.location.state.sheetName,
            // create a list of stat boxes - TODO: import from database on load.
            boxList: [
                'stats1',
                'attributes',
                'abilities',
                'advantages',
                'health',
                'renown',
                'raNoWi',
                'feraTrib'
            ]
        }
      }

    
    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            return this.props.history.push('/');
        }
        // this.addBoxListener('statBox1');
        
        //add listeners for the boxes
        this.state.boxList.map((statsName) =>{ 
            this.addStatsListener(statsName)
        });
 
    }
    


    addStatsListener(statsName)
    {
        const currentUser = firebase.auth().currentUser;
        const statsNameQuery = statsName + 'Query';
        // console.log (statsNameQuery);
        const listener = db
        .collection('users')
        .doc(currentUser.uid)
        .collection('charachterSheets')
        .doc(this.state.sheetName)
        .collection('statBoxes')
        .doc(statsName)
        .collection('filler')
        .orderBy('position')
        .onSnapshot(snapshot => {
            this.setState({
                [statsName]: snapshot.docs
            });
            this.setState({
                [statsNameQuery]: snapshot.query
            });
        });
    }

    

    // Check if the unsubscribeJournal reference exists (could possibly not exist
    // if the !currentUser branch was taken in componentDidMount)
    // This unsubscribe ensures there's not multiple listeners when navigating between pages
    componentWillUnmount() {
        this.listener.forEach(unsubscribe => unsubscribe());

    }

    // Sets the input field and saves to database onChange
    onValueChange = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        const dbCollection = db.collection('users').doc(firebase.auth().currentUser.uid)
        .collection('charachterSheets')
        .doc(this.state.sheetName)
        .collection('statBoxes')
        .doc(event.target.dataset.boxname)
        .collection('filler')
        dbCollection.doc(fieldName).update({'value': value});
        this.setState({[fieldName] : value});

    }
    onTextChange = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.setState({[fieldName] : value});

    }
    handleDotClick = (boxName, fieldName, numValue) => {
        const dbCollection = db.collection('users').doc(firebase.auth().currentUser.uid)
        .collection('charachterSheets')
        .doc(this.state.sheetName)
        .collection('statBoxes')
        .doc(boxName)
        .collection('filler')
        dbCollection.doc(fieldName).update({'value': numValue});
        this.setState({[fieldName] : numValue});

      }
    // addJournalEntry = (event) => {
    //     event.preventDefault();
    //     const dbCollection = db.collection('users').doc(firebase.auth().currentUser.uid)
    //     .collection('charachterSheets')
    //     .doc(this.state.sheetName)
    //     .collection('statBoxes')
    //     .doc(this.state.statBoxName)
    //     .collection('filler')
    //     dbCollection.doc(this.state.Title).set({'title': this.state.Title}); 
    //     dbCollection.doc(this.state.Title).update({'value': this.state.Value});
    //     dbCollection.doc(this.state.Title).update({'position': this.state.Position});
    //     dbCollection.doc(this.state.Title).update({'type': this.state.Type});

    // }



    render() {
        // console.log ((this.state.attributes.length == 0) ?'undefininated!': this.state.attributes[1].data());

        // Please DRY me I am TOO WET HERE
        //Not a good thing in this case
        // this.state.A List of Stat Boxes Imported From NewSheet?.map =>
        //      this.state.[something].map(etc
        //
        //TODO - just break this out into a component because it's REACT idiot
        //If the first boxes work the remaining boxes will be easy to add
        const stats1 = this.state.stats1.map(dataBox => {
            return (
                // .id gets the generated id for this object
                <div key={dataBox.id}>
                    {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
                    {dataBox.data().title}
                    <input data-boxname = "stats1" name = {dataBox.data().title} onChange = {this.onValueChange} value = {dataBox.data().value}></input>

                </div>
            );
        });

        const attributes = this.state.attributes.map(dataBox => {
            return (
                // .id gets the generated id for this object
                <div key={dataBox.id}>
                    {dataBox.data().title}
                    <input data-boxname = "attributes" name = {dataBox.data().title} onChange = {this.onValueChange} value = {dataBox.data().value}></input>
                    <SelectNumber boxName = "attributes" name = {dataBox.data().title} value={dataBox.data().value}  onSelectNumber={this.handleDotClick}/>
                </div>
            );
        });
        
        // const abilities = this.state.abilities.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input data-boxname = "abilities" name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });

        // const advantages = this.state.advantages.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input data-boxname = "advantages" name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });
        
        // const renown = this.state.renown.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input data-boxname = "renown" name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });

        // const raNoWi = this.state.raNoWi.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input data-boxname = "raNoWi" name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });

        // const health = this.state.health.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input data-boxname = "health" name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });

        // const feraTrib = this.state.feraTrib.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input data-boxname = "feraTrib" name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });
        
        
    
        
        
        

        return (
            <div className = "big-box">
                <h1>{this.state.sheetName}</h1>

                <div className = "wrapper">
                    {stats1}
                </div>
                <div className = "thinWrapper">
                    {attributes}
                </div>
                {/* <div className = "thinWrapper">
                    {abilities}
                </div>
                <div className = "thinWrapper">
                    {advantages}
                </div> */}
                {/* <div className = "thinWrapper">
                    {renown}
                </div>
                <div className = "thinWrapper">
                    {raNoWi}
                </div> */}
                {/* <form onSubmit={this.addJournalEntry}>
                    <label>Box Name</label>
                    <input name="statBoxName" onChange={this.onTextChange} value={this.state.statBoxName} />
                    <label>Title</label>
                    <input name = "Title" onChange={this.onTextChange} value={this.state.addTitle} />
                    <label>Value</label>
                    <input name = "Value" onChange={this.onTextChange} value={this.state.addValue} />
                    <label>Position</label>
                    <input name = "Position" onChange={this.onTextChange} value={this.state.addPosition} />
                    <label>Type</label>
                    <input name = "Type" onChange={this.onTextChange} value={this.state.addType} />

                    <button type="submit">Add</button>
                </form> */}


            </div>
        )
    }
}