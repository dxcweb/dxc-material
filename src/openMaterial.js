import React from "react";

import Material from "./Material";

import addComponent from "fs-addcomponent";
let openFun;

export default () => {
  if (!openFun) {
    addComponent.add(
      <Material
        setOpenFun={(fun) => {
          openFun = fun;
          openFun();
        }}
      />,
    );
  } else {
    openFun();
  }
};
