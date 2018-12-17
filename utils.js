/** @desc Utility functions and object methods */


/**
 * Decorated console logger
 */
var logger = {
    success: function (data) {
      console.log(`%c SUCCESS: ${data}`, 'color:#119f11;');
    },
    info: function (data) {
        console.log(`%c INFO: ${data}`, 'color:#2f48cc;');
    },
    warn: function (data) {
        console.log(`%c WARN: ${data}`, 'color:#dbdb06;');
    },
    error: function (data) {
        console.log(`%c ERROR: ${data}`, 'color:#db1515;');
    }
};


/**
 * Whether the input array contains only nullables or empty
 * @param {Array} ar input array
 */   
function isEmptyArray(ar) {
    var el = ar.find((e, i) => e != undefined);
    return el === undefined ? true : false;
}
