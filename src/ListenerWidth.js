import React from "react";
export default class ListenerWidth extends React.PureComponent {
  state = {
    width: 0,
  };
  componentDidMount() {
    window.addEventListener("resize", this.screenChange, false);
    this.screenChange();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.screenChange);
  }
  screenChange = () => {
    const { onChange } = this.props;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const boxW = this.box.offsetWidth - 15;
      const itemW = 285;
      const width = parseInt(boxW / itemW) * itemW + 15;
      onChange && onChange(width);
      this.setState({ width });
    }, 300);
  };

  render() {
    return <div ref={box => (this.box = box)} />;
  }
}
