import React from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';


const Popover = ({ el, show, placement, body }) => {
    return (
        <Overlay target={el.current} show={show} placement={placement}>
            <Tooltip>
                {body}
            </Tooltip>
        </Overlay>
    )
};


Popover.propTypes = {

};


export default Popover;
