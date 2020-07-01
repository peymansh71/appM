import React from "react";

export const MapContexts = React.createContext();

class MapContextProvider extends React.Component {
  getActiveTab = () => {
    const { tabData, activeTabID } = this.props;
    return tabData.find((tab) => tab.id === activeTabID);
  };

  render() {
    const { activeTabID, makeSwipeActive = null } = this.props;

    const context = {
      activeTabID,
      getTabData: this.getActiveTab,
      makeSwipeActive,
    };

    return (
      <MapContexts.Provider value={context}>
        {this.props.children}
      </MapContexts.Provider>
    );
  }
}

export default MapContextProvider;
