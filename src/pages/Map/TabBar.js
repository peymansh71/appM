import React, { useState, useEffect, useRef } from "react";

export default function TabBar(props) {
  const {
    menuType = "DEFAULT",
    menuData,
    activeMenuID,
    makeCategoryActive,
  } = props;

  const menuListRef = useRef(null);
  const menuRef = useRef(null);

  const [shouldBeFixed, setShouldBeFixed] = useState(false);

  // handle make menu active
  const handleMakeActive = (id, category, index, e) => {
    makeCategoryActive(id, e);
  };

  /**
   * handle styling...
   */
  let parentClassName;
  const baseParentClassName = "vendor-menu";

  // check type of menu
  switch (menuType) {
    case "TABBED":
      parentClassName = `${baseParentClassName} ${
        menuType === "TABBED" ? `${baseParentClassName}-tabbed` : ""
      }`;
      break;

    case "DEFAULT":
      parentClassName = `${baseParentClassName} ${
        menuType === "DEFAULT"
          ? `${baseParentClassName}-default ${baseParentClassName}-default--bordered`
          : ""
      }`;
      break;

    default:
      break;
  }

  // check should be fixed
  parentClassName = `${parentClassName} ${
    shouldBeFixed
      ? `${baseParentClassName}--fixed ${baseParentClassName}--fixed-${menuType.toLowerCase()}`
      : ""
  }`;

  // Item Class
  const base_item_class = `vendor-menu-${menuType.toLowerCase()}__item`;
  const generateItemClassName = (id) => {
    let itemClassName = `${base_item_class}`;
    itemClassName = `${itemClassName}${
      activeMenuID === id ? ` ${itemClassName}--active` : ""
    }`;
    return itemClassName;
  };

  return (
    <section className={parentClassName} ref={menuListRef}>
      {menuData &&
        menuData.map(({ id, category, name, index }) => (
          <div
            className={generateItemClassName(id)}
            key={id}
            ref={activeMenuID === id ? menuRef : null}
            onClick={(e) => handleMakeActive(id, category || name, index, e)}
          >
            <div className={`${base_item_class}-container`}>
              <p className={`${base_item_class}-text`}>{category || name}</p>
            </div>
          </div>
        ))}

      {menuType === "TABBED" ? (
        <span className="vendor-menu-tabbed__bbar"></span>
      ) : (
        ""
      )}
    </section>
  );
}
