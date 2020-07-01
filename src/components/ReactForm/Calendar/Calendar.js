import React, {Component,Fragment} from 'react';
import CalendarContext from './CalendarContext';
import BaseCalendarContext from './BaseCalendarContext';
import DaysHeader from './DaysHeader';
import Days from './Days';
import MonthsHeader from './MonthsHeader';
import Months from './Months';
import '../ReactForm.css';
import './Calendar.css';



class Calendar extends Component {
    static contextType = BaseCalendarContext;
    
    constructor(props){
        super(props);
  
        this.state = {
            mode : 'days',//default

        }
    }   

    setMode = (mode) => {
        this.setState({mode})
    }


    getContextValue (){
        const {change,selectedYear,selectedYear2,selectedMonth , selectedMonth2} = this.context;
        const {id} = this.props;
        const {mode} = this.state;

        return {
            ...this.context,
            ...this.state,
            setMode : this.setMode,
            id ,
            month : id === '1' ? selectedMonth: selectedMonth2 ,
            year : id === '1' ? selectedYear: selectedYear2 ,
            mode
            
        }
    }

    render (){
        const {mode} = this.state;
        const {jalali, monthOnly} = this.context;
        const rtlClass = jalali ? 'r-rtl' : '';
        return (
            <CalendarContext.Provider value ={this.getContextValue()}>
                <div className={`r-calendar ${rtlClass}`}>
                    <div className="r-calendar-wrapper">

                    {   !monthOnly ?  
                            (
                                mode === 'days' ?
                                <Fragment> <DaysHeader   /> <Days   /> </Fragment> :
                                <Fragment> <MonthsHeader /> <Months /> </Fragment>
                            ) : 
                            <Fragment> <MonthsHeader /> <Months /> </Fragment>

                        }
                        
                        {/* <div class="r-calendar-footer">
                            <button onClick={this.setToday} type="button" class="r-button r-ripple r-nospace"> {jalali ? 'امروز' : 'today'} </button>
                        </div> */}
                    </div>
                </div>
            </CalendarContext.Provider>
        )
    }
}

Calendar.defaultProps = {
    jalali : false,
    multiselect : false,
}
export default Calendar