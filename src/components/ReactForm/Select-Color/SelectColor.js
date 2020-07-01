import React, { Component } from 'react';



class SelectColor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                { id: 1, class: "red", value: "#ff0000", text: "Red" },
                { id: 2, class: "green", value: "#adff2f", text: "GreenYellow" },
                { id: 3, class: "yellow", value: "#ffff00", text: "Yellow" },
                { id: 4, class: "blue", value: "#0000ff", text: "Blue" },
                { id: 5, class: "cyan", value: "#00ffff", text: "Cyan" },
                { id: 6, class: "khaki", value: "#f0e68c", text: "Khaki" },
                { id: 7, class: "purple", value: "#800080", text: "Purple" }
            ],
        }
    }

    render() {
        const { data } = this.state
        return (
            <select id="form-control" onChange={this.SeletColor} style={{ backgroundColor: `${this.state.background}` }}>
                <option style={{ backgroundColor: "white" }} defaultValue="انتخاب کنید">  انتخاب کنید </option>
                {data.map((node, index) => {
                    return <option key={index} className={node.class} style={{ backgroundColor: `${node.value}` }} value={node.value}>{node.text}</option>
                })}
            </select>
        );
    }
}

export default SelectColor;