import React, { Component, Fragment, createRef } from 'react';
import { createIcon, mapObjectToClassName } from '../functions';
import icons from '../icons';
import $ from 'jquery';
import './Input.scss';


class Input extends Component {
    constructor(props) {
        super(props);
        this.textareaDom = createRef();
        let { value = '' } = this.props;
        this.state = {
            initialValue: value,
            value,
        }


    }

    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.initialValue) {
            let { value = '' } = props;
            return {
                value,
                initialValue: value,

            }
        }

        return null;
    }

    componentDidMount() {
        $.each($('textarea[data-autoresize]'), function () {
            var offset = this.offsetHeight - this.clientHeight;
            var resizeTextarea = function (el) {
                $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
            };
            $(this).on('keyup input', function () { resizeTextarea(this); }).removeAttr('data-autoresize');
        });
        $(document).ready(function () {
            $("input[type=text1]").keypress(function (e) {
                var key = e.keyCode;
                if (key >= 48 && key <= 57) {
                    e.preventDefault();
                }
            });
        });
    }
    /**
     * Handle input changes
     * 
     * @param {Event} e 
     */
    handleChange(e) {
        const { change } = this.props;
        let value = e.target.value;


        this.setState({ value })


        change(value)
    }



    /**
     * Get style
     */
    getInputClass() {
        const { rtl, outline, disabled, icon, className, required } = this.props;
        const { value } = this.state;

        let names = {
            [className]: className ? true : false,
            'filled': String(value).length > 0 || disabled,
            'r-input': true,
            'r-rtl': rtl,
            'r-bordered': outline,
            'r-disabled': disabled,
            'r-has-icon': icon !== null,
            'r-error': (value === undefined || value === null || value === '') && required,
        }

        return mapObjectToClassName(names)
    }

    render() {
        const { label, disabled, multiline, icon, onFocus, onBlur, autoFocus, onKeyUp, style, required, type } = this.props;
        const { value } = this.state;



        const inputIcon = createIcon(icon);

        return (
            <div style={style} className={this.getInputClass()} >

                {
                    multiline ?
                        <textarea

                            onKeyUp={onKeyUp}
                            autoFocus={autoFocus}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            data-autoresize
                            ref={this.textareaDom}
                            type="text"
                            value={value}
                            autocomplete="off"
                            onChange={this.handleChange.bind(this)}
                            disabled={disabled}
                        ></textarea> :

                        <input
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="off"
                            onKeyUp={onKeyUp}
                            autoFocus={autoFocus}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            type={type}
                            value={value}
                            onChange={this.handleChange.bind(this)}
                            disabled={disabled}
                        // minLength="2"
                        // maxLength="8"
                        />


                }

                {label && <label>{label}</label>}

                {
                    icon !== null &&
                    <span className="r-input-icon">{inputIcon}</span>
                }

                {
                    (value === undefined || value === null || value === '') && required &&
                    <Fragment>
                        <span className="r-icon">{icons.error}</span>
                        <span className="r-message">وارد کردن این فیلد ضروری میباشد</span>
                    </Fragment>
                }




            </div >
        )
    }

}

Input.defaultProps = {
    autoFocus: false,
    rtl: false,
    outline: false,
    disabled: false,
    multiline: false,
    icon: null,
    style: {},
    className: '',
    required: true,
    type: "text1"
}

export default Input
