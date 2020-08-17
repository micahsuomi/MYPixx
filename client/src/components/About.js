import React from 'react';
import {NavLink} from 'react-router-dom';
import '../assets/style/about.css';

const About = (props) => {
    console.log(props)
    let singleUser = props.users.map((user) => user)
    console.log(singleUser)
    return (
        <div className="about-container">
            <h1>About</h1>
            <div className="about-paragraph__container">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Pellentesque id nibh tortor id. At augue eget arcu dictum varius duis at. Non nisi est sit amet. Nisl nunc mi ipsum faucibus. Mauris sit amet massa vitae tortor condimentum lacinia quis vel. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Nisl tincidunt eget nullam non nisi. Id venenatis a condimentum vitae sapien pellentesque habitant. Sed viverra ipsum nunc aliquet bibendum enim. Odio facilisis mauris sit amet massa. Amet nisl purus in mollis. Praesent tristique magna sit amet purus gravida quis blandit turpis. Amet venenatis urna cursus eget nunc scelerisque viverra mauris in. Duis ut diam quam nulla porttitor. Donec enim diam vulputate ut pharetra sit amet.
                <br/><br/>

In ornare quam viverra orci sagittis eu. Lorem dolor sed viverra ipsum. Ac ut consequat semper viverra nam libero justo laoreet. Suscipit tellus mauris a diam maecenas sed enim ut. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Maecenas pharetra convallis posuere morbi leo urna. Et tortor at risus viverra adipiscing at in tellus integer. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Et odio pellentesque diam volutpat commodo. In aliquam sem fringilla ut morbi. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius.</p>
        </div>
        
        <div className="users-container">
            <h1 className="users-title">Our Users</h1>
            <div className="users-wrapper">
            {props.users.map((user) => ( 
                <div className="user-container">
                <div className="user-image__container">
                    {
                        user.avatar === undefined || user.avatar === ''
                        ?
                        <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={user.name}/>
                        : 
                        <img src={user.avatar}/>


                    }
                </div>
                <NavLink to={`/user/${user._id}`} className="user-name grow">
                <h4>{user.name}</h4>
                </NavLink>
                <ul className="user-details">
                    <li>{user.email}</li>
                    {user.bio === undefined || user.bio === ''
                    ?
                    null 
                    :
                    <li>"{user.bio}"</li>

                    }

                </ul>
                </div>
                
            ))}
            </div>

        </div>
        </div>




    )
}

export default About;