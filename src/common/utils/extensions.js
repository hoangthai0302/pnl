// function debounce(func, wait, immediate) {
//     var timeout;
//     return function () {
//         var context = this, args = arguments;
//         var later = function () {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         var callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// };

// window.saveUrlToFile = function(fileUrl){
//     var isChrome = !!window.chrome && !!window.chrome.webstore;
//     var isIE = /*@cc_on!@*/false || !!document.documentMode;
//     var isEdge = !isIE && !!window.StyleMedia;

//     var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
//     if (isChrome){        
//         var downloadLink = angular.element('<a></a>');
//         downloadLink.attr('href',fileUrl);
//         downloadLink.attr('target','_self');
//         downloadLink.attr('download', fileName);
//         downloadLink[0].click();
//     }
//     else if(isEdge || isIE){
//         window.navigator.msSaveOrOpenBlob(fileUrl,fileName);
//     }
//     else {        
//         window.open(fileUrl);
//     }
// }

// // Could create a utility function to do this
// Array.prototype.inArray = function (searchFor, property) {
//     var self = this;
//     var retVal = -1;

//     for (var index = 0; index < self.length; index++) {
//         var item = self[index];
//         if (item.hasOwnProperty(property)) {
//             if (item[property] === searchFor) {
//                 retVal = self[index];
//                 return retVal;
//             }
//         }
//     };
//     return retVal;
// };

// Array.prototype.getIndexOf = function (searchFor, property) {
//     var self = this;
//     var retVal = -1;
//     property = property || 'Id';

//     for (var index = 0; index < self.length; index++) {
//         var item = self[index];
//         if (item.hasOwnProperty(property)) {
//             if (item[property] == searchFor) {
//                 return index;
//             }
//         }
//     };
//     return retVal;
// };

// Array.prototype.invertData = function (keyProperty, ignorePropertyPlus) {
//     var ignoreProperty = 'AutoMap,ClientInfo,Href,IsExists, SessionKey';
//     var result = [];

//     if (this.length <= 0)
//         return result;

//     for (var property in this[0]) {
//         var newObj = {};

//         if (ignoreProperty.indexOf(property) >= 0)
//             continue;

//         if (ignorePropertyPlus != null && ignorePropertyPlus.indexOf(property) >= 0)
//             continue;

//         if (property == keyProperty)
//             continue;

//         newObj["FirstColumn"] = property;
//         //build new object
//         for (var i = 0; i < this.length; i++) {
//             newObj[this[i][keyProperty]] = this[i][property];
//         }

//         result.push(newObj);
//     }
//     return result;
// }

// Array.prototype.invertDataWithSpecifyColumns = function (keyProperty, columns) {
//     var result = [];

//     if (this.length <= 0)
//         return result;
//     var arrCols = columns.split(',');
//     for (var j = 0; j < arrCols.length; j++) {
//         var newObj = {};

//         newObj["FirstColumn"] = arrCols[j];
//         //build new object
//         for (var i = 0; i < this.length; i++) {
//             newObj[this[i][keyProperty]] = this[i][arrCols[j]];
//         }

//         result.push(newObj);
//     }

//     /*for (var property in this[0]) {
//         var newObj = {};

//         if (columns.indexOf(property) < 0)
//             continue;

//         if (property == keyProperty)
//             continue;

//         newObj["FirstColumn"] = property;
//         //build new object
//         for (var i = 0; i < this.length; i++) {
//             newObj[this[i][keyProperty]] = this[i][property];
//         }

//         result.push(newObj);
//     }*/
//     return result;
// }


// Array.prototype.treeify = function (key, parentKey, childsKey, undefinedRootKey) {
//     var nodeDict = new Map();
//     var rootList = [];

//     key = key || 'Code';
//     parentKey = parentKey || 'ParentCode';
//     childsKey = childsKey || 'Nodes';

//     var lookup = {};
//     this.forEach(function (obj) {
//         lookup[obj[key]] = obj;
//         obj[childsKey] = [];
//     });

//     this.forEach(function (item) {
//         if (item[parentKey] == item[key] || item[parentKey] == undefinedRootKey || lookup[item[parentKey]] == undefined) {
//             rootList.push(item);
//         } else {
//             lookup[item[parentKey]][childsKey].push(item);
//         }
//     });
//     return rootList;
// }

// Array.prototype.joinWith = function (arrayToJoin, srckey,tarKey, attributeList) {
//     var ret = [];
//     var lookup = {};
//     srckey = srckey || 'Code';
//     tarKey = tarKey || srckey;

//     arrayToJoin.forEach(function (item) {
//         lookup[item[tarKey]] = item;
//     });

//     this.forEach(function (itemSrc) {
//         var itemTar = lookup[itemSrc[srckey]];
//         if (itemTar != null) {
//             attributeList = attributeList || itemTar;
//             for (var attrname in attributeList) {
//                 itemSrc[attrname] = itemTar[attrname];
//             }
//         }
//         ret.push(itemSrc);
//     });
//     return ret;
// }

// Array.prototype.remove = function () {
//     var what, a = arguments, L = a.length, ax;
//     while (L && this.length) {
//         what = a[--L];
//         while ((ax = this.indexOf(what)) !== -1) {
//             this.splice(ax, 1);
//         }
//     }
//     return this;
// };

// Array.prototype.order = function (objParamToSortBy, sortAscending) {
//     if (sortAscending == undefined) sortAscending = true;  // default to true
//     if (sortAscending) {
//         this.sort(function (a, b) {
//             return a[objParamToSortBy] > b[objParamToSortBy];
//         });
//     }
//     else {
//         this.sort(function (a, b) {
//             return a[objParamToSortBy] < b[objParamToSortBy];
//         });
//     }
//     return this;
// };


// // var ary = ['three', 'seven', 'eleven'];
// // ary.remove('seven');

// // String.format extension
// String.prototype.format = function (args) {
//     if (args == null)
//         return;
//     if (!Array.isArray(args)) {
//         args = [args];
//     }
//     var str = this;
//     return str.replace(String.prototype.format.regex, function (item) {
//         var intVal = parseInt(item.substring(1, item.length - 1));
//         var replace;
//         if (intVal >= 0) {
//             replace = args[intVal];
//         } else if (intVal === -1) {
//             replace = "{";
//         } else if (intVal === -2) {
//             replace = "}";
//         } else {
//             replace = "";
//         }
//         return replace;
//     });
// };
// String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

// Date.prototype.format = function (format) {
//     format = format || 'MM/dd/yyyy';
//     var dd = this.getDate();     
//     var mm = this.getMonth() + 1;
//     if (dd < 10 && format.indexOf('dd') >= 0){
//         dd = '0' + dd;
//     };
//     if (mm < 10 && format.indexOf('MM') >= 0 ){
//         mm = '0' + mm;
//     };

//     var yyyy = this.getFullYear(); 
//     var dateFormated  = format.replace('dd',dd).replace('MM',mm).replace('yyyy',yyyy);
//     return dateFormated;
// };

// Date.prototype.formatApi = function () {
//     var dd = this.getDate(); 
//     var mm = this.getMonth()+1;
//     var yyyy = this.getFullYear(); 
//     return  mm+'/'+dd+'/'+yyyy
// };

// Date.prototype.addSeconds = function(second) {
//     return new Date(this.getTime() + (second * 1000));
// };

// String.prototype.formatToDate = function (formatToString, formatToDate) {
//     var dateFormat = 'yyyy-MM-dd';//formatToString;

//     // console.log('dateFormat:' + dateFormat);
//     // if (dateFormat == null) {
//     //     if (window.CoreConfig != null && window.CoreConfig.Language.startsWith('en')) {
//     //         dateFormat = 'yyyy-MM-dd';
//     //     }
//     //     else {
//     //         dateFormat = 'dd-MM-yyyy';
//     //     }
//     // }
//     var date = new Date(this);
//     return date.format(dateFormat);
// };

// String.prototype.addSpaceAfterComma = function () {
//     let arr = this.split(',');
//     let s = "";
//     if(arr && arr.length){
//         for(let c of arr){
//             s+= c + ", ";
//         }
//     }
//     return s;
// };

// Number.prototype.format = function (type, format) {
//     type = type || 'number';    
//     format = format || '0.00';

//     // TODO: remove dependency of $ig
//     if (type == 'int' || format == 'int') {
//         return $.ig.formatter(parseInt(this), 'number', 'int');
//     }   
//     else {
//         return $.ig.formatter(parseFloat(this), type, format);
//     }
// };

// if (typeof Object.assign != 'function') {
//     Object.assign = function(target) {
//       'use strict';
//       if (target == null) {
//         throw new TypeError('Cannot convert undefined or null to object');
//       }
  
//       target = Object(target);
//       for (var index = 1; index < arguments.length; index++) {
//         var source = arguments[index];
//         if (source != null) {
//           for (var key in source) {
//             if (Object.prototype.hasOwnProperty.call(source, key)) {
//               target[key] = source[key];
//             }
//           }
//         }
//       }
//       return target;
//     };
//   }

//   if (!String.prototype.startsWith) {
//     String.prototype.startsWith = function(searchString, position) {
//       position = position || 0;
//       return this.indexOf(searchString, position) === position;
//     };
//   }
// //# sourceURL= Extensions.js