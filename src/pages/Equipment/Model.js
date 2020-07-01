import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import Grid from '../../components/Grid/Grid';
import Masterpage from '../../layouts/Masterpage/Masterpage';
import Modal from '../../components/Modal/Modal'
import { mapStore } from '../../Store/Store'
import { CreateModel, UpdateModel, GetModel, DeleteModel, CreateForm } from '../../utils/axiosMethod';


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
    const res = await GetModel(request)
    debugger
    return {
        Items: res.data.items,
        pageCount: res.data.pageCount
    }
}
async function loadModal(row) {
    const request = {
        "id": 31, "actionType": 1
    }
    const result = await CreateForm(request);
    debugger
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
    grid: 'ModelList',
    modal: 'ModelModal'
}

class Model extends Component {
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
                const res = await UpdateModel(JSON.parse(JSON.stringify([obj])))
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
                    toast.error("خطایی رخ داده است", {
                        autoClose: 2500
                    })
            }
        }
        //add
        else {
            // setStore('grid', store.grid)
            try {
                const res = await CreateModel(JSON.parse(JSON.stringify([obj])));

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
        debugger
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
            const res = await DeleteModel(JSON.parse(JSON.stringify([obj])))
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
                        { title: 'code', showTitle: 'کد', type: 'string', tableName: "GNR.tblmodel", fieldName: "code" },
                        { title: 'name', showTitle: 'نام', type: 'string', tableName: "GNR.tblmodel", fieldName: "name" },
                        { title: 'equipmentTypeName', showTitle: 'نوع تجهیز', type: 'string', tableName: "GNR.tblequipmentType", fieldName: "name" },
                        { title: 'stategroupName', showTitle: 'گروه وضعیت', type: 'string', tableName: "GNR.tblStateGroup", fieldName: "name" },
                        { title: 'imagegroupName', showTitle: 'گروه تصاویر', type: 'string', tableName: "GNR.tblimageGroup", fieldName: "name" },
                        { title: 'groupchecklist', showTitle: 'لیست گروه', type: 'string', tableName: "GNR.tblmodel", fieldName: "groupchecklist" },
                        { title: 'operationtype', showTitle: 'نوع عملیات تجهیزات', type: 'string', tableName: "GNR.tblmodel", fieldName: "operationtype" },
                        { title: 'predictedProductivity', showTitle: 'پیش بینی بهره وری', type: 'string', tableName: "GNR.tblmodel", fieldName: "predictedProductivity" },
                        { title: 'minlimitofproductivity', showTitle: 'مینیمم نرخ تولید ', type: 'string', tableName: "GNR.tblmodel", fieldName: "minlimitofproductivity" },
                        { title: 'maxlimitofproductivity', showTitle: 'ماکزیمم نرخ تولید', type: 'string', tableName: "GNR.tblmodel", fieldName: "maxlimitofproductivity" },
                        { title: 'zoonMinimum', showTitle: 'حداقل ....', type: 'string', tableName: "GNR.tblmodel", fieldName: "zoonMinimum" },
                        { title: 'radiusofinfluencearea', showTitle: 'شعاع منطقه نفوذ', type: 'string', tableName: "GNR.tblmodel", fieldName: "radiusofinfluencearea" },
                        { title: 'vectorImage', showTitle: 'تصویر برداری', type: 'string', tableName: "GNR.tblmodel", fieldName: "vectorImage" },
                        { title: 'weightMin_Ore', showTitle: 'حداقل ماده معدنی (Kg)', type: 'string', tableName: "GNR.tblmodel", fieldName: "weightMin_Ore" },
                        { title: 'weightMax_Ore', showTitle: 'حداکثر ماده معدنی (Kg)', type: 'string', tableName: "GNR.tblmodel", fieldName: "weightMax_Ore" },
                        { title: 'weightMin_Waste', showTitle: 'حداقل باطله (Kg)', type: 'string', tableName: "GNR.tblmodel", fieldName: "weightMin_Waste" },
                        { title: 'weightMax_Waste', showTitle: 'حداکثر باطله (Kg)', type: 'string', tableName: "GNR.tblmodel", fieldName: "weightMax_Waste" },
                        { title: 'originalTare', showTitle: 'وزن ماشین خالی (Kg)', type: 'string', tableName: "GNR.tblmodel", fieldName: "originalTare" },
                        { title: 'tareValueLimit', showTitle: 'بیشینه وزن ماشین', type: 'string', tableName: "GNR.tblmodel", fieldName: "tareValueLimit" },
                        { title: 'ownscale', showTitle: 'وزن سنج', type: 'string', tableName: "GNR.tblmodel", fieldName: "ownscale" },
                        { title: 'shovelfulMass', showTitle: 'گنجایش پاکت تجهیز (T)', type: 'string', tableName: "GNR.tblmodel", fieldName: "shovelfulMass" },
                        { title: 'shovelfulVolume', showTitle: 'گنجایش پاکت وسیله بارگیری (m3)', type: 'string', tableName: "GNR.tblmodel", fieldName: "shovelfulVolume" },
                        { title: 'fuelingCapacity', showTitle: 'ظرفیت مخزن سوخت (L)', type: 'string', tableName: "GNR.tblmodel", fieldName: "fuelingCapacity" },
                        { title: 'greenLevelyellow', showTitle: ' تعیین حد آستانه (سبز به زرد)', type: 'string', tableName: "GNR.tblmodel", fieldName: "greenLevelyellow" },
                        { title: 'yellowLevelred', showTitle: ' تعیین حد آستانه (زرد به قرمز)', type: 'string', tableName: "GNR.tblmodel", fieldName: "yellowLevelred" },
                        { title: 'notifygreenyellowchange', showTitle: 'تغییر وضعیت(سبز به زرد)', type: 'string', tableName: "GNR.tblmodel", fieldName: "notifygreenyellowchange" },
                        { title: 'notifyyellowredshift', showTitle: 'تغییر وضعیت (زرد به قرمز)', type: 'string', tableName: "GNR.tblmodel", fieldName: "notifyyellowredshift" },
                        // { title: '؟؟؟؟؟؟؟', showTitle: '؟؟؟؟؟؟', type: 'string', tableName: "GNR.tblmodel", fieldName: "name" },
                        { title: 'detailAxes', showTitle: 'محورهای جزئیات', type: 'string', tableName: "GNR.tblmodel", fieldName: "detailAxes" },
                        { title: 'associatehourmeters', showTitle: 'تشخیص نوع ساعت', type: 'string', tableName: "GNR.tblmodel", fieldName: "associatehourmeters" },
                        { title: 'toolTypes', showTitle: 'تجهیزات حفاری', type: 'string', tableName: "GNR.tblmodel", fieldName: "toolTypes" },
                    ]}
                    pageSize={100} // 100 300 500 700 1000 1500
                />

            </Masterpage>

        )
    }
}


mapStore(Model)

export default Model;