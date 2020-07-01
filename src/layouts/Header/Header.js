import React, { Component } from 'react';
import './Header.css';


class Header extends Component {

    titleName = () => {
        const res = window.location.pathname
        //----------------------------------------------------
        if (res === "/changeSerial") return (<h1> تغییر سریال</h1>)
        if (res === "/equipType") return (<h1> نوع تجهیز</h1>)
        if (res === "/equipment") return (<h1> تجهیز</h1>)
        if (res === "/ihm") return (<h1> IHM </h1>)
        if (res === "/group") return (<h1> طبقه </h1>)
        if (res === "/model") return (<h1> مدل </h1>)
        if (res === "/numberofshovelfuls") return (<h1> فلوفیت ماشین</h1>)
        if (res === "/stateGroup") return (<h1> گروه وضعیت</h1>)
        if (res === "/state") return (<h1> وضعیت </h1>)
        if (res === "/tab") return (<h1> Tab</h1>)
        //-----------------------------------------------------
        if (res === "/job") return (<h1>شغل</h1>)
        if (res === "/teamtype") return (<h1>نوع تیم</h1>)
        if (res === "/workshop") return (<h1>کارگاه</h1>)
        if (res === "/workshopType") return (<h1>نوع کارگاه</h1>)
        if (res === "/team") return (<h1>تیم</h1>)
        if (res === "/personel") return (<h1>پرسنل</h1>)
        if (res === "/personelWorkshop") return (<h1>پرسنل کارگاه</h1>)
        if (res === "/allocationsWorkshop") return (<h1> تخصیصات کارگاه</h1>)
        //-----------------------------------------------------
        if (res === "/imageGroup") return (<h1>Image Group</h1>)
        if (res === "/ImageSets") return (<h1>Image Sets</h1>)
        if (res === "/Image") return (<h1>Image</h1>)
        if (res === "/Message") return (<h1>Messages</h1>)
        //-----------------------------------------------------
        if (res === "/calendarsetting") return (<h1>تنظیمات تقویم</h1>)
        if (res === "/calendar") return (<h1>تقویم</h1>)
        if (res === "/shift") return (<h1>شیفت</h1>)
        //-----------------------------------------------------
        if (res === "/lithologyType") return (<h1> نوع سنگ شناسی</h1>)
        if (res === "/lithology") return (<h1> سنگ شناسی</h1>)
        //-----------------------------------------------------
        if (res === "/bench") return (<h1>پله</h1>)
        if (res === "/entityType") return (<h1> انواع اجزا معدن</h1>)
        if (res === "/subareatype") return (<h1>انواع زیر ناحیه</h1>)
        if (res === "/subArea") return (<h1>زیر ناحیه</h1>)
        if (res === "/zone") return (<h1> ناحیه </h1>)
        if (res === "/mineEntity") return (<h1> اجزا معدن </h1>)
        // if (res === "/mineEntityType") return (<h1> انواع اجزا معدن </h1>)
        if (res === "/pattern") return (<h1>  الگو</h1>)
        if (res === "/subzone") return (<h1> زیر ناحیه</h1>)
        if (res === "/mine") return (<h1> معدن </h1>)
        if (res === "/pit") return (<h1>  پیت</h1>)
        if (res === "/users") return (<h1>کاربران</h1>)



    }
    render() {
        return (
            <div className="header">
                <div className="header-right">
                    {this.titleName()}
                </div>
                <div className="header-left">
                    <div className="search">
                        <span className="mdi mdi-magnify"></span>
                        <input placeholder="جستجو کنید ..." />
                    </div>
                    <div className="help"><span className="mdi mdi-help-circle"></span></div>
                    <div className="profile">
                        <span className="profile-abr">AB</span>
                        <ul>
                            <li><a href="!#">پروفایل</a></li>
                            <li><a href="!#">تنظیمات</a></li>
                            <li><a href="!#">خروج</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default Header;