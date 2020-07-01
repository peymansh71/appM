import React, {Component, Fragment, createRef} from 'react';
import Checkbox from '../Checkbox/Checkbox';
import Backdrop from '../Backdrop/Backdrop';
import * as FN from '../functions';
import icons from '../icons';
import './MultiSelect.scss';
import * as _ from 'underscore'


/**
 * 
 * @param {Array} arr 
 * @param {Object} mapping 
 * @param {Array} ids 
 */

function addSelectedProp (arr, mapping, ids){

    for (var i=0; i< arr.length; i++) {
        let id = Number(arr[i][mapping.value]);
        if (ids.indexOf(id) !== -1) {
            arr[i].selected = true;
        }
        else {
            arr[i].selected = false;
        }
    }

    return arr
}


function getSelectedItems (arr){
    return arr.filter(o => o.selected === true)
}

class MultiSelect extends Component {
    constructor(props) {
        super(props);
        const {values ,mapping, defaultValue} = this.props;
        this.optionsDom = createRef();
        
        let finalValues = addSelectedProp(values, mapping, defaultValue);
        let selectedItems = getSelectedItems(finalValues);

        this.state = {
            open : false,
            values :finalValues ,
            selectedItems ,
            initilaValues : values,
            // hasError : this.validate(selectedItems).hasError,
            // errorMessage : this.validate(selectedItems).errorMessage,
            searchValue : '',
            //validate : this.validate.bind(this)
        }
        
    }


    static getDerivedStateFromProps (props, state) {
        if (
            !_.isEqual(props.values, state.initialValues) 
        )
        {
            const {values ,mapping, defaultValue} = props;     
            let finalValues = addSelectedProp(values, mapping, defaultValue);
            let selectedItems = getSelectedItems(finalValues);

            return {
                values :finalValues ,
                selectedItems ,
                initilaValues : values,
                initialDefaultValue : defaultValue,
            }

        }

        return null;
    }

    /**
     * Detect validation mode
     */
    isValidationMode (){
        const {required, serverError} = this.props;

        const validationMode =required || serverError ? true : false;
        return validationMode;
    }

    /**
     * Check if select has error or not depends on our configs
     * 
     */
    validate (selectedItems = []){
         
        const {serverError, required} = this.props;
        let hasError = false;
        let errorMessage = '';

        if(!this.isValidationMode()) return {hasError,errorMessage} ;
       
        if(serverError && serverError.status) {
            hasError = true;
            errorMessage = serverError.message;
        }
        else if(!serverError && required && selectedItems.length === 0){
            hasError = true;
            errorMessage = required;
        }
 
        this.setState({hasError, errorMessage});
        return {hasError, errorMessage}
    }


    /**
     * Open options
     * 
     * @param {Event} e 
     */
    open (e){
        const {disabled} = this.props;
        if (disabled) return;

        this.setState((prevState) => {
            return { open : !prevState.open}
        });
     
    }

    /**
     * Close options
     * 
     * @param {Event} e 
     */
    close  = e =>{
        const { change} = this.props;

        this.setState({open : false});

        change(this.state.selectedItems)
        
    }

    /**
     * Open options
     * 
     * @param {Event} e 
     */
    toggle (e){
        const {disabled} = this.props;
        
        if (disabled) return;

        this.setState((prevState) => {
            return { open : !prevState.open}
        });

    }

    /**
     * Toggle select optionss
     * 
     * @param {Object} item 
     */
    toggleSelect = (item ,index) =>{
        let values = Array.from(this.state.values);
        values[index].selected = !values[index].selected;

        let selectedItems = getSelectedItems(values);

        this.setState({
            selectedItems,
            values ,
        })
    }


    /**
     * Deselect all options
     */
    deselectOptions =() =>{
        let values = Array.from(this.state.values);
        values.forEach(o => (o.selected = false));

        let selectedItems = getSelectedItems(values);

        this.setState({
            selectedItems,
            values ,
        })
        
    }

    /**
     * Add null values to options
     */
    createNullValue (){
        const {rtl} = this.props;

        const notSelected = rtl ? 'انتخاب نشده' : 'No Selected';
        return (
            <div key="null" className="r-options-item" onClick={this.deselectOptions}>
                {notSelected}
            </div>
        )
    }

    /**
     * Render select optionsmulti
     */
    renderOptions (){
        const {mapping, search , rtl, nullable} = this.props;
        const {values  } = this.state;
        let options;

        //If options list is empty show "Not Found"
        if (values.length === 0) {
            const notFoundText = rtl ? 'یافت نشد' : 'Not Found';
            options = (<div className="r-options-item">{notFoundText}</div>)
        }
        else {
            options = values.map((o, i) => {
                return (
                    <div key={i} className="r-options-item" onClick={this.toggleSelect.bind(this,o,i)}>
                      
                        {
                            <Checkbox 
                                size={'xs'}
                                justViewMode={true} 
                                nospace={true} 
                                rtl={rtl} 
                                defaultValue={o.selected}
                            />
                        }

                        {   mapping.icon &&
                            <span className="r-option-icon">
                                {FN.createIcon(FN.getValueByProp(o, mapping.icon))}
                            </span> 
                        }

                        {this.getItemText(o, '-')}
                    </div>
                )
            })
            if (nullable) {
                options.unshift(this.createNullValue())
            }
        }
        
        return (
            <div className="r-options" ref={d => {FN.handlePosition(d)}}>
                {search && this.renderSearch()}
                <div className="r-options-items">{options}</div>
            </div>
        )
        
    }

    /**
     * Search in select options
     * 
     * @param {Event} e 
     */
    search (e){
        const {mapping} = this.props;
        const {initilaValues} = this.state;

        const value = e.target.value;

        //Store search value in state
        this.setState({searchValue : value})

        //Reset list if input hasnt value
        if(value.length === 0) {
            this.setState({values :initilaValues})
        }

        //Search
        const target = value.toLowerCase();
        const foundValues = initilaValues.filter(o => {
            return o[mapping.text].toLowerCase().indexOf(target)!== -1
        });

        this.setState({values : foundValues})
    }

    /**
     * Render options search  
     */
    renderSearch (){
        const { rtl} = this.props;
        const {searchValue} = this.state;
        const searchLableText = rtl ? 'جستجو ...' : 'Search ...';

        return (
            <div className="r-options-search">
                <input value={searchValue} onChange={this.search.bind(this)} placeholder={searchLableText} type="text" />
            </div>
        )
    }

    /**
     * Get list item value
     * 
     * @param {Object} item 
     * @param {String} seperator is between key and text
     * @returns {String}
     */
    getItemText (item){
        const {mapping, showKey} = this.props;

        const text = item[mapping.text];
        const value = item[mapping.value];
        const key = showKey ? `${value} ,`: '' ;
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
    getInputText (){
        const {mapping, showKey, rtl} = this.props;
        const {selectedItems} = this.state
        let inputText = '';

        if (!selectedItems || selectedItems.length === 0) {
            const notSelected = rtl ? 'انتخاب نشده' : 'No Selected';
            return notSelected;      
        }

        selectedItems.forEach((o,i) =>{
            const text = o[mapping.text];
            const value = o[mapping.value];
            const seperator = selectedItems.length >1 && i>0 ? ' , ' : '';
            const key = showKey ? `${value}`  : '' ;
            inputText += `${seperator}${key} ${text}`;

        })
        
        return inputText
    }

    /**
     * Get style
     */
    getSelectClass (){
        const { mapping, rtl, disabled, outline, className} = this.props;
        const { hasError, open} = this.state;
        const validationMode = this.isValidationMode();

        let names =  {
            [className] : className ? true : false,
            'active' :open, 
            'r-multiselect r-noselect r-input filled' : true,
            'r-rtl': rtl,
            'r-bordered': outline,
            'r-disabled' : disabled,
            'r-has-icon' : mapping.icon,
            'r-error' :  validationMode && hasError,
        }

        return FN.mapObjectToClassName(names)
    }

    render (){
        const { label, mapping, disabled, style} = this.props;
        const {errorMessage, hasError,open, selectedItems} = this.state;

        const inputValue = this.getInputText();
        const renderIcon = mapping.icon ? FN.createIcon(FN.getValueByProp(selectedItems, mapping.icon)) : '';

        return (
            <Fragment>
                 
                <div style={style} className={this.getSelectClass()}>
                {open && <Backdrop onClick={this.close} />}
                   
                    <input 
                        onKeyDown={this.arrowKey}
                        onClick={this.toggle.bind(this)}
                        disabled={disabled} 
                        type="text" 
                        onChange={()=>{}} 
                        value={inputValue.trim()}   
                    />

                    {label && <label>{label}</label>}

                    { mapping.icon && <span className="r-input-icon">{renderIcon}</span> }

                    <span onClick={this.open.bind(this)} className="r-icon">{icons.down}</span>     

                    { hasError && <span className="r-message">{errorMessage}</span> }

                    {open && this.renderOptions()} 
                </div>
            </Fragment>
        )
    }
}

MultiSelect.defaultProps = {
    rtl : false,
    outline : false,
    disabled : false,
    nullable : false,
    style : {},
    defaultValue : [],
    
}

export default MultiSelect
