import React, {Component} from 'react';
import TableContext from './TableContext';
import Input from '../Input/Input';
import Select from '../Select/Select';

class Cell extends Component {
    static contextType = TableContext;
    
    renderSelect(){
        const {row, rowIndex, col, editMode} = this.props;
        const {changeCell} = this.context;
        const value = row[col.field];
        
        if (editMode) {
            return (
                <Select
                    style={{margin:0, zIndex : 11}}
                    defaultValue={value}
                    change={val => {changeCell(rowIndex, col, val[col.mapping.value])}}
                    mapping={col.mapping}
                    values = {col.values}
    
                />
            )
        }
        else {
            const found = col.values.filter(o => {
                return o[col.mapping.value] === value
            })

            return (found.length ? found[0][col.mapping.text] : '') 
        }
        
        
    }

    renderInput(){
        const {row, rowIndex, col, editMode} = this.props;
        const {changeCell} = this.context;
        const value = row[col.field]

        if (editMode) {
            return (
                <Input
                    style={{margin:0, zIndex : 10}}
                    value={value}
                    change={val => {changeCell(rowIndex, col, val) }}
                />
            )
        }
        else {
            return value
        }
    }


    renderValue (){
        const {col} = this.props;

        if (col.type === 'select') {
            return this.renderSelect()
        }
        else {
            return this.renderInput()
        }
    }
    render (){
        const {col} = this.props;
        const {editMode} = this.props;

        return (
            
            <td  className={`${editMode ? 'edit' : ''}`} data-title={col.field} >
                <div className="r-cell">
                {this.renderValue() }
                </div>
            </td>  
        )
    }
}


export default Cell