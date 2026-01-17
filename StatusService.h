#ifndef STATUS_SERVICE_H
#define STATUS_SERVICE_H

#include "MicroBitConfig.h"
#if CONFIG_ENABLED(DEVICE_BLE)

#include "ble.h"
#include "ble_srv_common.h"

class StatusService {
public:
    StatusService();

    static StatusService *getInstance();

    static uint8_t statusValue;

private:
    static StatusService *instance;
};

#endif
#endif