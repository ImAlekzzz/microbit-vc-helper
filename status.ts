// status.ts - Custom status blocks for mic/camera feedback

namespace customStatus {

    let lastStatus: number = 0;

    /**
     * Initialize the status service
     */
    //% block="init status service"
    export function init(): void {
        basic.showString("INIT");
    }

    /**
     * Subscribe to status updates from PC
     */
    //% block="subscribe to status updates"
    export function subscribe(): void {
        basic.showString("SUB");
    }

//% block="on status changed to $status"
//% status.min=0 status.max=1
//% status.shadow="numberPicker"
export function onStatusChanged(status: number, handler: Action): void {
    control.onEvent(2001, status, handler);
}

    /**
     * Get the last received status
     */
    //% block="current status"
    export function currentStatus(): number {
        return lastStatus;
    }

    // Internal - called from C++ when notification received
    export function _notifyReceived(value: number): void {
        lastStatus = value;
        control.raiseEvent(2001, value);
        if (value == 1) {
            basic.showIcon(IconNames.Yes);
        } else {
            basic.clearScreen();
        }
    }
}