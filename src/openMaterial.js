import React from "react";

import Material from "./Material";

import addComponent from "fs-addcomponent";
let openFun;
let onChange = () => {};

const open = (type,props) => {
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
        {...props}
      />,
    );
  } else {
    openFun(type);
  }
};
export default (type,props) => {
  return new Promise((resolve, reject) => {
    open(type,props);
    onChange = (data) => {
      resolve(data);
    };
  });
};
