import React from 'react'
import { Link } from 'react-router'

const Links = (props) => (
    <div>
        <Link to='/'><small>Home</small></Link>{' '}
        <Link to='/about'><small>About</small></Link>
    </div>
);

const Main = (props) => {
    return (
        <div>
            {props.children}
            <Links />
        </div>
    );
}

Main.propTypes = {
    children: React.PropTypes.element
};

export default Main;