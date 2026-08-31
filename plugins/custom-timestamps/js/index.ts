import { after } from "@revenge-mod/patcher";
import { findByProps } from "@revenge-mod/metro";
import { storage } from "@revenge-mod/plugin";
import Settings from "./Settings";

let unpatchTimestamp: Function;

function formatMyTime(realDate: Date, formatString: string) {
    if (!realDate || isNaN(realDate.getTime())) return "وقت غير معروف";

    const hours = realDate.getHours().toString().padStart(2, '0');
    const minutes = realDate.getMinutes().toString().padStart(2, '0');
    const seconds = realDate.getSeconds().toString().padStart(2, '0');
    const day = realDate.getDate().toString().padStart(2, '0');
    const month = (realDate.getMonth() + 1).toString().padStart(2, '0');
    const year = realDate.getFullYear().toString();

    return formatString
        .replace("HH", hours).replace("mm", minutes).replace("ss", seconds)
        .replace("DD", day).replace("MM", month).replace("YYYY", year);
}

export default {
    onLoad() {
        if (!storage.format) storage.format = "HH:mm:ss";

        const MessageTimestamp = findByProps("MessageTimestamp");
        if (MessageTimestamp) {
            unpatchTimestamp = after("default", MessageTimestamp, (args, res) => {
                const originalTimestamp = args[0]?.timestamp;
                if (originalTimestamp) {
                    const realDate = originalTimestamp.toDate ? originalTimestamp.toDate() : new Date(originalTimestamp);
                    if (res && res.props) res.props.children = formatMyTime(realDate, storage.format);
                }
                return res;
            });
        }
    },
    onUnload() {
        if (unpatchTimestamp) unpatchTimestamp();
    },
    settings: Settings
};

