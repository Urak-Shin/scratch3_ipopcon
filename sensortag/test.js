var util = require('util');

var async = require('async');

var SensorTag = require('./index');

var USE_READ = true;

SensorTag.discover(function(sensorTag) {
  console.log('discovered: ' + sensorTag);

  sensorTag.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });

  async.series([
      function(callback) {
        console.log('connectAndSetUp');
        sensorTag.connectAndSetUp(callback);
      },
      function(callback) {
        console.log('readDeviceName');
        sensorTag.readDeviceName(function(error, deviceName) {
          console.log('\tdevice name = ' + deviceName);
          callback();
        });
      },
      function(callback) {
        console.log('readSystemId');
        sensorTag.readSystemId(function(error, systemId) {
          console.log('\tsystem id = ' + systemId);
          callback();
        });
      },
      function(callback) {
        console.log('readSerialNumber');
        sensorTag.readSerialNumber(function(error, serialNumber) {
          console.log('\tserial number = ' + serialNumber);
          callback();
        });
      },
      function(callback) {
        console.log('readFirmwareRevision');
        sensorTag.readFirmwareRevision(function(error, firmwareRevision) {
          console.log('\tfirmware revision = ' + firmwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readHardwareRevision');
        sensorTag.readHardwareRevision(function(error, hardwareRevision) {
          console.log('\thardware revision = ' + hardwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readSoftwareRevision');
        sensorTag.readHardwareRevision(function(error, softwareRevision) {
          console.log('\tsoftware revision = ' + softwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readManufacturerName');
        sensorTag.readManufacturerName(function(error, manufacturerName) {
          console.log('\tmanufacturer name = ' + manufacturerName);
          callback();
        });
      },
      function(callback) {
        console.log('enableIrTemperature');
        sensorTag.enableIrTemperature(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
        if (USE_READ) {
          console.log('readIrTemperature');
          sensorTag.readIrTemperature(function(error, objectTemperature, ambientTemperature) {
            console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1));
            console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1));

            callback();
          });
        } else {
          sensorTag.on('irTemperatureChange', function(objectTemperature, ambientTemperature) {
            console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1));
            console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1))
          });

          console.log('setIrTemperaturePeriod');
          sensorTag.setIrTemperaturePeriod(500, function(error) {
            console.log('notifyIrTemperature');
            sensorTag.notifyIrTemperature(function(error) {
              setTimeout(function() {
                console.log('unnotifyIrTemperature');
                sensorTag.unnotifyIrTemperature(callback);
              }, 5000);
            });
          });
        }
      },
      function(callback) {
        console.log('disableIrTemperature');
        sensorTag.disableIrTemperature(callback);
      },



      function(callback) {
        console.log('enableMagnetometer');
        sensorTag.enableMagnetometer(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
        if (USE_READ) {
          console.log('readMagnetometer');
          sensorTag.readMagnetometer(function(error, x, y, z) {
            console.log('\tx = %d μT', x.toFixed(1));
            console.log('\ty = %d μT', y.toFixed(1));
            console.log('\tz = %d μT', z.toFixed(1));

            callback();
          });
        } else {
          sensorTag.on('magnetometerChange', function(x, y, z) {
            console.log('\tx = %d μT', x.toFixed(1));
            console.log('\ty = %d μT', y.toFixed(1));
            console.log('\tz = %d μT', z.toFixed(1));
          });

          console.log('setMagnetometerPeriod');
          sensorTag.setMagnetometerPeriod(500, function(error) {
            console.log('notifyMagnetometer');
            sensorTag.notifyMagnetometer(function(error) {
              setTimeout(function() {
                console.log('unnotifyMagnetometer');
                sensorTag.unnotifyMagnetometer(callback);
              }, 5000);
            });
          });
        }
      },
      function(callback) {
        console.log('disableMagnetometer');
        sensorTag.disableMagnetometer(callback);
      },
      function(callback) {
        console.log('enableBarometricPressure');
        sensorTag.enableBarometricPressure(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
        if (USE_READ) {
          console.log('readBarometricPressure');
          sensorTag.readBarometricPressure(function(error, pressure) {
            console.log('\tpressure = %d mBar', pressure.toFixed(1));

            callback();
          });
        } else {
          sensorTag.on('barometricPressureChange', function(pressure) {
            console.log('\tpressure = %d mBar', pressure.toFixed(1));
          });

          console.log('setBarometricPressurePeriod');
          sensorTag.setBarometricPressurePeriod(500, function(error) {
            console.log('notifyBarometricPressure');
            sensorTag.notifyBarometricPressure(function(error) {
              setTimeout(function() {
                console.log('unnotifyBarometricPressure');
                sensorTag.unnotifyBarometricPressure(callback);
              }, 5000);
            });
          });
        }
      },
      function(callback) {
        console.log('disableBarometricPressure');
        sensorTag.disableBarometricPressure(callback);
      },
      function(callback) {
        console.log('enableGyroscope');
        sensorTag.enableGyroscope(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
        if (USE_READ) {
          console.log('readGyroscope');
          sensorTag.readGyroscope(function(error, x, y, z) {
            console.log('\tx = %d °/s', x.toFixed(1));
            console.log('\ty = %d °/s', y.toFixed(1));
            console.log('\tz = %d °/s', z.toFixed(1));

            callback();
          });
        } else {
          sensorTag.on('gyroscopeChange', function(x, y, z) {
            console.log('\tx = %d °/s', x.toFixed(1));
            console.log('\ty = %d °/s', y.toFixed(1));
            console.log('\tz = %d °/s', z.toFixed(1));
          });

          console.log('setGyroscopePeriod');
          sensorTag.setGyroscopePeriod(500, function(error) {
            console.log('notifyGyroscope');
            sensorTag.notifyGyroscope(function(error) {
              setTimeout(function() {
                console.log('unnotifyGyroscope');
                sensorTag.unnotifyGyroscope(callback);
              }, 5000);
            });
          });
        }
      },
      function(callback) {
        console.log('disableGyroscope');
        sensorTag.disableGyroscope(callback);
      },

      function(callback) {
        console.log('readSimpleRead - waiting for button press ...');
        sensorTag.on('simpleKeyChange', function(left, right, reedRelay) {
          console.log('left: ' + left);
          console.log('right: ' + right);
          if (sensorTag.type === 'cc2650') {
            console.log('reed relay: ' + reedRelay);
          }

          if (left || right) {
            sensorTag.notifySimpleKey(callback);
          }
        });

        sensorTag.notifySimpleKey();
      },
      function(callback) {
        console.log('disconnect');
        sensorTag.disconnect(callback);
      }
    ]
  );
});
