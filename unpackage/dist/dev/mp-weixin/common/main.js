(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],[
/* 0 */
/*!************************************************!*\
  !*** /Users/coderyh/Downloads/ydyyapp/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ 5);

var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 6));


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _uviewUi = _interopRequireDefault(__webpack_require__(/*! uview-ui */ 12));

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 136));



var _voicePlays = _interopRequireDefault(__webpack_require__(/*! ./js_sdk/voicePlay/voicePlays/voicePlays.js */ 138));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__; //???vuex?????????????????????
_vue.default.prototype.$store = _store.default;_vue.default.prototype.$voice = _voicePlays.default;
_vue.default.use(_uviewUi.default);

_vue.default.config.productionTip = false;
_App.default.mpType = 'app';
var app = new _vue.default(_objectSpread(_objectSpread({},
_App.default), {}, {
  store: _store.default }));

// ????????????????????????app????????????????????????
__webpack_require__(/*! network/request.js */ 139)(app);
createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!************************************************!*\
  !*** /Users/coderyh/Downloads/ydyyapp/App.vue ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 7);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ 9);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 7 */
/*!*************************************************************************!*\
  !*** /Users/coderyh/Downloads/ydyyapp/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 8);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 8 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/coderyh/Downloads/ydyyapp/App.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//

var setT;var _default =
{
  globalData: {
    // httpUrl: "http://webapibeta.mzsale.com",
    httpUrl: "http://self.mzsale.com",
    fontStart: "<font style='color:#3C9CFF'>",
    fontEnd: "</font>",
    analysisAuth: [],
    replist: [{ // ??????????????? ?????????
      id: "goshop",
      alias: "goshoping",
      name: "????????????" },

    {
      id: "addshop",
      alias: "addshoping",
      name: "????????????" },

    {
      id: "getstorage",
      alias: "getstorage",
      name: "????????????" },

    {
      id: "checkshop",
      alias: "checking",
      name: "????????????" },

    {
      id: "cgdcheck",
      alias: "getcgd",
      name: "????????????" },

    {
      id: "workflow",
      alias: "work",
      name: "????????????" },

    {
      id: "notice",
      alias: "notice",
      name: "????????????" },

    {
      id: "download",
      alias: "down",
      name: "????????????" },

    {
      id: "pricelabel",
      alias: "spriceLable",
      name: "????????????" },

    {
      id: "pickcheck",
      alias: "picking",
      name: "????????????" },

    {
      id: "goodstock",
      alias: "goodsstock",
      name: "??????????????????" },

    {
      id: "PHZP08",
      alias: "zpdlr",
      name: "???????????????" },

    {
      id: "PHZP03",
      alias: "pddlr",
      name: "???????????????" },

    {
      id: "yxaddshop",
      alias: "yxaddshoping",
      name: "????????????" },

    {
      id: "prepay",
      alias: "prepay",
      name: "?????????" },

    {
      id: "mpos",
      alias: "mpos",
      name: "????????????" },

    // lct.....................................
    {
      id: "yxychz",
      alias: "ychz",
      name: "????????????" },

    {
      id: "yxspyc",
      alias: "spycg",
      name: "????????????" },

    {
      id: "yxycys",
      alias: "ycgdhys",
      name: "????????????" },

    {
      id: "yxmdfj",
      alias: "spfjph",
      name: "????????????" },

    {
      id: "yxmdys",
      alias: "mddhqr",
      name: "????????????" },

    {
      id: "yxzbsh",
      alias: "yxbhsh",
      name: "????????????" },

    {
      id: "yxzjjh",
      alias: "yxzjjh",
      name: "????????????" },

    {
      id: "yxzchh",
      alias: "ycdwh",
      name: "???????????????" },

    {
      id: "yxbzxth",
      alias: "bzxth",
      name: "???????????????" }],


    appArr: [{
      "name": "??????",
      "url": "/pages/home/home" },
    {
      "name": "??????",
      "permissionName": "ToDaySale" },
    {
      "name": "??????",
      "url": "/pages/home/component/search/search" },
    {
      "name": "??????",
      "url": "/pages/function/function" },
    {
      "name": "??????",
      "url": "/pages/function/component/download/download",
      "permissionName": "download" },
    {
      "name": "??????",
      "url": "/pages/function/component/help/help" },
    {
      "name": "????????????",
      "url": "/pages/function/component/goshoping/goshoping",
      "permissionName": "goshop" },
    {
      "name": "????????????",
      "url": "/pages/function/component/addshoping/addshoping",
      "permissionName": "addshop" },
    {
      "name": "????????????",
      "url": "/pages/function/component/getstorage/getstorage",
      "permissionName": "getstorage" },
    {
      "name": "????????????",
      "url": "/pages/function/component/checkshoping/checkshoping",
      "permissionName": "checkshop" },
    {
      "name": "????????????",
      "url": "/pages/function/component/getcgd/getcgd",
      "permissionName": "cgdcheck" },
    {
      "name": "????????????",
      "url": "/pages/function/component/goodspricelable/goodspricelable",
      "permissionName": "pricelabel" },
    {
      "name": "????????????",
      "url": "/pages/function/component/picking/picking",
      "permissionName": "pickcheck" },
    {
      "name": "????????????",
      "url": "/pages/function/component/work/work",
      "permissionName": "workflow" },
    {
      "name": "????????????",
      "url": "/pages/function/component/notice/notice",
      "permissionName": "notice" },
    {
      "name": "????????????",
      "url": "/pages/function/component/goodsstock/goodsstock",
      "permissionName": "goodstock" },
    {
      "name": "????????????",
      "url": "/pages/function/component/yxaddshoping/yxaddshoping",
      "permissionName": "yxaddshop" },
    {
      "name": "?????????",
      "url": "/pages/function/component/prepay/prepay",
      "permissionName": "prepay" },
    {
      "name": "??????",
      "url": "/pages/function/component/mpos/mpos",
      "permissionName": "mpos" },
    {
      "name": "????????????",
      "url": "/pages/function/component/lct/lct" },
    {
      "name": "????????????",
      "url": "/pages/function/component/lct/bhychz",
      "permissionName": "yxychz" },
    {
      "name": "????????????",
      "url": "/pages/function/component/lct/spycg/spycg",
      "permissionName": "yxspyc" },
    {
      "name": "????????????",
      "url": "/pages/function/component/lct/ycgdhys/ycgdhys",
      "permissionName": "yxycys" },
    {
      "name": "????????????",
      "url": "/pages/function/component/lct/yxzjjh/yxzjjh",
      "permissionName": "yxzjjh" },
    {
      "name": "????????????",
      "url": "/pages/function/component/lct/spfjph/spfjph",
      "permissionName": "yxmdfj" },
    {
      "name": "????????????",
      "url": "/pages/function/component/lct/mddhqr/mddhqr",
      "permissionName": "yxmdys" },
    {
      "name": "????????????",
      "url": "/pages/function/component/lct/yxbhsh/yxbhsh",
      "permissionName": "yxzbsh" },
    {
      "name": "???????????????",
      "url": "/pages/function/component/lct/ycdwh/ycdwh",
      "permissionName": "yxzchh" },
    {
      "name": "???????????????",
      "url": "/pages/function/component/zpdlr/zpdlr",
      "permissionName": "PHZP08" },
    {
      "name": "???????????????",
      "url": "/pages/function/component/pddlr/pddlr",
      "permissionName": "PHZP03" },
    {
      "name": "??????",
      "url": "/pages/statement/statement" },
    {
      "name": "??????",
      "url": "/pages/my/my" },
    {
      "name": "??????",
      "url": "/pages/my/component/set/set" },
    {
      "name": "??????????????????",
      "url": "/pages/my/component/set/component/enterprise/enterprise" },
    {
      "name": "????????????",
      "url": "/pages/my/component/set/component/message/message" },
    {
      "name": "????????????",
      "url": "/pages/my/component/set/component/loginMode/loginMode" },
    {
      "name": "??????",
      "url": "/pages/my/component/set/component/commonSwitch/commonSwitch" },
    {
      "name": "????????????",
      "url": "/pages/my/component/set/component/updatePwd/updatePwd" },
    {
      "name": "????????????",
      "url": "/pages/my/component/set/component/appLogout/appLogout" },
    {
      "name": "????????????",
      "url": "/pages/my/component/set/component/checkUpdate/checkUpdate" },
    {
      "name": "????????????",
      "url": "/pages/my/component/set/component/feeback/feeback" },
    {
      "name": "????????????",
      "url": "/pages/my/component/set/component/about/about" },
    {
      "name": "??????",
      "url": "http://mzsale.com" }] },



  onLaunch: function onLaunch() {
    // _www????????????????????????
    // _doc???????????????????????????
    // _documents??????????????????????????????????????????????????????????????????
    // _downloads?????????????????????????????????????????????????????????
    console.log('App onLaunch');
    // ??????????????????





    //???????????????????????? uuid
    uni.getStorage({
      key: 'uuid',
      fail: function fail(err) {










      } });


    // ???????????????ip??????
    uni.getStorage({
      key: 'ip',
      fail: function fail(err) {
        uni.request({
          url: "http://self.mzsale.com/mzsale/web/login",
          data: {},
          method: "GET",
          header: {
            "Content-Type": "application/json" },

          success: function success(res) {
            // console.log("??????ip res",res)
            if (res.data.error_code == 0) {
              uni.setStorageSync("ip", res.data.ip);
            }
          } });

      } });



    uni.setStorageSync("model", "Test");

    // ?????????????????????????????????
    uni.getSystemInfo({
      success: function success(res) {
        uni.setStorageSync("device", res.brand);
      } });

    // ???????????????????????????...............................
    uni.getStorage({
      key: 'loginNum',
      fail: function fail(err) {
        uni.setStorageSync('loginNum', 3);
      } });

    // ?????????????????????????????????...............................
    uni.getStorage({
      key: 'quiteNum',
      fail: function fail(err) {
        uni.setStorageSync('quiteNum', 3);
      } });


    // ??????>>????????????
    uni.getStorage({
      key: 'work',
      fail: function fail(err) {
        uni.setStorageSync('work', true);
      } });

    uni.getStorage({
      key: 'notice',
      fail: function fail(err) {
        uni.setStorageSync('notice', true);
      } });

    uni.getStorage({
      key: 'system',
      fail: function fail(err) {
        uni.setStorageSync('system', true);
      } });

    uni.getStorage({
      key: 'activity',
      fail: function fail(err) {
        uni.setStorageSync('activity', true);
      } });

    // ??????>>??????????????????
    uni.getStorage({
      key: 'off',
      fail: function fail(err) {
        uni.setStorageSync('off', false);
      } });

    uni.getStorage({
      key: 'pda',
      fail: function fail(err) {
        uni.setStorageSync('pda', false);
      } });

    uni.getStorage({
      key: 'pos',
      fail: function fail(err) {
        uni.setStorageSync('pos', false);
      } });

    uni.getStorage({
      key: 'print',
      fail: function fail(err) {
        uni.setStorageSync('print', false);
      } });

    uni.getStorage({
      key: 'lockScreen',
      success: function success(res) {},
      fail: function fail(err) {
        uni.setStorageSync('lockScreen', false);
        //?????????????????? ?????? ??????
        uni.setKeepScreenOn({
          keepScreenOn: true });

      } });

    // AI??????
    uni.getStorage({
      key: 'isCamera',
      fail: function fail(err) {
        uni.setStorageSync('isCamera', true);
      } });

    uni.getStorage({
      key: 'isAlbum',
      fail: function fail(err) {
        uni.setStorageSync('isAlbum', true);
      } });

    uni.getStorage({
      key: 'speech_lang',
      fail: function fail(err) {
        uni.setStorageSync('speech_lang', "zh-cn");
      } });

    uni.getStorage({
      key: 'speech_errTimes',
      fail: function fail(err) {
        uni.setStorageSync('speech_errTimes', "2");
      } });

    uni.getStorage({
      key: 'voice_yusu',
      fail: function fail(err) {
        uni.setStorageSync('voice_yusu', 5);
      } });

    uni.getStorage({
      key: 'voice_yindiao',
      fail: function fail(err) {
        uni.setStorageSync('voice_yindiao', 5);
      } });

    uni.getStorage({
      key: 'voice_yinliang',
      fail: function fail(err) {
        uni.setStorageSync('voice_yinliang', 5);
      } });

    uni.getStorage({
      key: 'voice_per',
      fail: function fail(err) {
        uni.setStorageSync('voice_per', "0");
      } });



    // ?????? only ?????????



















    // ?????? ????????? ?????????
    uni.getStorage({
      key: 'downloadPath',
      success: function success(res) {



















      } });



  },
  onShow: function onShow() {
    console.log("App onShow");
    // ????????????????????? token
    var dates = new Date();
    var y = dates.getFullYear();
    var m = dates.getMonth() + 1;
    var d = dates.getDate();
    var newdate = "".concat(y, "-").concat(m, "-").concat(d);
    if (newdate != uni.getStorageSync('checkVersionDate')) {
      uni.request({
        url: "https://aip.baidubce.com/oauth/2.0/token",
        data: {
          "grant_type": "client_credentials",
          "client_id": "toMm0BN0ot2Vrq6b5GfOO4uj", //???????????? ?????????API Key
          "client_secret": "QICAA8G7gRTDiRqC9ogGCEkRlr7SQFNi" //???????????? ?????????Secret Key
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded" },

        success: function success(res) {
          if (res.statusCode == 200) {
            uni.setStorageSync("baiduToken", res.data.access_token);
          }
        } });

    }
    // // ?????? ?????????????????? ????????? token
    // uni.request({
    // 	url: "https://aip.baidubce.com/oauth/2.0/token",
    // 	data: {
    // 		"grant_type": "client_credentials",
    // 		"client_id": "CbGt2YQeWELPjvAAoLNDXmQ7", //?????????????????? ?????????API Key
    // 		"client_secret": "wAkC3f23MCfWwsCH9lbg0zQewG9Suv6N" //?????????????????? ?????????Secret Key
    // 	},
    // 	method: "POST",
    // 	header: {
    // 		"Content-Type": "application/x-www-form-urlencoded"
    // 	},
    // 	success: (res) => {
    // 		if (res.statusCode == 200) {
    // 			uni.setStorageSync("nlpToken", res.data.access_token);
    // 		}
    // 	}
    // })

    // uni.getStorageInfo({//??????app??????????????????
    // 	success: (res)=> {
    // 		res.keys.forEach((v,i,arr)=>{
    // 			console.log("app????????????????????????"+v,uni.getStorageSync(v))
    // 		})
    // 	}
    // });
    console.log("access_token access_token", uni.getStorageSync("access_token"));


    clearTimeout(setT);
  },
  onHide: function onHide() {
    console.log("App Hide");
    setT = setTimeout(function () {
      console.log("App QQQQQQuit");



    }, 1800000); //30??????
  },
  methods: {} };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 9 */
/*!**********************************************************************************!*\
  !*** /Users/coderyh/Downloads/ydyyapp/App.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */ 10);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 10 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/coderyh/Downloads/ydyyapp/App.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })
],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map