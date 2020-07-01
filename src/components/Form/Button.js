import React, {Component} from 'react';



class Button extends Component {

    render (){
        const {text , action, style, className} = this.props;

        return (
            <button style={style} className={`r-button ripple ${className}`} type="button" onClick={action}>
                {text}
            </button>
        )
    }
}


Button.defaultProps = {
    className : ''
}
export default Button;
