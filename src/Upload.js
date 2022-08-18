import React from "react";
import Button from "antd/lib/button";
import Upload from "dxc-upload";
import uploadQiniu from "./uploadQiniu";

export default class UploadBtn extends React.PureComponent {
  onChange = async files => {
    const file=files[0]
    const {uploadLimit}=this.props
    if(uploadLimit){
     const res = await uploadLimit(file)
     if(!res){
      return;
     }
    }
    uploadQiniu(files[0], this.props.onChange);
  };
  render() {
    const mime = {
      image: "image/gif,image/jpeg,image/png",
      audio: "audio/ac3,audio/aiff,audio/flac,audio/x-m4a,audio/x-m4r,audio/mp3,audio/ogg,audio/wav",
      video:
        "video/3gpp2,video/3gpp,video/x-ms-asf,video/avi,video/x-dv,video/x-flv,video/x-flv,video/mp4,video/quicktime,video/mp4,video/mpeg,application/mxf,video/ogg,application/x-shockwave-flash,video/webm,video/x-ms-wmv",
    };
    const allMime = `${mime.image},${mime.audio},${mime.video}`;
    return (
      <Upload accept={allMime} onChange={this.onChange} paste={false} drop={false}>
        <Button type="primary" icon="upload">
          上传
        </Button>
      </Upload>
    );
  }
}
