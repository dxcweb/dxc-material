import netFetch from "./netFetch";
// import { netFetch } from 'dxc-material';
import loading from 'fs-loading';

const getLocalUrl = async remote => {
  const apiRes = await netFetch([remote]);
  if (apiRes.status !== 200) {
    alert('请求错误');
    return;
  }
  const { data, result, msg } = apiRes.data;
  if (!result) {
    alert(msg);
    return;
  }
  return data[0].url;
};

const backgroundImage = async style => {
  const bgIndex = style.indexOf('background-image') || style.indexOf('background');
  if (bgIndex >= 0) {
    const endInde = style.indexOf(';', bgIndex);
    if (endInde >= 0) {
      let start = style.indexOf('url(', bgIndex);
      if (start >= 0 && start < endInde) {
        start += 4;
        const end = style.indexOf(')', start);
        const original = style.substr(start, end - start);
        const really = original
          .replace(/&quot;/g, '')
          .replace(/;/g, '')
          .replace(/"/g, '')
          .replace(/'/g, '');

        const url = await getLocalUrl(really);
        return style.replace(original, url);
      }
    }
  }
  return false;
};
const catchImage = async node => {
  if (node.type === 'element') {
    if (node.attrs && node.attrs.style) {
      const newStyle = await backgroundImage(node.attrs.style);
      if (newStyle) {
        node.attrs.style = newStyle;
      }
      if (node.tagName === 'img' && node.attrs && node.attrs.src) {
        const url = await getLocalUrl(node.attrs.src);
        node.attrs.src = url;
        if (node.attrs._src) node.attrs._src = url;
      }
    }
  }
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      await catchImage(node.children[i]);
    }
  }
};
const handle = async (editor, node) => {
  loading.show();
  await catchImage(node);
  editor.execCommand('insertHtml', node.toHtml(), true);
  loading.hide();
};
export default editor => {
  editor.addListener('beforepaste', function(Event, html, node) {
    html.html = false;
    handle(editor, node);
  });
};
