import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import Grid from '../../components/Grid/Grid';

import Masterpage from '../../layouts/Masterpage/Masterpage';
import Modal from '../../components/Modal/Modal'
import { mapStore } from '../../Store/Store'


import { CreateEquipment, UpdateEquipment, DeleteEquipment, GetEquipment, CreateForm } from '../../utils/axiosMethod';



//Load Grid View 
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
    const res = await GetEquipment(request)
    debugger
    return {
        Items: res.data.items,
        pageCount: res.data.pageCount
    }
}
async function loadModal(row) {
    debugger
    const request = { "id": 20, "actionType": 1 }
    const result = await CreateForm(request)
    let modalData = result.data;
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
        //در خواست افزودن
        return modalData
    }
}
const namespace = {
    grid: 'equipmentList',
    modal: 'equipmentModal'
}

class Equipment extends Component {
    state = {
        modal: false,
        modalRowId: null,
        reloadGrid: false,
        isDelete: false,
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
        debugger
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
        //edit
        if (data.id) {
            try {
                const res = await UpdateEquipment(JSON.parse(JSON.stringify([obj])))
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
                const res = await CreateEquipment(JSON.parse(JSON.stringify([obj])));
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
                    toast.error("خطایی رخ داده است", {
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
            const res = await DeleteEquipment(JSON.parse(JSON.stringify([obj])))

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
                        { title: 'code', showTitle: 'کد', type: 'string', tableName: "GNR.tblEquipment", fieldName: "code" },
                        { title: 'name', showTitle: 'نام', type: 'string', tableName: "GNR.tblEquipment", fieldName: "name" },
                        { title: 'equipmentTypeName', showTitle: 'نوع تجهیز ', type: 'int', tableName: "GNR.tblequipmentType", fieldName: "name" },
                        { title: 'modelName', showTitle: 'مدل', type: 'string', tableName: "GNR.tblmodel", fieldName: "name" },
                        { title: 'groupName', showTitle: 'طبقه', type: 'string', tableName: "GNR.tblgroup", fieldName: "name" },
                        { title: 'tabName', showTitle: 'تب', type: 'string', tableName: "GNR.tblTab", fieldName: "name" },
                        { title: 'ihmCode', showTitle: 'IHM', type: 'string', tableName: "GNR.tblIhm", fieldName: "code" },
                        { title: 'tag', showTitle: 'تگ', type: 'string', tableName: "GNR.tblEquipment", fieldName: "tag" },
                        { title: 'startDate', showTitle: 'تاریخ شروع', type: 'string', tableName: "GNR.tblEquipment", fieldName: "startDate" },
                        { title: 'shiftName', showTitle: 'شیفت', type: 'string', tableName: "GNR.tblShift", fieldName: "shiftName" },
                        { title: 'consumption', showTitle: 'مصرف سوخت (l/h)', type: 'string', tableName: "GNR.tblEquipment", fieldName: "consumption" },
                        { title: 'plat', showTitle: 'پلات', type: 'string', tableName: "GNR.tblEquipment", fieldName: "plat" },
                        { title: 'activityGroup', showTitle: 'ﮔﺮوه ﻓﻌﺎﻟﻴﺖ ', type: 'string', tableName: "GNR.tblEquipment", fieldName: "activityGroup" },
                        { title: 'naturOfGroup', showTitle: 'نوع مالکیت ', type: 'string', tableName: "GNR.tblEquipment", fieldName: "naturOfGroup" },
                        { title: 'deactivate', showTitle: 'وضعیت', type: 'string', tableName: "GNR.tblEquipment", fieldName: "deactivate" },
                        { title: 'deactivationDate', showTitle: 'تاریخ عدم فعالیت', type: 'string', tableName: "GNR.tblEquipment", fieldName: "deactivationDate" },
                        { title: 'transferEquipment', showTitle: 'transferEquipment', type: 'string', tableName: "GNR.tblEquipment", fieldName: "transferEquipment" },
                        { title: 'returnEquipment', showTitle: 'return Equipment', type: 'string', tableName: "GNR.tblEquipment", fieldName: "returnEquipment" },
                        { title: 'preciseProperties', showTitle: 'Precise properties', type: 'string', tableName: "GNR.tblEquipment", fieldName: "preciseProperties" },
                        { title: 'tireTypes', showTitle: 'نوع چرخ', type: 'string', tableName: "GNR.tblEquipment", fieldName: "tireTypes" },

                    ]}
                    pageSize={100} // 100 300 500 700 1000 1500
                />
            </Masterpage>

        )
    }
}

mapStore(Equipment)
export default Equipment;
