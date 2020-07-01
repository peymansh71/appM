import React, { Component } from "react";
import $ from "jquery";

import "./Map.scss";
// import dxfData from '../../FakeData/MapData';//در آینده حذف شود
import { Viewer } from "./dxfViewer";
import * as THREE from "three";
import MapContexts from "../../context/MapContext";
import MapContext from "./MapContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import TabBar from "./TabBar";
import Canvas from "./Canvas";
import BaseMap from "./baseMap/BaseMap";
import DispatchScreen from "./dispatchScreen/DispatchScreen";
import AllocationScreen from "./allocationScreen/AllocationScreen";
import Uploader from "./Uploader";
import img from "./image";
import Config from "../../config.json";
import SwappableViews from "react-swipeable-views";

import {
  mapsData,
  mapSidebarItems,
  mapFooterItems,
  mapHistory,
  mapHistoryList,
} from "../../utils/mapsMethod";
import httpsService from "../../services/httpsService";

const fontJson = require("./helvetiker_regular.typeface.json");
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploader: false,
      history: [],
      activeTabID: 0,
      isTabsSwipeActive: false,
    };
    this.font = new THREE.Font(fontJson);
  }
  componentDidMount() {
    this.sidebar = setInterval(() => this.loadSidebar(), 4000);
    this.footer = setInterval(() => this.loadFooter(), 4000);
  }
  componentWillMount() {
    clearInterval(this.sidebar);
    clearInterval(this.footer);
  }
  reloadHistory = async () => {
    const res = await this.loadHistoryList();

    this.setState({ history: res });
  };
  loadHistoryList = async () => {
    //const res = await http.loadHistoryList(params)
    //return res.data;
    // const res = await mapHistoryList()
    // return res.data
    //دیتای فیک که بعدا حذف شود
    var d = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list: [
            { name: "test1.dxf", id: 1 },
            { name: "test2.dxf", id: 2 },
            { name: "test3.dxf", id: 3 },
            { name: "test4.dxf", id: 4 },
          ],
        });
      }, 1000);
    });

    return d;
  };
  loadHistory = async (params) => {
    // const res = await mapHistory(params)
    // return res.data
    //const res = await http.loadHistory(params)
    //return res.data
    const res = await mapHistory(params.id);
    // var str = JSON.stringify( res.data[0]);
    return res.data.details;
    //دیتای فیک که بعدا حذف شود
    // var d = new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve({ dxf: dxfData })
    //     }, 1000)
    // });

    // return d;
  };
  // renderMap = (dxf) => {
  //   $("#map-area").empty();
  //   var x = new Viewer(
  //     dxf,
  //     document.getElementById("map-area"),
  //     1300,
  //     700,
  //     this.font
  //   );
  // };

  handleMakeCategoryActive = (tabID, e) => {
    this.setState({ activeTabID: tabID });
  };

  getContext = () => {
    return {
      ...this,
      openUploader: this.openUploader,
      loadHistory: this.loadHistory,
      loadHistoryList: this.loadHistoryList,
      // renderMap: this.renderMap,
      loadSidebar: this.loadSidebar,
      loadFooter: this.loadFooter,
    };
  };

  closeUploader = () => {
    this.setState({ uploader: false });
  };

  openUploader = () => {
    this.setState({ uploader: true });
  };

  handleSwipeTab = (index) => this.setState({ isTabsSwipeActive: index });

  loadSidebar = async (params) => {
    // const res = await mapSidebarItems()

    // return res.data
    //const res = await http.loadSidebar(params)
    //return res.data;

    //دیتای فیک که بعدا حذف شود
    var d = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          tabs: [
            {
              title: "ASUS",
              list: [
                { name: "1111111", image: img },
                { name: "1111111", image: img },
                { name: "1111111", image: img },
                { name: "1111111", image: img },
              ],
            },
            {
              title: "NOKIA",
              list: [
                { name: "1111111", image: img },
                { name: "1111111", image: img },
                { name: "1111111", image: img },
                { name: "1111111", image: img },
              ],
            },
            {
              title: "APPLE",
              list: [
                { name: "1111111", image: img },
                { name: "1111111", image: img },
                { name: "1111111", image: img },
                { name: "1111111", image: img },
              ],
            },
          ],
        });
      }, 1000);
    });

    return d;
  };

  loadFooter = async () => {
    //const res = await http.loadFooter(params)
    //return res.data;
    const res = await mapFooterItems();

    return res.data;

    //دیتای فیک که بعدا حذف شود
    // var d = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       tabs: [
    //         {
    //           title: "ASUS",
    //           list: [
    //             { name: "1111111", image: img },
    //             { name: "1111111", image: img },
    //             { name: "1111111", image: img },
    //             { name: "1111111", image: img },
    //           ],
    //         },
    //         {
    //           title: "NOKIA",
    //           list: [
    //             { name: "1111111", image: img },
    //             { name: "1111111", image: img },
    //             { name: "1111111", image: img },
    //             { name: "1111111", image: img },
    //           ],
    //         },
    //         {
    //           title: "APPLE",
    //           list: [
    //             { name: "1111111", image: img },
    //             { name: "1111111", image: img },
    //             { name: "1111111", image: img },
    //             { name: "1111111", image: img },
    //           ],
    //         },
    //       ],
    //     });
    //   }, 1000);
    // });
    // return d;
  };

  render() {
    const { uploader, history } = this.state;

    let tab_titles = [
      { id: 0, name: "Map", type: "TAB_MAP" },
      { id: 1, name: "Dispatch screen", type: "TAB_DISPATCH_SCREEN" },
      { id: 2, name: "Allocation screen", type: "TAB_ALLOCATION_SCREEN" },
      {
        id: 3,
        name: "Flow production Summary",
        type: "TAB_PRODUCTION_SUMMARY",
      },
      { id: 4, name: "Alarm Central", type: "TAB_ALARM_CENTRAL" },
      { id: 5, name: "optimization", type: "TAB_OPTIMIZATION" },
    ];

    return (
      <MapContext.Provider value={this.getContext()}>
        {uploader && (
          <Uploader
            reload={this.reloadHistory}
            // postUrl={'http://reactdropzone.azurewebsites.net/uploadHandler'}
            postUrl={Config.api_mapUploader}
            error={() => {
              alert("error");
            }}
            success={() => {
              alert("success");
            }}
            close={this.closeUploader}
            history={this.loadHistoryList}
          />
        )}
        <div className="page-map">
          <Canvas />
          <Header history={history} />

          <TabBar
            activeMenuID={this.state.activeTabID}
            makeCategoryActive={this.handleMakeCategoryActive}
            menuData={tab_titles}
            menuType="TABBED"
          />
          <MapContexts
            activeTabID={this.state.activeTabID}
            tabData={tab_titles}
          >
            <SwappableViews
              axis="x-reverse"
              disabled={this.state.isTabsSwipeActive}
              index={this.state.activeTabID}
              onChangeIndex={this.handleSwipeTab}
            >
              <BaseMap />
              <DispatchScreen />
              <AllocationScreen />
            </SwappableViews>
          </MapContexts>

          <Sidebar />
          <Footer />
        </div>
      </MapContext.Provider>
    );
  }
}

export default Map;
