import React, { Component } from 'react';



class TreeView extends Component {
    state = {}
    render() {
        return (
            <ul data-role="treeview">
                <li data-icon="<span class='mif-star-full'></span>" data-caption="Favorites">
                    <ul>
                        <li data-icon="<span class='mif-library'></span>" data-caption="Projects"></li>
                        <li data-icon="<span class='mif-download'></span>" data-caption="Downloads"></li>
                        <li data-icon="<img src='images/desktop.png'>" data-caption="Desktop"></li>
                    </ul>
                </li>
                <li data-icon="<span class='mif-onedrive'></span>" data-caption="OneDrive">
                    <ul>
                        <li data-caption="Documents"></li>
                        <li data-caption="Projects" data-collapsed="true">
                            <ul>
                                <li data-caption="Web"></li>
                                <li data-caption="Android"></li>
                                <li data-caption="Windows"></li>
                                <li data-caption="iOS"></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
}

export default TreeView;