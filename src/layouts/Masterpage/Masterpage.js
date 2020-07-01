import React , {Component} from 'react';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './Masterpage.css';




class Masterpage extends Component {


    render () {
        return (
            <div className="page">
                <Header />
                <Sidebar />
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default Masterpage;