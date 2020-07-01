import React, {Component, Fragment} from 'react';
import TableContext from './TableContext';
import Cell from './Cell';


class Row extends Component {
    static contextType = TableContext;

    renderCells (){
        const {columns, activeRow} = this.context;
        const {row, index} = this.props;
        const isEditMode = activeRow !== null && activeRow === index;

        return columns.map((o, i) => {
            return (
                <Cell
                    editMode={isEditMode}
                    key={i}
                    row={row}
                    col={o}
                    rowIndex = {index}
                />
            )
        })
    }


    render (){
        const {index} = this.props;
        const {startEdit} = this.context;

        return (
            <Fragment>
                <tr onClick={() => {startEdit(index)}}>
                    {this.renderCells()} 
                </tr>
            </Fragment>
        )
    }
}


export default Row