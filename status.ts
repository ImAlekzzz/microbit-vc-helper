/**
 * Custom Status Service namespace
 */
namespace customStatus {

    let lastStatus: number = 0;

    /**
     * Initialize the status service (call this once at start)
     */
    //% block="init custom status service"
    export function init(): void {
        // Force the C++ service to be created
        // If we have StatusService::getInstance(), call it here (add later)
        basic.showString("INIT")
    }

    /**
     * Subscribe to status notifications (enable notify from PC)
     */
    //% block="subscribe to status updates"
    export function subscribe(): void {
        // This will call C++ to enable notifications on the characteristic
        // We'll add the C++ function later
        basic.showString("SUB")
    }

    /**
     * Event when mic/camera status changes
     * @param status 1 = on/unmuted, 0 = off/muted
     */
    //% block="on status changed to $status"
    //% status.shadow="numberPicker"
    //% status.min=0 status.max=1
    export function onStatusChanged(status: number, handler: () => void) {
        control.onEvent(2001, status, handler);  // custom event ID 2001
    }

    /**
     * Get current status
     */
    //% block="current status"
    export function currentStatus(): number {
        return lastStatus;
    }

    // Internal: called from C++ when notification arrives
    export function _onNotification(value: number) {
        lastStatus = value;
        control.raiseEvent(2001, value);
        if (value == 1) {
            basic.showIcon(IconNames.Yes);  // mic on
        } else {
            basic.clearScreen();  // muted
        }
    }
}