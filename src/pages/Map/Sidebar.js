import React, { Component } from "react";
import MapContext from "./MapContext";
import ICO from "../../icons";

class Sidebar extends Component {
  static contextType = MapContext;
  state = {
    tabIndex: 0,
    data: [],
  };

  async componentDidMount() {
    const { loadSidebar } = this.context;
    let res = await loadSidebar();
    this.setState({
      data: res.tabs,
    });
  }

  renderTabs = () => {
    const { data } = this.state;

    const items = data.map((o, i) => {
      return (
        <li
          onClick={() => {
            this.setState({ tabIndex: i });
          }}
        >
          {o.title}
        </li>
      );
    });

    return <ul className="tab-list">{items}</ul>;
  };

  renderTabItems = () => {
    const { data, tabIndex } = this.state;
    if (data.length === 0) return null;
    const items = data[tabIndex].list.map((o) => {
      return (
        <li>
          <img width={60} src={o.image} />
          {o.Name}
        </li>
      );
    });
    return <ul className="item-list">{items}</ul>;
  };
  render() {
    return (
      <div className="map-sidebar">
        {this.renderTabs()}
        {this.renderTabItems()}
      </div>
    );
  }
}

export default Sidebar;
