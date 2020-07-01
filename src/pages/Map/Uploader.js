import React, { Component } from "react";

import { Button } from "../../components/Form";
import { Viewer } from "./dxfViewer";
import * as THREE from "three";
import $ from "jquery";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
// import dxfData from '../../FakeData/MapData';//در آینده حذف شود
import { mapGetDXF, mapSaveLayers } from "../../utils/mapsMethod";
const fontJson = require("./helvetiker_regular.typeface.json");

let Nodeserver = "http://localhost:8080";

const handleSubmit = (files, allFiles) => {
  console.log(files.map((f) => f.meta));
  allFiles.forEach((f) => f.remove());
};

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.font = new THREE.Font(fontJson);

    this.config = {
      // iconFiletypes: ['.dxf', '.txt'],
      showFiletypeIcon: false,
      postUrl: props.postUrl,
    };

    this.state = {
      layers: [],
      dfx: [],
      tempDfx: [],
    };
  }

  uploadHandler = async ({ meta }, status) => {
    if (status === "done") {
      let response = await fetch(`${Nodeserver}/getDxf/${meta.name}`);
      let dxf = await response.json();

      if (dxf) {
        this.loadMap(dxf, meta.name);
      }
    }
  };

  loadMap = (dxf, fileName) => {
    let layers = [];
    if (dxf.tables && dxf.tables.layer && dxf.tables.layer.layers) {
      for (let prop in dxf.tables.layer.layers) {
        layers.push(dxf.tables.layer.layers[prop].name);
      }
    }

    let finalLayers = layers.map((o) => {
      return {
        name: o,
        show: true,
        fileName,
      };
    });

    this.setState(
      () => {
        return {
          dxf: dxf,
          tempDxf: JSON.parse(JSON.stringify(dxf)),
          layers: finalLayers,
        };
      },
      () => {
        this.renderMap();
      }
    );
  };

  renderMap = () => {
    const { dxf } = this.state;
    $("#map-preview").empty();
    var x = new Viewer(
      dxf,
      document.getElementById("map-preview"),
      400,
      400,
      this.font
    );
  };
  changeLayers = (layer, index) => {
    let { tempDxf, dxf } = this.state;
    let layers = Array.from(this.state.layers);

    layers.forEach((o, i) => {
      if (i === index) {
        o.show = !o.show;
      }
    });
    let visibleLayers = layers.filter((o) => o.show).map((o) => o.name);

    var filteredLayers = tempDxf.entities.filter((o) => {
      if (visibleLayers.indexOf(o.layer) !== -1) {
        return o;
      }
    });

    dxf.entities = [];
    dxf.entities = filteredLayers;
    this.setState(
      () => {
        return { layers, dxf };
      },
      () => {
        this.renderMap();
      }
    );
  };

  getJsonById = async (id) => {
    //const res  = http.getDxfJsonById(id)
    const res = await mapGetDXF(id);
    return res;
    // return res.data

    // دیتای فیک که بعدا حذف شود
    // var d = new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve({ dxf: dxfData })
    //     }, 1000)
    // });
    // return d;
  };

  renderLayers = () => {
    const { dxf, layers } = this.state;
    if (layers.length === 0) return "";

    const items = layers.map((o, i) => {
      return (
        <li onClick={this.changeLayers.bind(this, o, i)}>
          <i className={`mdi ${o.show ? "mdi-eye" : "mdi-eye-off"}`}></i>
          {o.name}
        </li>
      );
    });
    return <ul id="map-preview-layers">{items}</ul>;
  };
  save = async () => {
    const { layers, dxf } = this.state;
    const { close, reload } = this.props;
    const res = await mapSaveLayers(
      JSON.parse(JSON.stringify({ layers, dxf }))
    );
    if (dxf.tables && dxf.tables.layer && dxf.tables.layer.layers) {
      const requestedLayers = layers.filter((o) => o.show).map((o) => o.name);
      for (let prop in dxf.tables.layer.layers) {
        if (requestedLayers.indexOf(prop) === -1) {
          delete dxf.tables.layer.layers[prop];
        }
      }
      console.log(dxf);
    } else {
      console.log(dxf);
    }
    if (res.status === 200) {
      // const res = await mapGetDXF()
      this.setState({ dxf });
      this.renderMap();
      reload();
      close();
      // setTimeout(() => {
      //     window.location.reload()
      // }, 500)
    }
  };
  render() {
    const { load, close, postUrl } = this.props;
    const { renderLayers } = this.context;

    return (
      <div className="r-modal">
        <div className="r-modal-wrapper">
          <div className="r-modal-header">
            <h2>آپلود فایل DXF</h2>
            <span className="mdi mdi-close" onClick={close}></span>
          </div>

          <div
            className="r-modal-content"
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
            }}
          >
            <div id="map-wrapper">
              {this.renderLayers()}
              <div id="map-preview"></div>
            </div>
            <div>
              <Dropzone
                getUploadParams={() => {
                  return { url: `${Nodeserver}/upload` };
                }}
                onChangeStatus={this.uploadHandler}
                onSubmit={handleSubmit}
              />
            </div>
          </div>

          <div className="r-modal-footer">
            <Button action={this.save} text="ذخیره لایه ها" />
            <Button className="default" action={close} text="انصراف" />
          </div>
        </div>
      </div>
    );
  }
}

export default Uploader;
