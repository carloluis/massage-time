import React from 'react'
import {Link} from 'react-router'

const About = (props) => (
    <div>
        <h4>{props.route.header}</h4>
        <p>Massage time...</p>
    </div>
);

About.propTypes = {
    route: React.PropTypes.shape({
        header: React.PropTypes.string
    })
};

export default About;