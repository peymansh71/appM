import React, { Component } from 'react';
import Swal from 'sweetalert2'
import Grid from '../../components/Grid/Grid';
// import data from '../FakeData/GridData';
import Masterpage from '../../layouts/Masterpage/Masterpage';
import Modal from '../../components/Modal/Modal'
import { mapStore } from '../../Store/Store'
// import httpsService from '../services/httpsService'
import { toast } from 'react-toastify';
import { CreatePersonel, UpdatePersonel, GetPersonel, DeletePersonel, CreateForm } from "../../utils/axiosMethod";



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
    const res = await GetPersonel(request)

    return {
        Items: res.data.items,
        pageCount: res.data.pageCount
    }
}
async function loadModal(row) {
    const request = {
        "id": 34, "actionType": 1
    }
    const result = await CreateForm(request);
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
    grid: 'PersonelList',
    modal: 'PersonelModal'
}

class Personel extends Component {
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
                obj[n.field] = n.value ? (n.value.dateStr===null ? "" : n.value.dateStr) : ""
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
                const res = await UpdatePersonel(JSON.parse(JSON.stringify([obj])))
                if (res.status === 200) {
                    this.closeModal()
                    this.setState({ reloadGrid: true });
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
                    toast.error("خطایی رخ داده است")
            }
        }
        //add
        else {
            // setStore('grid', store.grid)
            try {
                const res = await CreatePersonel(JSON.parse(JSON.stringify([obj])));


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
                    toast.error("خطایی رخ داده است")
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
            const res = await DeletePersonel(JSON.parse(JSON.stringify([obj])))

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
                        { title: 'code', showTitle: 'کد', type: 'string', tableName: "GNR.tblPersonel", fieldName: "code" },
                        { title: 'name', showTitle: 'نام', type: 'string', tableName: "GNR.tblPersonel", fieldName: "name" },
                        { title: 'familyName', showTitle: 'نام خانوادگی', type: 'string', tableName: "GNR.tblPersonel", fieldName: "familyName" },
                        { title: 'nationalId', showTitle: 'کد ملی', type: 'string', tableName: "GNR.tblPersonel", fieldName: "nationalId" },
                        { title: 'fatherName', showTitle: 'نام پدر', type: 'string', tableName: "GNR.tblPersonel", fieldName: "fatherName" },
                        { title: 'cellPhone', showTitle: 'تلفن همراه', type: 'string', tableName: "GNR.tblPersonel", fieldName: "cellPhone" },
                        { title: 'photo', showTitle: 'تصویر', type: 'string', tableName: "GNR.tblPersonel", fieldName: "photo" },
                        { title: 'startDate', showTitle: 'تاریخ شروع به کار', type: 'string', tableName: "GNR.tblPersonel", fieldName: "startDate" },
                        { title: 'job', showTitle: 'شغل', type: 'string', tableName: "GNR.tblJob", fieldName: "job" },
                        { title: 'status', showTitle: 'وضعیت', type: 'string', tableName: "GNR.tblPersonel", fieldName: "status" },
                    ]}
                    pageSize={100} // 100 300 750 700 1000 1750
                />

            </Masterpage>

        )
    }
}


mapStore(Personel)

export default Personel;