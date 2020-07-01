import React, {Component,Fragment} from 'react';
import Calendar from './Calendar';
import BaseCalendarContext from './BaseCalendarContext';
import ButtonPicker from './ButtonPicker';
import InputPicker from './InputPicker';
import RangeList from './RangeList';

import moment from 'moment-jalaali';

class BaseCalendar extends Component {
    constructor(props){
        super(props);
        const m = moment();

        this.state = {
            moment : m,
            selectedMonth: m,
            selectedMonth2: m.clone().add(1, `Month`) ,
            selectedYear : m,
            selectedYear2 : m.clone().add(1, `year`),
            selectedDay:  this.props.defaultValue || null,
            selectedDay2:   null,
            selectStep : 0, //0 = no select, 1 = firstSelect, 2 = secondSelect
            double : this.props.double,
            changeHistory : null,
            rangeHanlder :new RangeList(this.props.ranges || []),
        }
    }  
    

    setChange = (changeHistory) => {
        this.setState({ changeHistory })
    }

    setSelectStep = (step) => {
        this.setState({selectStep : step})
    }

    setDay = (day, isSecondSelect = false ) => {
        this.setState({ [isSecondSelect ? 'selectedDay2' : 'selectedDay' ] : day });

    }

    setMonth = (month, isSecondSelect = false) => {
        this.setState({ [isSecondSelect ? 'selectedMonth2' : 'selectedMonth' ] : month });
    }

    setYear = (year, isSecondSelect = false) => {
        this.setState({ [isSecondSelect ? 'selectedYear2' : 'selectedYear' ] : year });
    }

    nextYear = (year, isSecondSelect = false) => {
        if(!year) return;
        this.setState({ [isSecondSelect ? 'selectedYear2' : 'selectedYear' ] : year.clone().add(1, 'year') });
    }

    prevYear = (year, isSecondSelect = false) => {
        if(!year) return;
        this.setState({ [isSecondSelect ? 'selectedYear2' : 'selectedYear' ] : year.clone().subtract(1, 'year') });
    }

    nextMonth = (month, isSecondSelect = false) => {
        if(!month) return;
        this.setState({ [isSecondSelect ? 'selectedMonth2' : 'selectedMonth' ] : month.clone().add(1, 'month') });
        this.setState({ [isSecondSelect ? 'selectedYear2' : 'selectedYear' ] : month });
    }

    prevMonth = (month, isSecondSelect = false) => {
        if(!month) return;
        this.setState({ [isSecondSelect ? 'selectedMonth2' : 'selectedMonth' ] : month.clone().subtract(1, 'month') });
        this.setState({ [isSecondSelect ? 'selectedYear2' : 'selectedYear' ] : month });
    }
    nextDay = (day, isSecondSelect = false) => {
        if(!day) return;
        this.setState({ [isSecondSelect ? 'selectedDay2' : 'selectedDay' ] : day.clone().add(1, 'day') });
        this.setState({ [isSecondSelect ? 'selectedMonth2' : 'selectedMonth' ] : day });
    }

    prevDay = (day, isSecondSelect = false) => {
        if(!day) return;
        this.setState({ [isSecondSelect ? 'selectedDay2' : 'selectedDay' ] : day.clone().subtract(1, 'day') });
        this.setState({ [isSecondSelect ? 'selectedMonth2' : 'selectedMonth' ] : day });
    }
    toggleCalendar = ()=> {
        this.setState({ double : !this.state.double })
    }

    getContextValue (){
        const {jalali,range, monthOnly } = this.props;
        const { double} = this.state;

        return {
            ...this.state,
            ...this.props,
            jalali ,
            multiselect :double ? true :  range ,
            double  ,
            monthOnly,
            setDay : this.setDay,
            setSelectStep : this.setSelectStep,
            setMonth:this.setMonth,
            setYear:this.setYear,
            nextMonth:this.nextMonth,
            prevMonth:this.prevMonth,
            nextYear:this.nextYear,
            prevYear:this.prevYear,
            nextDay : this.nextDay,
            prevDay : this.prevDay,
            toggleCalendar : this.toggleCalendar,
            setChange : this.setChange,
            change : this.props.change,
        }
    }

    render (){
        const {double, datepicker, approve, datepickerButton, jalali} = this.props;

        return (
            <BaseCalendarContext.Provider value ={this.getContextValue()}>
                {   datepickerButton  ? <ButtonPicker approve={approve} /> :
                    datepicker  ? <InputPicker /> :
                    double      ?  <div className={`r-rangeCalendar ${datepickerButton ? '' : 'r-bordered'} ${jalali ? 'r-rtl' : ''}`}><Calendar id="1" /><Calendar id="2" /></div>:
                    <Calendar id="1" /> 
                }
            </BaseCalendarContext.Provider>
        )
    }
}

BaseCalendar.defaultProps = {
    jalali : false,
    range : false,
    datepikcer : false,
    double : false
}



export default BaseCalendar;