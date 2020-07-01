import React, {Component} from 'react';
import {Input, Button} from '../../components/Form';




class Login extends Component {

    render () {
        return (
            <div className="login">
                <div className="login-logo">
                    <img src="images/logo.svg" alt="" />
                    <h1>نرم افزار مدیریت یکپارچه معدن</h1>
                </div>  
                <div className="login-form">
                    <div className="login-form-elements">
                    <h1>ورود به سیستم</h1>
                    <Input
                        label={'نام کاربری'}
                        bg={true}
                        left={true}
                        value="ssad"
                        change={(v)=>{
                        console.log(v)
                        }}
                    />
                    <Input
                        label={'رمز عبور'}
                        bg={true}
                        value="ssad"
                        left={true}
                        type={'password'}
                        change={(v)=>{
                        console.log(v)
                        }}
                    />
                    <Button style={{width:'300px', marginTop:36, fontSize:18, padding:12}} action={()=>{}} text="ورود به سیستم" />
                    </div>
                </div>
            </div>
        )
    }
}



export default Login;
