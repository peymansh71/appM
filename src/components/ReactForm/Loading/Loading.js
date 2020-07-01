import React from 'react';
import './Loading.scss'


export function DotsLoading(props){
    return (
        <div className="r-dots-loading">
            <div>{props.text}</div>&nbsp;
            <div className="dot one"></div>
            <div className="dot two"></div>
            <div className="dot three"></div>
        </div>
    )
}