import React, { Component } from 'react';
import './Notfound404.css'
import { Link } from 'react-router-dom';

class NotFound extends Component {
    state = {}
    BackToHistory() {
        window.history.back()
    }
    render() {
        return (
            <section class="page_404" >
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 ">
                            <div class="col-sm-10 col-sm-offset-1  text-center">
                                <div class="four_zero_four_bg">
                                    {/* <h1 class="text-center" style={{ fontSize: "110px", marginTop: "0px", marginBottom: "0px" }}>404</h1> */}
                                </div>
                                <br />
                                <br />
                                <div class="contant_box_404">
                                    <h3 class="h2">صفحه مورد نظر یافت نشد</h3>
                                    <Link onClick={this.BackToHistory} class="link_404">صفحه اصلی</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default NotFound;