/**
 * Custom status control for mic/camera feedback
 */
namespace customStatus {

    let lastStatus: number = 0;  // ← this MUST be here, inside the namespace

    /**
     * Initialize the status service (call this once at start)
     */
    //% block="init status service"
    //% blockId=customstatus_init
    //% blockGap=8
    export function init(): void {
        basic.showString("INIT")
    }

    /**
     * Subscribe to status notifications from PC
     */
    //% block="subscribe to status updates"
    //% blockId=customstatus_subscribe
    //% blockGap=8
    export function subscribe(): void {
        basic.showString("SUB")
    }

    /**
     * Event when status changes (1 = unmuted/on, 0 = muted/off)
     * @param status 
     */
    //% block="on status changed to $status"
    //% blockId=customstatus_onchanged
    //% status.shadow=numberPicker status.min=0 status.max=1
    export function onStatusChanged(status: number, handler: () => void) {
        control.onEvent(2001, status, handler);
    }

    /**
     * Get last received status
     */
    //% block="current status"
    //% blockId=customstatus_current
    //% blockGap=8
    export function currentStatus(): number {
        return lastStatus;  // ← uses the variable declared above
    }

    // Internal function - called from C++ when a notification arrives
    export function _notifyReceived(value: number) {
        lastStatus = value;
        control.raiseEvent(2001, value);
        if (value === 1) {
            basic.showIcon(IconNames.Yes);  // mic/camera on
        } else {
            basic.clearScreen();            // muted/off
        }
    }
}