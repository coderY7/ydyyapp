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
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__; //把vuex定义成全局组件
_vue.default.prototype.$store = _store.default;_vue.default.prototype.$voice = _voicePlays.default;
_vue.default.use(_uviewUi.default);

_vue.default.config.productionTip = false;
_App.default.mpType = 'app';
var app = new _vue.default(_objectSpread(_objectSpread({},
_App.default), {}, {
  store: _store.default }));

// 引入请求封装，将app参数传递到配置中
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
    replist: [{ // 判断功能的 权限名
      id: "goshop",
      alias: "goshoping",
      name: "商品采购" },

    {
      id: "addshop",
      alias: "addshoping",
      name: "商品补货" },

    {
      id: "getstorage",
      alias: "getstorage",
      name: "商品入库" },

    {
      id: "checkshop",
      alias: "checking",
      name: "商品盘点" },

    {
      id: "cgdcheck",
      alias: "getcgd",
      name: "采购验收" },

    {
      id: "workflow",
      alias: "work",
      name: "我的工作" },

    {
      id: "notice",
      alias: "notice",
      name: "公告通知" },

    {
      id: "download",
      alias: "down",
      name: "数据下载" },

    {
      id: "pricelabel",
      alias: "spriceLable",
      name: "录标价签" },

    {
      id: "pickcheck",
      alias: "picking",
      name: "配送拣货" },

    {
      id: "goodstock",
      alias: "goodsstock",
      name: "商品库存概况" },

    {
      id: "PHZP08",
      alias: "zpdlr",
      name: "直配单录入" },

    {
      id: "PHZP03",
      alias: "pddlr",
      name: "配调单录入" },

    {
      id: "yxaddshop",
      alias: "yxaddshoping",
      name: "永续补货" },

    {
      id: "prepay",
      alias: "prepay",
      name: "预付款" },

    {
      id: "mpos",
      alias: "mpos",
      name: "移动收银" },

    // lct.....................................
    {
      id: "yxychz",
      alias: "ychz",
      name: "预采汇总" },

    {
      id: "yxspyc",
      alias: "spycg",
      name: "商品预采" },

    {
      id: "yxycys",
      alias: "ycgdhys",
      name: "预采验收" },

    {
      id: "yxmdfj",
      alias: "spfjph",
      name: "门店分拣" },

    {
      id: "yxmdys",
      alias: "mddhqr",
      name: "门店验收" },

    {
      id: "yxzbsh",
      alias: "yxbhsh",
      name: "永续审核" },

    {
      id: "yxzjjh",
      alias: "yxzjjh",
      name: "直接拣货" },

    {
      id: "yxzchh",
      alias: "ycdwh",
      name: "永采单维护" },

    {
      id: "yxbzxth",
      alias: "bzxth",
      name: "包装箱退回" }],


    appArr: [{
      "name": "首页",
      "url": "/pages/home/home" },
    {
      "name": "快报",
      "permissionName": "ToDaySale" },
    {
      "name": "搜索",
      "url": "/pages/home/component/search/search" },
    {
      "name": "功能",
      "url": "/pages/function/function" },
    {
      "name": "下载",
      "url": "/pages/function/component/download/download",
      "permissionName": "download" },
    {
      "name": "帮助",
      "url": "/pages/function/component/help/help" },
    {
      "name": "商品采购",
      "url": "/pages/function/component/goshoping/goshoping",
      "permissionName": "goshop" },
    {
      "name": "商品补货",
      "url": "/pages/function/component/addshoping/addshoping",
      "permissionName": "addshop" },
    {
      "name": "商品入库",
      "url": "/pages/function/component/getstorage/getstorage",
      "permissionName": "getstorage" },
    {
      "name": "商品盘点",
      "url": "/pages/function/component/checkshoping/checkshoping",
      "permissionName": "checkshop" },
    {
      "name": "采购验收",
      "url": "/pages/function/component/getcgd/getcgd",
      "permissionName": "cgdcheck" },
    {
      "name": "录标价签",
      "url": "/pages/function/component/goodspricelable/goodspricelable",
      "permissionName": "pricelabel" },
    {
      "name": "配送拣货",
      "url": "/pages/function/component/picking/picking",
      "permissionName": "pickcheck" },
    {
      "name": "我的工作",
      "url": "/pages/function/component/work/work",
      "permissionName": "workflow" },
    {
      "name": "公告通知",
      "url": "/pages/function/component/notice/notice",
      "permissionName": "notice" },
    {
      "name": "商品库存",
      "url": "/pages/function/component/goodsstock/goodsstock",
      "permissionName": "goodstock" },
    {
      "name": "永续补货",
      "url": "/pages/function/component/yxaddshoping/yxaddshoping",
      "permissionName": "yxaddshop" },
    {
      "name": "预付款",
      "url": "/pages/function/component/prepay/prepay",
      "permissionName": "prepay" },
    {
      "name": "收银",
      "url": "/pages/function/component/mpos/mpos",
      "permissionName": "mpos" },
    {
      "name": "永续采购",
      "url": "/pages/function/component/lct/lct" },
    {
      "name": "预采汇总",
      "url": "/pages/function/component/lct/bhychz",
      "permissionName": "yxychz" },
    {
      "name": "商品预采",
      "url": "/pages/function/component/lct/spycg/spycg",
      "permissionName": "yxspyc" },
    {
      "name": "预采验收",
      "url": "/pages/function/component/lct/ycgdhys/ycgdhys",
      "permissionName": "yxycys" },
    {
      "name": "直接拣货",
      "url": "/pages/function/component/lct/yxzjjh/yxzjjh",
      "permissionName": "yxzjjh" },
    {
      "name": "门店分拣",
      "url": "/pages/function/component/lct/spfjph/spfjph",
      "permissionName": "yxmdfj" },
    {
      "name": "门店验收",
      "url": "/pages/function/component/lct/mddhqr/mddhqr",
      "permissionName": "yxmdys" },
    {
      "name": "永续审核",
      "url": "/pages/function/component/lct/yxbhsh/yxbhsh",
      "permissionName": "yxzbsh" },
    {
      "name": "永采单维护",
      "url": "/pages/function/component/lct/ycdwh/ycdwh",
      "permissionName": "yxzchh" },
    {
      "name": "直配单录入",
      "url": "/pages/function/component/zpdlr/zpdlr",
      "permissionName": "PHZP08" },
    {
      "name": "配调单录入",
      "url": "/pages/function/component/pddlr/pddlr",
      "permissionName": "PHZP03" },
    {
      "name": "报表",
      "url": "/pages/statement/statement" },
    {
      "name": "我的",
      "url": "/pages/my/my" },
    {
      "name": "设置",
      "url": "/pages/my/component/set/set" },
    {
      "name": "注册企业门店",
      "url": "/pages/my/component/set/component/enterprise/enterprise" },
    {
      "name": "消息通知",
      "url": "/pages/my/component/set/component/message/message" },
    {
      "name": "登录方式",
      "url": "/pages/my/component/set/component/loginMode/loginMode" },
    {
      "name": "开关",
      "url": "/pages/my/component/set/component/commonSwitch/commonSwitch" },
    {
      "name": "修改密码",
      "url": "/pages/my/component/set/component/updatePwd/updatePwd" },
    {
      "name": "应用登出",
      "url": "/pages/my/component/set/component/appLogout/appLogout" },
    {
      "name": "检查更新",
      "url": "/pages/my/component/set/component/checkUpdate/checkUpdate" },
    {
      "name": "问题反馈",
      "url": "/pages/my/component/set/component/feeback/feeback" },
    {
      "name": "关于我们",
      "url": "/pages/my/component/set/component/about/about" },
    {
      "name": "商城",
      "url": "http://mzsale.com" }] },



  onLaunch: function onLaunch() {
    // _www，仅应用自身可读
    // _doc，仅应用自身可读写
    // _documents，多应用时都可读写，常用于保存应用间共享文件
    // _downloads，多应用时都可读写，常用于保存下载文件
    console.log('App onLaunch');
    // 禁止用户截屏





    //获取设备唯一标识 uuid
    uni.getStorage({
      key: 'uuid',
      fail: function fail(err) {










      } });


    // 获取设备的ip地址
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
            // console.log("获取ip res",res)
            if (res.data.error_code == 0) {
              uni.setStorageSync("ip", res.data.ip);
            }
          } });

      } });



    uni.setStorageSync("model", "Test");

    // 获取打印需要的设备信息
    uni.getSystemInfo({
      success: function success(res) {
        uni.setStorageSync("device", res.brand);
      } });

    // 错误的登录次数限制...............................
    uni.getStorage({
      key: 'loginNum',
      fail: function fail(err) {
        uni.setStorageSync('loginNum', 3);
      } });

    // 错误的快速登录次数限制...............................
    uni.getStorage({
      key: 'quiteNum',
      fail: function fail(err) {
        uni.setStorageSync('quiteNum', 3);
      } });


    // 设置>>消息通知
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

    // 设置>>常用开关设置
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
        //设置应用保持 常亮 状态
        uni.setKeepScreenOn({
          keepScreenOn: true });

      } });

    // AI设置
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



    // 打开 only 数据库



















    // 打开 下载的 数据库
    uni.getStorage({
      key: 'downloadPath',
      success: function success(res) {



















      } });



  },
  onShow: function onShow() {
    console.log("App onShow");
    // 百度人脸使用的 token
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
          "client_id": "toMm0BN0ot2Vrq6b5GfOO4uj", //百度人脸 应用的API Key
          "client_secret": "QICAA8G7gRTDiRqC9ogGCEkRlr7SQFNi" //百度人脸 应用的Secret Key
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
    // // 百度 自然语言理解 使用的 token
    // uni.request({
    // 	url: "https://aip.baidubce.com/oauth/2.0/token",
    // 	data: {
    // 		"grant_type": "client_credentials",
    // 		"client_id": "CbGt2YQeWELPjvAAoLNDXmQ7", //百度语言理解 应用的API Key
    // 		"client_secret": "wAkC3f23MCfWwsCH9lbg0zQewG9Suv6N" //百度语言理解 应用的Secret Key
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

    // uni.getStorageInfo({//查看app所有缓存键值
    // 	success: (res)=> {
    // 		res.keys.forEach((v,i,arr)=>{
    // 			console.log("app缓存键值————"+v,uni.getStorageSync(v))
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



    }, 1800000); //30分钟
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