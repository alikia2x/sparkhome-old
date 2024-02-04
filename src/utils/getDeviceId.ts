import { v4 as uuidv4 } from "uuid";
import { validate as uuidIsValid } from "uuid";
export function getDeviceId() {
    if (uuidIsValid(localStorage.getItem("deviceID"))) {
        const id = localStorage.getItem("deviceID");
        return id;
    } else {
        const id = uuidv4();
        localStorage.setItem("deviceID", id);
        return id;
    }
}