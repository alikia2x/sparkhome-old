function getScreenInfo() {
    //屏幕信息，分别为缩放比例、分辨率、界面可用分辨率
    var ratio = 0;
    if (window.devicePixelRatio !== undefined) ratio = window.devicePixelRatio;
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined)
      ratio = window.outerWidth;
    return [ratio, window.screen.height, window.screen.width, window.screen.availHeight, window.screen.availWidth];
}
export default getScreenInfo;