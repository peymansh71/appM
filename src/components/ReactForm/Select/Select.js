import React, { Component, Fragment, createRef } from 'react';
import icons from '../icons';
import './Select.scss';
import $ from 'jquery';
import * as FN from '../functions';
import Backdrop from '../Backdrop/Backdrop';

import { isEqual } from 'underscore'

class Select extends Component {
    constructor(props) {
        super(props);
        const { values, defaultValue, mapping } = props;
        this.optionsDom = createRef();
        this.searchDom = createRef();
        this.inputDom = createRef();

        this.selected = FN.findItemById(values, defaultValue, mapping)

        this.state = {
            top: null,
            left: null,
            width: null,
            open: false,
            values: values,
            initialValues: values,
            selectedItem: this.selected,
            defaultValue,
            initialDefaultValue: defaultValue,
            backGroundColor: "",
            // hasError : this.validate(this.selected).hasError,
            // errorMessage : this.validate(this.selected).errorMessage,
            searchValue: '',

        }

    }


    static getDerivedStateFromProps(props, state) {

        if (
            !isEqual(props.values, state.initialValues)
        ) {
            const { values, defaultValue, mapping } = props;
            let selected = FN.findItemById(values, defaultValue, mapping)
            return {
                values: values,
                initialValues: values,
                selectedItem: selected,
            }

        }

        if (state.initialDefaultValue !== props.defaultValue) {
            return {
                defaultValue: props.defaultValue
            }
        }

        return null
    }

    arrowKey = e => {
        const { values, open } = this.state;
        const { search } = this.props;

        if (e.keyCode === 13 || e.keyCode === 40) {
            e.preventDefault()
        }
        if (e.keyCode === 13 && open) {
            const selectedIndex = $(this.optionsDom.current).find('.selected').attr('data-index')
            if (selectedIndex) {

                this.select(values[selectedIndex])
            }
            else {
                this.deSelect()
            }
        }
        else if (e.keyCode === 13 && !open) {
            this.open()
        }

        if (e.keyCode === 38) {//up
            let selected = $(this.optionsDom.current).find('.selected');
            let index = selected.length ? selected.index() : -1;

            if (index > 0) {
                $(this.optionsDom.current).find('.r-options-item').removeClass('selected')
                $(this.optionsDom.current).find('.r-options-item').eq([--index]).addClass('selected').focus()
            }
            else {
                if (search) {
                    $(this.searchDom.current).focus().select()
                }
            }

        }
        else if (e.keyCode === 40) {//down 
            let selected = $(this.optionsDom.current).find('.selected');
            let index = selected.length ? selected.index() : -1;

            if (index < $(this.optionsDom.current).find('.r-options-item').length - 1) {
                $(this.optionsDom.current).find('.r-options-item').removeClass('selected')
                $(this.optionsDom.current).find('.r-options-item').eq([++index]).addClass('selected').focus()
            }

        }

    }





    /**
     * Open options
     * ip
     * @param {Event} e 
     */
    open(e) {
        const { disabled } = this.props;
        if (disabled) return;

        this.setPosition()


        this.setState((prevState) => {
            return { open: !prevState.open }
        });

    }

    /**
     * Close options
     * 
     * @param {Event} e 
     */
    close = e => {
        this.setState({ open: false });
    }

    /**
     * Open options
     * 
     * @param {Event} e ip
     */
    toggle(e) {
        const { disabled } = this.props;

        if (disabled) return;


        this.setPosition()
        this.setState((prevState) => {
            return { open: !prevState.open }
        });

    }


    setPosition = () => {
        const { outline } = this.props;

        this.setState({
            top: $(this.inputDom.current).offset().top + (outline ? 44 : 30),
            left: $(this.inputDom.current).offset().left,
            width: $(this.inputDom.current).parent().width()
        });
    }
    /**
     * 
     * @param {Object} item 
     * 
     * @description Select a item that user clicked on it 
     */
    select = (item, index) => {
        const { change, mapping } = this.props;
      
        this.setState({
            selectedItem: item,
            defaultValue: item[mapping.value],
            backGroundColor: item.code
        })

        this.close();
        change(item);

    }

    /**
     * 
     * @param {Object} item 
     * @description Deslect options to null value 
     */
    deSelect = () => {
        const { change } = this.props;

        this.setState({ selectedItem: null })
        this.close();

        change(null);
    }

    /**
     * Get selected class in single select mode
     * @param {Number} index 
     */
    getSelectedClass(index) {
        const { mapping } = this.props;
        const { values, selectedItem } = this.state;

        if (selectedItem) {
            const selectedId = selectedItem[mapping.value];
            if (values[index][mapping.value] === selectedId) {
                return 'selected'
            }
        }

        return ''
    }

    /**
     * Add null values to options
     */
    createNullValue() {
        const { rtl } = this.props;

        const notSelected = rtl ? 'انتخاب نشده' : 'No Selected';
        return (
            <div tabIndex="-1" key={null} className="r-options-item" onClick={this.deSelect}>
                {notSelected}
            </div>
        )
    }


    /**
     * Render select optionsmulti
     */
    renderOptions() {
        const { mapping, search, rtl, nullable } = this.props;
        const { values, top, left, width } = this.state;
        let options;
       
        if (values === undefined || values === null) {
            const notFoundText = rtl ? 'داد ه ای موجود نیست' : 'No data Found';
            options = (<div className="r-options-item">{notFoundText}</div>)
        }
        //If options list is empty show "Not Found"
        else if (values.length === 0) {
            const notFoundText = rtl ? 'یافت نشد' : 'Not Found';
            options = (<div className="r-options-item">{notFoundText}</div>)
        }
        else {
            options = values.map((o, i) => {

                return (
                    <div tabIndex={i} key={i} data-index={i} className={`r-options-item ${this.getSelectedClass(i)}`} onClick={this.select.bind(this, o, i)}>
                        {mapping.icon &&
                            <span className="r-option-icon">
                                {FN.createIcon(FN.getValueByProp(o, mapping.icon))}
                            </span>
                        }
                        {o.code ? (<div style={{ backgroundColor: `${o.code}`, height: "30px", width: "30px", float: "right", marginLeft: "10px", borderRadius: "5px" }}></div>) : null}
                        {this.getItemText(o)}
                    </div>
                )
            })
            if (nullable) {
                options.unshift(this.createNullValue())
            }
        }
        return (
            <div className="r-options" ref={d => {/*FN.handlePosition(d)*/ }} style={{ top, width, left, position: 'fixed' }}>
                {search && this.renderSearch()}
                <div className="r-options-items" ref={this.optionsDom}>{options}</div>
            </div>
        )

    }

    /**
     * Search in select options
     * 
     * @param {Event} e 
     */
    search(e) {
        const { mapping } = this.props;
        const { initialValues } = this.state;
        const value = e.target.value;

        //Store search value in state
        this.setState({ searchValue: value })

        //Reset list if input hasnt value
        if (value.length === 0) {
            this.setState({ listValues: initialValues })
        }

        //Search
        const target = value.toLowerCase();
        const foundValues = initialValues.filter(o => {
            return o[mapping.text].toLowerCase().indexOf(target) !== -1
        });

        this.setState({ values: foundValues })
    }

    /**
     * Render options search  
     */
    renderSearch() {
        const { rtl } = this.props;
        const { searchValue } = this.state;
        const searchLableText = rtl ? 'جستجو ...' : 'Search ...';

        return (
            <div className="r-options-search">
                <input ref={this.searchDom} onKeyDown={this.arrowKey} value={searchValue} onChange={this.search.bind(this)} placeholder={searchLableText} type="text" />
            </div>
        )
    }

    /**
     * Get list item value
     * 
     * @param {Object} item 
     * @returns {String}
     */
    getItemText(item) {
        const { mapping, showKey } = this.props;
        const text = item[mapping.text];
        const value = item[mapping.value];
        const key = showKey ? `${value} ${'-'}` : '';
        const itemText = `${key} ${text}`;

        return itemText;
    }

    /**
    * Get input value when single selecting
    * 
    * @param {Array} item 
    * @param {String} seperator is between key and text
    * @returns {String}
    */
    getInputText() {
        const { mapping, showKey, rtl } = this.props;
        const { selectedItem, defaultValue } = this.state;
        let inputText = '';

        if (!selectedItem || defaultValue === null) {
            const notSelected = rtl ? 'انتخاب نشده' : 'No Selected';
            return notSelected;
        }

        const text = selectedItem[mapping.text];
        const value = selectedItem[mapping.value];
        const key = showKey ? `${value}-` : '';
        inputText += `${key} ${text}`;

        return inputText;
    }

    /**
     * Get style
     */
    getSelectClass() {
        const { mapping, rtl, disabled, outline, className, required } = this.props;
        const { selectedItem, open } = this.state;

        let names = {
            [className]: className ? true : false,
            'active': open,
            'r-select r-noselect r-input filled': true,
            'r-rtl': rtl,
            'r-bordered': outline,
            'r-disabled': disabled,
            'r-has-icon': mapping.icon,
            'r-error': (required && (!selectedItem || !selectedItem[mapping.value])),
        }

        return FN.mapObjectToClassName(names)
    }

    render() {
        const { label, mapping, disabled, style, required } = this.props;
        const { error, open, selectedItem, backGroundColor } = this.state;
        const inputValue = this.getInputText();
        const renderIcon = mapping.icon ? FN.createIcon(FN.getValueByProp(selectedItem, mapping.icon)) : '';

        return (
            <Fragment>
                <div tabIndex={0} onKeyDown={this.arrowKey} style={style} className={this.getSelectClass()}>
                    {open && <Backdrop onClick={this.close} />}

                    <input
                        ref={this.inputDom}
                        onClick={this.toggle.bind(this)}
                        disabled={disabled}
                        type="text"
                        onChange={() => { }}
                        value={inputValue.trim()}
                    />
                    {label && <label>{label}</label>}
                    {mapping.icon && <span className="r-input-icon">{renderIcon}</span>}

                    <span onClick={this.open.bind(this)} className="r-icon">{icons.down}</span>

                    {(required && (!selectedItem || !selectedItem[mapping.value])) &&
                        <Fragment>
                            <span className="r-message"> انتخاب این فیلد ضروری میباشد</span>
                        </Fragment>
                    }
                    {open && this.renderOptions()}
                </div>
                <div style={style}>
                    {mapping.color ? (<div style={{ backgroundColor: `${backGroundColor}`,marginTop:"-29px", height: "10px", width: "100%", borderRadius: "5px" }}></div>) : null}
                </div>
            </Fragment>
        )
    }
}

Select.defaultProps = {
    rtl: false,
    outline: false,
    disabled: false,
    nullable: false,
    style: {},
    required: false,

}

export default Select

