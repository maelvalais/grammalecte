
// HELPERS

"use strict";

let xWorker = null; // JS sucks. In Firefox, there is no console.log in PromiseWorker, but there is worker.log.

function setWorker (x) {
    xWorker = x;
}

function echo (obj) {
    if (xWorker === null) {
        console.log(obj);
    } else {
        xWorker.log(obj);
    }
}

function logerror (e) {
    if (xWorker === null) {
        console.error("\n" + e.fileName + "\n" + e.name + "\nline: " + e.lineNumber + "\n" +
                      e.message + "\n--- Stack ---\n" + e.stack);
    } else {
        xWorker.log("\n" + e.fileName + "\n" + e.name + "\nline: " + e.lineNumber + "\n" +
                    e.message + "\n--- Stack ---\n" + e.stack);
    }
}

function objectToMap (obj) {
    let m = new Map();
    for (let param in obj) {
        //console.log(param + " " + obj[param]);
        m.set(param, obj[param]);
    }
    return m;
}

function mapToObject (m) {
    let obj = {};
    for (let [k, v] of m) {
        obj[k] = v;
    }
    return obj;
}


exports.echo = echo;
exports.logerror = logerror;
exports.objectToMap = objectToMap;
exports.mapToObject = mapToObject;
exports.setWorker = setWorker;
