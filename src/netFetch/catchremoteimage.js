import netFetch from "./netFetch";
export default (editor) => {
  const me = editor;
  const { domUtils } = window.UE.dom;
  me.addListener("afterpaste", function() {
    me.fireEvent("catchRemoteImage");
  });
  me.addListener("catchRemoteImage", function() {
    var catcherLocalDomain = me.getOpt("catcherLocalDomain");
    var remoteImages = [],
      imgs = domUtils.getElementsByTagName(me.document, "img"),
      test = function(src, urls) {
        if (src.indexOf(window.location.host) != -1 || /(^\.)|(^\/)/.test(src)) {
          return true;
        }
        if (urls) {
          for (var j = 0, url; (url = urls[j++]); ) {
            if (src.indexOf(url) !== -1) {
              return true;
            }
          }
        }
        return false;
      };

    for (var i = 0, ci; (ci = imgs[i++]); ) {
      if (ci.getAttribute("word_img")) {
        continue;
      }
      var src = ci.getAttribute("_src") || ci.src || "";
      if (/^(https?|ftp):/i.test(src) && !test(src, catcherLocalDomain)) {
        remoteImages.push(src);
      }
    }

    if (remoteImages.length) {
      catchremoteimage(remoteImages, {
        //成功抓取
        success: function(list) {
          /* 获取源路径和新路径 */
          var i, j, ci, cj, oldSrc, newSrc;

          for (i = 0; (ci = imgs[i++]); ) {
            oldSrc = ci.getAttribute("_src") || ci.src || "";
            for (j = 0; (cj = list[j++]); ) {
              if (oldSrc == cj.source) {
                //抓取失败时不做替换处理
                newSrc = cj.url;
                domUtils.setAttributes(ci, {
                  src: newSrc,
                  _src: newSrc,
                });
                break;
              }
            }
          }
          me.fireEvent("catchremotesuccess");
        },
        //回调失败，本次请求超时
        error: function() {
          me.fireEvent("catchremoteerror");
        },
      });
    }

    async function catchremoteimage(imgs, callbacks) {
      const apiRes = await netFetch(imgs);
      if (apiRes.status !== 200) {
        alert("请求错误");
        return;
      }
      const { data, result, msg } = apiRes.data;
      if (!result) {
        alert(msg);
        return;
      }
      callbacks.success(data);
    }
  });
};
