import React from 'react'
import {Link} from 'react-router'

const Home = (props) => {    
    let options = props.users.map((user, i)=> <option value={user} key={i}>{user}</option>);
    let board = props.username? (
        <Link to='/board'>
            <small>Goto Board {props.username}!</small>
        </Link>
    ): null;

    return (
        <div>
            <h1>Future Massage-Time App!</h1>
            <p>Select you user</p>
            <select value={props.username} onChange={props.onUserChange}>
                {options}
            </select> {' '}
            {board}
        </div>
    );
}

export default Home;