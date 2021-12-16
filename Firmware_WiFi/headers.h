String serverName;
String channelId;
String userKey;
String apiKey;
String apid;
String hostName = "SmartWPM";
String apPass;
String settingsPass;
const char* topicInit = "SmartWaterMonitor/init";
const char* topicRelay = "SmartWaterMonitor/relay";
const char* topicPressureSensorStatus = "SmartWaterMonitor/pressure";
const char* topicPressureSensorLive = "swm-device/SmartWaterMonitor/pressure";
const char* topicPressureRelayLive = "swm-device/SmartWaterMonitor/relayState";
const char* topicPressureEventChange = "swm-device/SmartWaterMonitor/eventPressureLimitChanged";

#define RELAY_PIN 14
#define LED_PIN 13


#if defined(ARDUINO_ARCH_ESP8266)
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#elif defined(ARDUINO_ARCH_ESP32)
#include <WiFi.h>
#include <WebServer.h>
#endif

#include <AutoConnect.h>

#if defined(ARDUINO_ARCH_ESP8266)
ESP8266WebServer server;
#elif defined(ARDUINO_ARCH_ESP32)
WebServer server;
#endif
#include <ESPmDNS.h>
#include <PubSubClient.h>
#include "SoftwareStack.h"
#ifndef BUILTIN_LED
#define BUILTIN_LED 2 // backward compatibility
#endif
#if defined(ARDUINO_ARCH_ESP8266)
#ifdef AUTOCONNECT_USE_SPIFFS
FS &FlashFS = SPIFFS;
#else
#include <LittleFS.h>
FS &FlashFS = LittleFS;
#endif
#elif defined(ARDUINO_ARCH_ESP32)
#include <SPIFFS.h>
fs::SPIFFSFS &FlashFS = SPIFFS;
#endif
#include "statusLED.h"
#include "neoTimer.h"

#define GET_CHIPID() ((uint16_t)(ESP.getEfuseMac() >> 32))

unsigned long lastPub = 0;
unsigned int updateInterval = 3000;

#define PARAM_FILE "/param.json"
#define AUX_MQTTSETTING "/mqtt_setting"
#define AUX_MQTTSAVE "/mqtt_save"
#define AUX_MQTTCLEAR "/mqtt_clear"
static const char PAGE_AUTH[] PROGMEM = R"(
{
  "uri": "/auth",
  "title": "Auth",
  "menu": false,
    "auth": "digest",
  "element": [
    {
      "name": "text",
      "type": "ACText",
      "value": "AutoConnect has authorized",
      "style": "font-family:Arial;font-size:18px;font-weight:400;color:#191970"
    }
  ]
}
)";

SoftwareStack ss; //SS instance
AutoConnectConfig config;
AutoConnect portal(server);

String loggedIn = "";

String mac = (WiFi.macAddress());
char __mac[sizeof(mac)];

const char *mqtt_server = "broker.hivemq.com";
//IPAddress mqttBroker(34,214,65,82);
const int mqtt_port = 1883;
const char *mqtt_user = "testUser";
const char *mqtt_pass = "testUser@123";
const char *mqtt_client_name = __mac; //"12312312312332212";// any random alphanumeric stirng
//////////////////////////////
#define BUFFER_SIZE 250
String incoming = "";
String incomingTopic = "";
WiFiClient wclient;
PubSubClient mqttClient(wclient);

String devList[10];
String IMEIsList[10];
String LastUpdated = "";
String internetStatus = "Not-Connected";
int selectedDeviceIndex = 0;
String connectionMode = "WiFi";

bool atDetect(IPAddress &softapIP)
{
    Serial.println("Captive portal started, SoftAP IP:" + softapIP.toString());

    return true;
}

String relayStateN="OFF";
void relayState(int v){
    if(v==0){
        digitalWrite(RELAY_PIN, 0);
        relayStateN="OFF";
    }
    else if(v==1){
        digitalWrite(RELAY_PIN, 1);
        relayStateN="ON";
    }
}
void checkLimits(){
    String event="";
    if(getPressure().toFloat()>=relayOnLimit){
        relayState(1);
        event=String(getPressure())+String("ON");
        mqttClient.publish(topicPressureEventChange, event.c_str());

    }

    else if(getPressure().toFloat()<=relayOffLimit){
        relayState(0);
        event=String(getPressure())+String("OFF");
        mqttClient.publish(topicPressureEventChange, event.c_str());

    }

}