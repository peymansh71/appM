import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import Grid from '../../components/Grid/Grid';
import Masterpage from '../../layouts/Masterpage/Masterpage';
import Modal from '../../components/Modal/Modal'
import { mapStore } from '../../Store/Store'


import { CreateState, UpdateState, GetState, DeleteState, CreateForm } from '../../utils/axiosMethod';


async function loadGird({ columns, pageSize, pageNumber }) {

    const requestFilters = columns.filter(o => o.filterText.trim() !== '').map((o, i) => {
        return {
            field: o.title,
            type: o.filterType,
            fieldValue: o.filterText,
            dataType: o.dataType, //int string
            tableName: o.tableName,
            fieldName: o.fieldName
        }
    })
    const requestSort = columns.filter(o => o.sort.show).map((o, i) => {
        if (o.sort.show) {
            return {
                field: o.title,
                type: o.sort.desc ? 'desc' : 'asc'
            }
        }
    })
    const request = {
        pageSize,
        pageNumber,
        filters: requestFilters,
        sort: requestSort
    }
    const res = await GetState(request)
    debugger
    return {
        Items: res.data.items,
        pageCount: res.data.pageCount
    }
}
async function loadModal(row) {
    const request = {
        //dataaaaaa
        "id": 37, "actionType": 1
    }
    const result = await CreateForm(request)
    let modalData = result.data;
    debugger
    if (row) {
        modalData.items.forEach(o => {
            if (o.type === "checkbox") {
                o.value = row[o.field] === "فعال" ? true : false
            }
            else
                o.value = row[o.field]
            // o.required = true;
        })
        return modalData
    }
    else {
        return modalData
    }
}
const namespace = {
    grid: 'StateList',
    modal: 'StateModal'
}

class State extends Component {
    state = {
        modal: false,
        modalRowId: null,
        reloadGrid: false,
        isDelete: false
    }
    reloaded = () => {
        this.setState({
            reloadGrid: false
        })
    }
    addModal = () => {
        this.setState({
            modal: true,
        })
    }
    editModal = (row) => {
        this.setState({
            modal: true,
            modalRowId: row
        })
    }

    closeModal = () => {
        this.setState({ modal: false, modalRowId: null })
    }

    getIndex = (arr, id) => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return i
            }
        }
    }
    saveModal = async (data) => {


        for (var i = 0; i < data.items.length; i++) {
            if (data.items[i].required === "true")
                if (data.items[i].value === null || data.items[i].value === '' & data.items[i].type !== "checkbox") {
                    toast.warning('لطفا فیلد های ضروری را وارد کنید')
                    return
                }
        }

        const { setStore, getStore } = this.context;
        let store = getStore();
        let obj = {}

        data.items.forEach((n, i) => {
            if (n.type === 'select') {
                obj[n.field] = n.value ? (n.value.id ? n.value.id : n.value) : null
            }
            else if (n.type === 'datepicker') {
                obj[n.field] = n.value ? (n.value.dateStr === null ? "" : n.value.dateStr) : ""
            }
            else if (n.type === 'checkbox') {
                obj[n.field] = n.value !== "" ? n.value : false
            }
            else if (n.type === "number") {
                obj[n.field] = n.value !== "" ? n.value : 0
            }
            else {
                obj[n.field] = n.value
            }
        })

        if (data.id)
            obj["id"] = data.id.id
        debugger
        //edit
        if (data.id) {
            try {
                const res = await UpdateState(JSON.parse(JSON.stringify([obj])))
                if (res.status === 200) {
                    this.setState({ reloadGrid: true });
                    this.closeModal()
                    // let rows = store.grid[namespace.grid].items;
                    // store.grid[namespace.grid].items[this.getIndex(rows, data.id)] = res
                    // store.grid[namespace.grid].items.push(res)
                    // setStore('grid', store.grid);
                    toast.success('با موفیقت انجام شد')
                    this.setState({
                        modal: false,
                    })
                }
            }
            catch (ex) {
                if (ex.response && ex.response.status === 400)
                    toast.error("خطایی رخ داده است", {
                        autoClose: 2500
                    })
            }
        }
        //add
        else {
            // setStore('grid', store.grid)
            try {
                const res = await CreateState(JSON.parse(JSON.stringify([obj])));

                if (res.status === 200) {
                    this.setState({ reloadGrid: true });
                    this.closeModal()
                    // const { setStore, getStore } = this.context;
                    // let store = getStore();
                    // store.grid[namespace.grid].items.push(res.data)
                    // setStore('grid', store.grid)
                    toast.success('با موفیقت انجام شد')
                    this.setState({
                        modal: false,
                    })
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400)
                toast.error("خطایی رخ داده است" ,{
                    autoClose: 2500
                  })
            }
        }
    }
    removeGridRow = async (row, index) => {
        await Swal.fire({
            title: `<span>ایا از حذف رکورد <strong>${index}<strong> مطمئن هستید ؟ </span>`,
            // text: "You won't be able to revert this!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله',
            cancelButtonText: 'خیر',
            width: "auto",
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((result) => {
            if (result.value)
                this.setState({ isDelete: true })
            else
                this.setState({ isDelete: false })
        })
        if (this.state.isDelete) {
            const obj = row
            for (let element in obj) {
                if (obj[element] === "فعال") {
                    obj[element] = true
                }
                else if (obj[element] === "غیر فعال") {
                    obj[element] = false
                }
            }
            const res = await DeleteState(JSON.parse(JSON.stringify([obj])))
            if (res.status === 200) {
                toast.success(`رکورد مورد نظر حذف گردید`)
                return true
            }
            else
                return false;
        }
    }
    render() {
        const { modal, modalRowId, reloadGrid } = this.state;

        return (
            <Masterpage>
                {modal && <Modal
                    id={namespace.modal}
                    api={loadModal}
                    rowId={modalRowId}
                    cancel={this.closeModal}
                    save={this.saveModal}
                    close={this.closeModal}
                />}
                <button type="button" onClick={this.addModal}>
                    <span className="mdi mdi-plus-thick"></span> افزودن
                </button>
                <Grid
                    id={namespace.grid}
                    api={loadGird}
                    edit={this.editModal}
                    reload={reloadGrid}
                    reloaded={this.reloaded}
                    remove={this.removeGridRow}
                    columns={[
                        { title: 'code', showTitle: 'کد', type: 'string', tableName: "GNR.tblState", fieldName: "code" },
                        { title: 'name', showTitle: 'نام', type: 'string', tableName: "GNR.tblState", fieldName: "name" },
                        { title: 'abbrev', showTitle: 'abbrev', type: 'string', tableName: "GNR.tblState", fieldName: "abbrev" },
                        { title: 'maxTimeForTheState', showTitle: 'maxTimeForTheState', type: 'string', tableName: "GNR.tblState", fieldName: "maxTimeForTheState" },
                        { title: 'internalCode', showTitle: 'internal code', type: 'string', tableName: "GNR.tblState", fieldName: "internalCode" },
                        { title: 'situation', showTitle: 'situation', type: 'string', tableName: "GNR.tblState", fieldName: "situation" },
                        { title: 'ocurredEventAlert', showTitle: 'ocurred event alert', type: 'string', tableName: "GNR.tblState", fieldName: "ocurredEventAlert" },
                        { title: 'consumesFuel', showTitle: 'consumes fuel', type: 'string', tableName: "GNR.tblState", fieldName: "consumesFuel" },
                        { title: 'disablesProductionFlow', showTitle: 'disables production flow', type: 'string', tableName: "GNR.tblState", fieldName: "disablesProductionFlow" },
                        { title: 'dataRequiredTheContingency', showTitle: 'data required the contingency', type: 'string', tableName: "GNR.tblState", fieldName: "dataRequiredTheContingency" },
                    ]}
                    pageSize={100} // 100 300 500 700 1000 1500
                />

            </Masterpage>

        )
    }
}


mapStore(State)

export default State;