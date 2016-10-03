import React from 'react'

const Main = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
}

Main.propTypes = {
    children: React.PropTypes.element
};

export default Main;