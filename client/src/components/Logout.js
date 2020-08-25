import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                <NavLink to="#" onClick={this.props.logout}>Logout</NavLink>
            </div>
        )
    }
}

export default Logout;
