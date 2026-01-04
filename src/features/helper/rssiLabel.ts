// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

/**
 * Returns the rssi (Radio Signal Strength Indication - WiFi quality) including a label
 *
 * @param rssi - rssi value as read 
 * @returns string with rssi and label
 */
export function getRssiLabel(rssi: number){
    if (rssi < -90)
        return `${rssi} (unusable)`;
    else if (rssi < -80)
        return `${rssi} (not good)`;
    else if (rssi < -70)
        return `${rssi} (fair)`;
    else if (rssi < -67)
        return `${rssi} (good)`;
    else
        return `${rssi} (very good)`;
}