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
            <h1>Future Massage-Time!</h1>
            <p>Select you user</p>
            <div className="row">
                <div className="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4">
                    <select className="form-control" value={props.username} onChange={props.onUserChange}>
                        {options}
                    </select> {' '}
                    {board}
                </div>
            </div>
        </div>
    );
}

export default Home;