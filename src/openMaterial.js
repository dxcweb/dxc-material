import React from "react";

import Material from "./Material";

import addComponent from "fs-addcomponent";
let openFun;
let onChange = () => {};

const open = () => {
  if (!openFun) {
    addComponent.add(
      <Material
        onChange={(data) => {
          onChange();
        }}
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
export default () => {
  return new Promise((resolve, reject) => {
    open();
    onChange = (data) => {
      resolve(data);
    };
  });
};
