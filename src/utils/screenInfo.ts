/**
 * Retrieves the screen resolution of the user's device.
 *
 * @return {object} An object containing the width, height, scale, realWidth, and realHeight of the screen.
 */
export function getScreenResolution() {
    const width = window.screen.width;
    const height = window.screen.height;
    const scaleRatio = window.devicePixelRatio;
    return {
        width: width,
        height: height,
        scale: scaleRatio,
        realWidth: width * scaleRatio,
        realHeight: height * scaleRatio,
    };
}

/**
 * Retrieves the current window resolution.
 *
 * @return {Object} An object containing the width, height, scale, realWidth, and realHeigh of the visible window.
 */
export function getWindowResolution() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scaleRatio = window.devicePixelRatio;
    return {
        width: width,
        height: height,
        scale: scaleRatio,
        realWidth: width * scaleRatio,
        realHeight: height * scaleRatio,
    };
}

/**
 * Determines the wallpaper resolution based on the current window resolution.
 *
 * @return {string} The wallpaper resolution: "4K", "2K", or "1080P".
 */
export function judgeWallpaperResolution() {
    const width = getWindowResolution().realWidth;
    const height = getWindowResolution().realHeight;
    const maxAxis = Math.max(width, height);
    const minAxis = Math.min(width, height);
    if (maxAxis > 3000) {
        return "4K";
    }
    else if (minAxis > 1080 || maxAxis > 2160) {
        return "2K";
    }
    else {
        return "1080P";
    }
}