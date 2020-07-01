import React, { Component, createRef } from 'react';
import { Button, Input, Select, DatePicker, CheckBox , File } from '../Form';
import { mapStore } from '../../Store/Store';
import Loading from '../loading/loading'
import $ from 'jquery'

import './Modal.css';
import { ToastContainer, Zoom } from 'react-toastify';


class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: null,
            title: 'در حال بارگذاری'
        }
        this.modelDom = createRef()
    }


    changeHandler = (field, val) => {

        const { change } = this.props;
        this.state.items.filter(o => {
            return o.field === field
        })[0].value = val;

        this.setState(() => {
            return {
                items: this.state.items
            }
        }, () => {
            change(this.state.items)
        })

    }

    componentDidMount() {
        const { save, cancel } = this.props;
        this.load(() => {


            setTimeout(() => {
                var m = $(this.modelDom.current);
                m.find('input').eq(0).focus()
            }, 1000)

        });

        //   $('body').keyup((e)=>{
        //       if ($('body').hasClass('r-modal-open')) {
        //         if (e.keyCode === 13) {
        //             setTimeout(()=>{
        //                 this.save.call(this)
        //             },1000)

        //         }
        //         else if (e.keyCode === 27) {
        //             cancel()
        //         }
        //       }

        //   })



    }



    delay = (t, cb) => {
        setTimeout(cb, t)
    }


    load = async (cb) => {
        const { actions } = this.context;
        const { api, id, rowId } = this.props;

        const res = await api(rowId);
        cb && cb()
        await actions.loadModal(id, { ...this.props, ...res });

        await this.setState({
            items: res.items,
            title: res.title
        })
    }
    createForm = () => {
        const { items } = this.state;
        const formItems = items.map((o, i) => {

            let req = typeof o.required === 'boolean' ? o.required : JSON.parse(o.required);
            if (o.type === 'input') {
                return <div className="model-item"><Input type={o.type} key={i} required={req} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            }
            else if (o.type === 'text1') {
                return <div className="model-item"><Input type={o.type} key={i} required={req} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            }
            else if (o.type === 'select') {
                return <div className="model-item"><Select type={o.type} key={i} required={req} items={o.items} mapping={o.mapping} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            }
            // else if (o.type === 'color') {
            //     return <div className="model-item"><Select key={i} required={req} items={o.items} mapping={o.mapping} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            // }
            else if (o.type === 'selectcolor') {
                return <div className="model-item"><Select key={i} required={req} items={o.items} mapping={o.mapping} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            }
            else if (o.type === 'datepicker') {
                return <div className="model-item"><DatePicker key={i} required={req} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            }
            else if (o.type === 'checkbox') {
                return <div className="model-item"><CheckBox key={i} required={req} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            }
            // else if (o.type === 'color') {
            //     return <div className="model-item"><Input type={o.type} key={i} required={req} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            // return <div className="modal-item"><SelectColor key={i} required={req} label={o.label} value={o.value} change={this.changeHandler.bind(this,o.field)}/></div>
            // }
            else if (o.type === 'number') {
                return <div className="model-item"><Input type={o.type} key={i} required={req} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            }
            else if (o.type === 'textarea') {
                return <div className="model-item"><Input type={o.type} key={i} required={req} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            }
            else if (o.type === 'file') {
                return <div className="model-item"><File type={o.type} key={i} required={req} label={o.label} value={o.value} change={this.changeHandler.bind(this, o.field)} /></div>
            }
        })

        return (
            <form autocomplete="off" >
                <div className="modal-item-wrapper">
                    {formItems}
                </div>
            </form>
        )
    }


    save = () => {
        const { save, rowId } = this.props;
        const { items, title } = this.state;

        save({
            items,
            title,
            id: rowId

        })
    }
    render() {
        const { save, cancel, close } = this.props;
        const { items, title } = this.state;
        if (!$('body').hasClass('r-modal-open')) {
            $('body').addClass('r-modal-open')
        }
        return (
            <div className="r-modal" >
                <ToastContainer position="top-right"
                    containerId="1"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    limit={1}
                    pauseOnFocusLoss
                    draggable={false}
                    transition={Zoom}
                    enableMultiContainer={false}
                    pauseOnHover />
                <div className="r-modal-wrapper">
                    <div className="r-modal-header">
                        <h2>{title}</h2>
                        <span className="mdi mdi-close" onClick={close}></span>
                    </div>
                    <div className="r-modal-content" ref={this.modelDom}> {items === null ? <Loading /> : this.createForm()} </div>

                    {items !== null && <div className="r-modal-footer">
                        <Button action={this.save} text="ذخیره" />
                        <Button className="default" action={cancel} text="انصراف" />
                    </div>}
                </div>
            </div>
        )
    }
}
Modal.defaultProps = {
    change: (val) => { }
}
mapStore(Modal);
export default Modal;