import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



export class Logout extends Component {
    render() {
        return (
            <div>
                <NavLink to="#" onClick={this.props.logout}>Logout</NavLink>
            </div>
        )
    }
}

export default Logout
