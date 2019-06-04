import React, { Component } from "react";


class Contacts extends React.Component {
    constructor(props){
        super(props);
        this.api = this.props.api;


        
    }

    
    render() {
        
        const items = this.api.getUsers().map(function(item){
            return <li> {item.name} </li>;
          });
        
        return (
                <div>
                <h1>Users:</h1>
                <ul>
                  {items}
                </ul>   
                </div>

        )
    }
}

export default Contacts