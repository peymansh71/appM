import React, { useState, useEffect, useContext } from "react";

import { DashboardTabsContext } from "../v2.0__components/_contexts/DashboardTabsContext";

function useActiveTab({ TAB_TAG }) {
  // local states
  const [isCurrentTabActive, setIsCurrentTabActive] = useState(false);

  // context
  const { activeTabID, getTabData } = useContext(DashboardTabsContext);

  // did update
  useEffect(() => {
    if (getTabData().type === TAB_TAG) {
      setIsCurrentTabActive(true);
    } else setIsCurrentTabActive(false);
  }, [activeTabID]);

  return {
    isCurrentTabActive,
  };
}

export default useActiveTab;
