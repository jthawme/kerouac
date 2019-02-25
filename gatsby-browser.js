import "./src/styles/global.scss";
import reduxWrap from "./reduxWrap";

export const wrapRootElement = reduxWrap;

export const onServiceWorkerUpdateReady = () => {
  const event = new Event('sw-updated');
  window.dispatchEvent(event);
}
