#ifndef STATUS_SERVICE_H
#define STATUS_SERVICE_H

#include "MicroBitConfig.h"
#if CONFIG_ENABLED(DEVICE_BLE)

#include "ble.h"
#include "ble_srv_common.h"

class StatusService {
public:
    StatusService();

    BLEService* getService();

    // Characteristic for status (notify)
    BLECharacteristic* statusChar;

private:
    BLEService* service;
};

#endif
#endif