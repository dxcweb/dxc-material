import React from "react";

import Material from "./Material";

import addComponent from "fs-addcomponent";
let init = false;

export default (getSign) => {
  if (!getSign) {
    throw new Error("dxc-material参数错误");
  }
  window.dxc_material_getSign = getSign;
  const show = () => {
    return new Promise((resolve, reject) => {
      if (window.dxc_material) {
        window.dxc_material((value) => {
          resolve(value);
        });
      } else {
        reject("媒体库插件错误");
      }
    });
  };
  if (init) {
    return show;
  }
  init = true;
  addComponent.add(<Material />);

  return show;
};
