import React, { Component } from 'react';
import './Sidebar.css'
import { Link } from 'react-router-dom'

class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar">
                <img src="images/logo.svg" alt="" />
                <ul className="sidebar-parents">
                    <li className="active"> <Link> <span className="mdi mdi-home"></span> خانه </Link> </li>
                    <li> <Link> <span className="mdi mdi-hammer-wrench"></span> تجهیزات <i className="mdi mdi-chevron-left"></i></Link>
                        <ul>
                            <li><Link to="/changeSerial">تغییر سریال</Link></li>
                            <li><Link to="/equipType">نوع تجهیز</Link></li>
                            <li><Link to="/equipment">تجهیز</Link></li>
                            <li><Link to="/ihm">IHM</Link></li>
                            <li><Link to="/group">طبقه</Link></li>
                            <li><Link to="/model">مدل</Link></li>
                            <li><Link to="/numberofshovelfuls">فلوفیت ماشین</Link></li>
                            <li><Link to="/stateGroup">گروه وضعیت</Link></li>
                            <li><Link to="/state">وضعیت</Link></li>
                            <li><Link to="/tab">Tab</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link>
                            <span className="mdi mdi-card-account-details"></span> منوی پرسنل <i className="mdi mdi-chevron-left"></i>
                        </Link>
                        <ul>
                            <li><Link to="/job">شغل</Link></li>
                            <li><Link to="/teamtype">نوع تیم</Link></li>
                            <li><Link to="/team">تیم</Link></li>
                            <li><Link to="/workshopType">نوع کارگاه</Link></li>
                            <li><Link to="/workshop">کارگاه</Link></li>
                            <li><Link to="/personel">پرسنل</Link></li>
                            <li><Link to="/personelWorkshop">پرسنل کارگاه</Link></li>
                            <li><Link to="/allocationsWorkshop"> تخصیصات کارگاه </Link></li>
                        </ul>
                    </li>

                    <li> <Link to='/map'> <span className="mdi mdi-map"></span> نقشه <i className="mdi mdi-chevron-left"></i></Link>
                        <ul>
                            <li><Link to="/imageGroup">Image Group</Link></li>
                            <li><Link to="/ImageSets">Image Sets</Link></li>
                            <li><Link to="/Image">Image</Link></li>
                            <li><Link to="/Messages">Messages</Link></li>
                        </ul>
                    </li>
                    <li> <Link > <span className="mdi mdi-calendar-month"></span> تقویم <i className="mdi mdi-chevron-left"></i></Link>
                        <ul>
                            <li><Link to="/calendarsetting">تنظیمات تقویم</Link></li>
                            <li><Link to="/calendar">تقویم</Link></li>
                            <li><Link to="/shift">شیفت</Link></li>
                        </ul>
                    </li>
                    <li> <Link > <span className="mdi mdi-diamond-stone"></span> سنگ شناسی <i className="mdi mdi-chevron-left"></i></Link>
                        <ul>
                            <li><Link to="/lithologyType">نوع سنگ شناسی</Link></li>
                            <li><Link to="/lithology">سنگ شناسی</Link></li>
                        </ul>
                    </li>
                    <li> <Link > <span className="mdi mdi-pickaxe"></span> اجزای معدن <i className="mdi mdi-chevron-left"></i></Link>
                        <ul>
                            <li><Link to="/bench">پله</Link></li>
                            <li><Link to="/entityType">انواع اجزا معدن</Link></li>
                            <li><Link to="/subareatype">انواع زیر ناحیه</Link></li>
                            <li><Link to="/subArea">زیر ناحیه</Link></li>
                            <li><Link to="/zone">ناحیه</Link></li>
                            {/* <li><Link to="/mineEntityType">انواع اجزا معدن</Link></li> */}
                            <li><Link to="/mineEntity">اجزا معدن</Link></li>
                            <li><Link to="/mine">معدن</Link></li>
                            <li><Link to="/pattern">الگو</Link></li>
                            <li><Link to="/pit">پیت</Link></li>
                        </ul>
                    </li>
                    <li> <Link to="/users" > <span className="mdi mdi-account-group "></span> مدیریت کاربران <i className="mdi mdi-chevron-left"></i></Link> </li>
                    <li> <Link to="/createmodel" > <span className="mdi mdi-layers-triple"></span> تعریف مدل <i className="mdi mdi-chevron-left"></i></Link> </li>
                </ul>
            </div>
        )
    }
}

export default Sidebar;