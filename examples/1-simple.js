import React from "react";
import ReactDOM from "react-dom";
import material from "./getMaterial";

class Demo extends React.Component {
  openMaterial = () => {
    material().then((value) => {
      console.log("value", value);
    });
  };
  render() {
    return (
      <div style={{ padding: 30 }}>
        <div onClick={this.openMaterial}>aaaa</div>
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("__react-content"));
