import React, { Component } from "react";
import MapContext from "./MapContext";
// import { Link } from 'react-router-dom'

class Header extends Component {
  static contextType = MapContext;
  state = {
    historyList: [],
  };
  componentDidMount = async () => {
    const { loadHistoryList } = this.context;
    const res = await loadHistoryList();
    this.setState({ historyList: res.list });
    const load = res.list.pop();
    this.loadHistory(load);
  };

  loadHistory = async (item) => {
    const { loadHistory, renderMap } = this.context;
    let res = await loadHistory(item);
    renderMap(res);
  };

  renderHistoryList = () => {
    const { historyList } = this.state;
    const { history } = this.props;
    if (history.list) {
      const items = history.list.map((o) => {
        return (
          <li onClick={this.loadHistory.bind(this, o)}>
            <i className="mdi mdi-history"></i> {o.name}
          </li>
        );
      });
      return <ul>{items}</ul>;
    } else {
      const items = historyList.map((o) => {
        return (
          <li onClick={this.loadHistory.bind(this, o)}>
            <i className="mdi mdi-history"></i> {o.name}
          </li>
        );
      });
      return <ul>{items}</ul>;
    }
  };
  render() {
    const { renderLayers, openUploader } = this.context;

    return (
      <div className="map-header">
        <div className="map-header-right">
          <ul className="map-header-tools">
            <li>
              <i className="mdi mdi-magnify-plus-outline"></i>
            </li>
            <li>
              <i className="mdi mdi-magnify-minus-outline"></i>
            </li>
            <li>
              <i className="mdi mdi-arrow-expand-all"></i>
            </li>
            <li>
              <i className="mdi mdi-cursor-default"></i>
            </li>
          </ul>
          <div className="map-seperator"></div>
          <div className="map-header-buttons">
            <div className="map-btn" onClick={openUploader}>
              <div className="">
                <i className="mdi mdi-cloud-upload-outline"></i> آپلود فایل{" "}
              </div>
            </div>
            <div className="map-btn">
              <div className="">
                <i className="mdi mdi-history"></i> تارخچه فایل ها{" "}
              </div>
              {this.renderHistoryList()}
            </div>
          </div>
        </div>
        <div className="map-header-left">
          <a href="/">
            بازگشت <i className="mdi mdi-arrow-left"></i>{" "}
          </a>
          <br />
          {/* <Link to="/dxf" style={{ border: "1px solid white", borderRadius: "5px", paddingLeft: "12px",paddingRight: "12px", margin:"0px 2px 0px 2px" ,fontSize:"12px" }}>نقشه</Link>
                    <Link to="/newData" style={{ border: "1px solid white", borderRadius: "5px", paddingLeft: "12px",paddingRight: "12px" ,margin:"0px 2px 0px 2px" ,fontSize:"12px"  }}>صفحه</Link> */}
        </div>
      </div>
    );
  }
}

export default Header;
