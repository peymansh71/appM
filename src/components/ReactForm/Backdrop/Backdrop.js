import React, {Component} from 'react';
import './Backdrop.scss';



class Backdrop extends Component {
    render (){
        const {onClick} = this.props;

        return (
           <span className="r-backdrop" onClick={onClick} >
           </span>
        )
    }
}


export default Backdrop