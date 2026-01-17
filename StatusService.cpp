#include "StatusService.h"
#include "pxt.h"
#include "MicroBit.h"

#if CONFIG_ENABLED(DEVICE_BLE)

// UUIDs (16-bit for simplicity - change to 128-bit later if needed)
static const uint16_t STATUS_SERVICE_UUID = 0xF1F0;
static const uint16_t STATUS_CHAR_UUID   = 0xF1F1;

// Singleton
StatusService *StatusService::instance = NULL;
uint8_t StatusService::statusValue = 0;  // initial muted/off

StatusService *StatusService::getInstance() {
    if (instance == NULL) {
        instance = new StatusService();
    }
    return instance;
}

StatusService::StatusService() {
    // Create service using the extension's helper macro
    CreateService(STATUS_SERVICE_UUID);

    // Create characteristic with read + notify
    CreateCharacteristic(0, STATUS_CHAR_UUID,
                         (uint8_t *)&statusValue,
                         sizeof(statusValue), sizeof(statusValue),
                         microbit_propREAD | microbit_propNOTIFY);
}

// Optional: method to update value and notify (called from PC write or internal)
void StatusService::updateStatus(uint8_t newValue) {
    statusValue = newValue;
    // Notify subscribers (needs notifyChrValue helper if available)
    // notifyChrValue(0, &statusValue, 1);
}

#endif