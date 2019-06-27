import React, { Component } from 'react';

import './journal.css';

export class SelectNumber extends React.Component {

    // constructor(props){
    //     super(props);
    // }
    state = {
        selectedCode: '',
        selectedNum: '',
    }

    handleNumChange = (e) => {
        const value = e.target.className;
        const name = this.props.name;
        const boxName =this.props.boxName;
        this.props.onSelectNumber(boxName,name,value);           
    }

    render() {
        const numStatLocal=this.props.value;
        console.log(this.props);
        return (
            <div >

        <div className = "numBox">
            <input 
                className ="1"
                type = "checkbox" 
                checked = {(Number(numStatLocal)>0)}
                onClick ={this.handleNumChange}
            ></input>
            <input 
                className ="2"
                type = "checkbox" 
                checked = {(Number(numStatLocal)>1)}
                onClick ={this.handleNumChange}
            ></input>
                    <input 
                className ="3"
                type = "checkbox" 
                checked = {(Number(numStatLocal)>2)}
                onClick ={this.handleNumChange}
            ></input>
            <input 
                className ="4"
                type = "checkbox" 
                checked = {(Number(numStatLocal)>3)}
                onClick ={this.handleNumChange}
            ></input>
            <input 
                className ="5"
                type = "checkbox" 
                checked = {(Number(numStatLocal)>4)}
                onClick ={this.handleNumChange}
            ></input>
        </div>

            </div>            
        );
    }    

}