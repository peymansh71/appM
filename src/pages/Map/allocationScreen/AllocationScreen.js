import React, { Component } from "react";

import img from "../image";
import MapContext from "../MapContext";

export default class AllocationScreen extends Component {
  static contextType = MapContext;
  state = {
    tabIndex: 0,
    data: [],
  };

  async componentDidMount() {
    let res = {
      tabs: {
        firstColumn: [
          { title: "first" },
          { title: "second" },
          {
            title: "third",
          },
          {
            title: "first",
          },
          {
            title: "second",
          },
          {
            title: "third",
          },
          {
            title: "first",
          },
          {
            title: "second",
          },
          {
            title: "third",
          },
          {
            title: "first",
          },
          {
            title: "second",
          },
          {
            title: "third",
          },
        ],
        secondColumn: [
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "third",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
        ],
        thirdColumn: [
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "third",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "third",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "third",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
          {
            title: "third",
          },
          {
            title: "first",
          },
          {
            title: "third",
          },
          {
            title: "first",
          },
          {
            title: "first",
          },
        ],
      },
    };
    this.setState({
      data: res.tabs,
    });
  }

  renderTabs = () => {
    const { data } = this.state;

    return Object.entries(data).map((row, index) => {
      return (
        <ul className="tab-list">
          {this.RenderRow(Object.entries(data)[index])}
        </ul>
      );
    });
  };

  RenderRow = (props) => {
    console.log(props[1]);
    return props[1].map((key, index) => {
      return (
        <li>
          <button>{key.title}</button>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="allocation-screen">
        <div className="allocation-screen__container">{this.renderTabs()}</div>
      </div>
    );
  }
}
