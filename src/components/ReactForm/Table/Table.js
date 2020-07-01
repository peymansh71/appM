import React, {Component} from 'react'
import TableContext from './TableContext';
import Row from './Row';
import Backdrop from '../Backdrop/Backdrop'

import './Table.scss';


class Table extends Component {

    constructor (props) {
        super(props);

        this.state = {
            data  : this.props.data,
            editMode : false,
            activeRow : null
        }
    }

    renderRows (){
        const {data} = this.state;
        
        return data.map((o, i) => {
            return (
                <Row key={i} index={i} row={o} />
            )
        });
    }

    renderColumns (){
        const {columns} = this.props;

        const cols =  columns.map((o, i) => {
            return <th key={i} style={{width : o.width}}>{o.field}</th>
        });

        return (<tr>{cols}</tr>) 
    }

    /**
     * Update cell value
     * 
     * @param {Number} rowIndex
     * @param {Object} col
     * @param {Any} value
     */
    changeCell = (rowIndex, col, value) => {
        const {change} = this.props;

        let data = Array.from(this.state.data);
        data[rowIndex][col.field] = value;

        this.setState({data});
        change(data)
    }

    startEdit = (index) => {
        this.setState({ editMode : true , activeRow : index})
    }

    endEdit = () => {
        this.setState({ editMode : false, activeRow : null })
    }


    render (){
        const {columns, edit} = this.props;
        const {data, editMode, activeRow} = this.state;

        const contextValue = {
            columns,
            data,
            edit,
            activeRow,
            startEdit : this.startEdit,
            endEdit : this.endEdit,
            changeCell : this.changeCell,
        }

        return (
            <TableContext.Provider value={contextValue}>

                {editMode && <Backdrop onClick={this.endEdit} />}

                <div className="r-table">
                    {/* <div className="table-header">
                        <span className="table-title">Material Datatable</span>
                        <div className="actions">
                        <a href="#" className="search-toggle waves-effect btn-flat nopadding"><i className="material-icons">search</i></a>
                        </div>
                    </div> */}
                    <table>
                        <thead>
                            {this.renderColumns()}
                        </thead>
                        <tbody>
                            {this.renderRows ()}
                        </tbody>
                    </table>
                </div>
            </TableContext.Provider>
        )
    }
}

Table.defaultProps = {
    edit : false ,
}

export default Table