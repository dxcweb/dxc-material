import React from "react";

import Material from "./Material";

import addComponent from "fs-addcomponent";
let openFun;
let onChange = () => {};

const open = (type) => {
  if (!openFun) {
    addComponent.add(
      <Material
        onChange={(data) => {
          onChange(data);
        }}
        setOpenFun={(fun) => {
          openFun = fun;
          openFun(type);
        }}
      />,
    );
  } else {
    openFun(type);
  }
};
export default (type) => {
  return new Promise((resolve, reject) => {
    open(type);
    onChange = (data) => {
      resolve(data);
    };
  });
};
