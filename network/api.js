const http = uni.$u.http

// post请求，获取菜单
//export const postMenu = (params, config = {}) => http.post("/ebapi/public_api/index", params, config)
// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
//export const getMenu = (data) => http.get("/ebapi/public_api/index", data)


//图片/Excel/文件统一上传接口
export const UploadWB = (params, config = {}) => http.post("/mzsale/web/basic/upload", params, config)
//单据附件维护管理接口
export const Extfiles = (params, config = {}) => http.post("/mzsale/web/basic/extfiles", params, config)
//PC发起手机协作上传文件
export const InAppUpload = (params, config = {}) => http.post("/mzsale/web/basic/in/app/upload", params, config)


//新版在线采购单、补货单、入库单、盘点单。。。。。。开始
//查询动态报表条件
export const Condition = (params, config = {}) => http.post("/mzsale/web/report/condition", params, config)
export const Basic = (params, config = {}) => http.post("/mzsale/web/basic", params, config)
export const OrderNew = (params, config = {}) => http.post("/mzsale/web/common/order/new", params, config)
//查询报表明细
export const GetlistF = (params, config = {}) => http.post("/mzsale/web/report/getlist", params, config)

export const QueryHT = (params, config = {}) => http.post("/mzsale/web/contract/ht/query", params, config)
export const Queryall = (params, config = {}) => http.post("/mzsale/web/goodstype/queryall", params, config)
export const CgdCheck = (params, config = {}) => http.post("/mzsale/web/cgd/check", params, config)
export const CgysDelete = (params, config = {}) => http.post("/mzsale/web/cgys/delete", params, config)
export const Search = (params, config = {}) => http.post("/mzsale/web/goods/search", params, config)
export const GetlistC = (params, config = {}) => http.post("/mzsale/web/common/getlist", params, config)
export const CgdDosave = (params, config = {}) => http.post("/mzsale/web/cgd/dosave", params, config)
export const CgdDelLine = (params, config = {}) => http.post("/mzsale/web/cgd/delete/line", params, config)
// 补货单
export const BhdSpckl = (params, config = {}) => http.post("/mzsale/web/bhd/spckl", params, config)
export const BhdCheck = (params, config = {}) => http.post("/mzsale/web/bhd/check", params, config)
export const BhdDelete = (params, config = {}) => http.post("/mzsale/web/bhd/delete", params, config)
export const BhdDosave = (params, config = {}) => http.post("/mzsale/web/bhd/dosave", params, config)
export const BhdDelLine = (params, config = {}) => http.post("/mzsale/web/bhd/delete/line", params, config)
//入库单
export const RkdCheck = (params, config = {}) => http.post("/mzsale/web/rkd/check", params, config)
export const RkdDelete = (params, config = {}) => http.post("/mzsale/web/rkd/delete", params, config)
export const RkdDosave = (params, config = {}) => http.post("/mzsale/web/rkd/dosave", params, config)
export const RkdDelLine = (params, config = {}) => http.post("/mzsale/web/rkd/delete/line", params, config)
//盘点单
export const QueryCk = (params, config = {}) => http.post("/mzsale/web/pdd/start/ck/query", params, config)
export const PddCheck = (params, config = {}) => http.post("/mzsale/web/pdd/check", params, config)
export const PddDelete = (params, config = {}) => http.post("/mzsale/web/pdd/delete", params, config)
export const PddDosave = (params, config = {}) => http.post("/mzsale/web/pdd/dosave", params, config)
export const PddDelLine = (params, config = {}) => http.post("/mzsale/web/pdd/delete/line", params, config)
//新版在线采购单、补货单、入库单、盘点单。。。。。。结束
//退库单
export const Sppc = (params, config = {}) => http.post("/mzsale/web/common/sppc", params, config)
export const ThdCheck = (params, config = {}) => http.post("/mzsale/web/thd/check", params, config)
export const ThdDelete = (params, config = {}) => http.post("/mzsale/web/thd/delete", params, config)
export const ThdDosave = (params, config = {}) => http.post("/mzsale/web/thd/dosave", params, config)
export const ThdDelLine = (params, config = {}) => http.post("/mzsale/web/thd/delete/line", params, config)


//刷新token
export const refreshtoken = (params, config = {}) => http.post("/mzsale/web/token", params, config)

//商家预付款
export const businessprepay = (params, config = {}) => http.post("/mzato/app/businessprepay", params, config)
//商家预付款 上传图片
export const businessUploadImg = (params, config = {}) => http.post("/mzato/businessprepay/upload", params, config)

//永续采购 流程图 公用接口
export const commonMain = (params, config = {}) => http.post("/mzato/main", params, config)

//永采单维护 编辑
export const bsinfo = (params, config = {}) => http.post("/mzato/main/ycorder/bsinfo", params, config)
//永采单维护 详情、明细 
export const bsmxdata = (params, config = {}) => http.post("/mzato/main/ycorder/bsmxdata", params, config)

//手机验证码
export const bindphone = (params, config = {}) => http.post("/mzato/main/app/bindphone", params, config)

// APP 检查userid 合法，获取商户id
export const checkuserid = (params, config = {}) => http.post("/mzsale/web/login/usercheckapp", params, config)
// APP登录/注销/修改密码/获取授权 接口
export const usercheck = (params, config = {}) => http.post("/mzato/main/app/usercheck", params, config)

//检测门店是否在线门店接口
export const ckonlinefd = (params, config = {}) => http.post("/mzato/main/app/ckonlinefd", params, config)
//第三方登录
export const logintype = (params, config = {}) => http.post("/mzato/main/app/logintype", params, config)
//
export const sendCheck = (params, config = {}) => http.post("/mzato/main/app/sendcheck", params, config)

//三方验证
export const userfast = (params, config = {}) => http.post("/mzato/main/app/userfast", params, config)
//登录日志
export const getlogin = (params, config = {}) => http.post("/mzato/main/app/getlogin", params, config)
//问题反馈
export const getQuestion = (params, config = {}) => http.post("/mzato/main/app/getquestion", params, config)
//问题反馈 进度查询
export const Question = (params, config = {}) => http.post("/mzato/main/app/question", params, config)
//问题反馈 常用问题查询、搜索
export const comQuestion = (params, config = {}) => http.post("/mzato/main/app/comquestion", params, config)

//公告拉取,验收完成处理
export const oaNoticec = (params, config = {}) => http.post("/mzato/main/app/oanoticec", params, config)
//公告内容预览
export const getnotice = (params, config = {}) => http.post("/mzato/main/app/getnotice", params, config)
//公告回复操作
export const oaNoticeRey = (params, config = {}) => http.post("/mzato/main/app/oanoticerey", params, config)
// 拉取该公告回复数据
export const oaNoticeb = (params, config = {}) => http.post("/mzato/main/app/oanoticeb", params, config)

//获取最新工作信息
export const oaWorkFlow = (params, config = {}) => http.post("/mzato/main/app/oaworkflow", params, config)
// app获取首页仪表盘分析数据
export const getpctodayssale = (params, config = {}) => http.post("/mzato/main/app/getpctodayssale", params, config)
//工作流快速处理
export const oaWorkFlowWCk = (params, config = {}) => http.post("/mzato/main/app/oaworkflowwck", params, config)

//应用更新上传版本号信息
export const Versionrecord = (params, config = {}) => http.post("/mzato/main/app/versionrecord", params, config)
//应用检查更新
// export const appCheckVersion = (params, config = {}) => http.post("/mzato/main/app/appcheckversion", params, config)
//工作流内容预览
export const getDJdata = (params, config = {}) => http.post("/mzato/main/app/getdjdata", params, config)
//工作流内容处理
export const oaNoticeCk = (params, config = {}) => http.post("/mzato/main/app/oanoticeck", params, config)
//OA与APP获取必要信息
export const getother = (params, config = {}) => http.post("/mzato/main/app/getother", params, config)

//商品采购接口
//查询分店信息
export const getFenDian = (params, config = {}) => http.post("/mzato/main/app/getfendians", params, config)

//商品上传更新
export const uploadgoshoping = (params, config = {}) => http.post("/mzato/main/app/uploadgoshoping", params, config)
//在线查找商品
export const searchGoods = (params, config = {}) => http.post("/mzato/main/app/searchgoods", params, config)
//在线查找商家
export const searchSupplier = (params, config = {}) => http.post("/mzato/main/app/searchsupplier", params, config)
//更新供货方式信息
export const getSupplyType = (params, config = {}) => http.post("/mzato/main/app/getsupplytype", params, config)
//更新部门信息
export const getDeparts = (params, config = {}) => http.post("/mzato/main/app/getdeparts", params, config)

//报表查询接口
//更新商家信息
export const getSupplier = (params, config = {}) => http.post("/mzato/main/app/getsupplier", params, config)

//12个综合报表
export const reportForm = (params, config = {}) => http.post("/mzato/main/app/reportform", params, config)
//查询报表明细
export const getlistRC = (params, config = {}) => http.post("/mzsale/web/report/condition/getlist", params, config)

// //商家销售
// export const checkSjSale = (params, config = {}) => http.post("/mzato/main/app/checkSjSale", params, config)
// //收银缴款查询
// export const getQuerySyySaleJK = (params, config = {}) => http.post("/mzato/main/app/getQuerySyySaleJK", params, config)
// //销售日报
// export const saleCWbb = (params, config = {}) => http.post("/mzato/main/app/saleCWbb", params, config)
// //部门分析
// export const queryBMSalebb = (params, config = {}) => http.post("/mzato/main/app/queryBMSalebb", params, config)
// //大类分析
// export const fdSuperSale = (params, config = {}) => http.post("/mzato/main/app/fdSuperSale", params, config)
// //门店分析
// export const fdSaleAnalyze = (params, config = {}) => http.post("/mzato/main/app/fdSaleAnalyze", params, config)
// //大类指标
// export const fdSPTypeAnalyze = (params, config = {}) => http.post("/mzato/main/app/fdSPTypeAnalyze", params, config)
// //应付账款
// export const cwsjjxcInfo = (params, config = {}) => http.post("/mzato/main/app/cwsjjxcInfo", params, config)
// //商品详情
// export const spkcinfo = (params, config = {}) => http.post("/mzato/main/app/spkcinfo", params, config)
//商品库存详情
export const qySpkcinfo = (params, config = {}) => http.post("/mzato/main/app/qyspkcinfo", params, config)
// //销售客单统计
// export const custombb = (params, config = {}) => http.post("/mzato/main/app/custombb", params, config)
// //顾客消费分析
// export const query002 = (params, config = {}) => http.post("/mzato/main/app/query002", params, config)
// //商品销售综合
// export const querySPSalebb = (params, config = {}) => http.post("/mzato/main/app/querySPSalebb", params, config)


//实时获取报表数据
export const getAPPSaleReport = (params, config = {}) => http.post("/mzato/main/app/getappsalereport", params, config)
// 获取报表播报权限
export const ReprotContion = (params, config = {}) => http.post("/mzato/main/app/reprotcontion", params, config)

//获取采购数据
export const getCGDdata = (params, config = {}) => http.post("/mzato/main/app/getcgddata", params, config)
//验收完成处理
export const getCGDdataCK = (params, config = {}) => http.post("/mzato/main/app/getcgddatack", params, config)
//获取实时报表数据
export const getToDaySale = (params, config = {}) => http.post("/mzato/main/app/gettodaysale", params, config)

//商品补货接口
//离线上传补货单
export const uploadList = (params, config = {}) => http.post("/mzato/main/app/uploadlist", params, config)
//获取永续补货数据
export const getYXBHData = (params, config = {}) => http.post("/mzato/main/app/getyxbhdata", params, config)

//商品入库
//更新仓库信息
export const getCheckStorage = (params, config = {}) => http.post("/mzato/main/app/getcheckstorage", params, config)
//离线上传入库单
export const uploadstorage = (params, config = {}) => http.post("/mzato/main/app/uploadstorage", params, config)
//查询商品库存概况
export const getGoodsStock = (params, config = {}) => http.post("/mzato/main/app/getGoodsstock", params, config)
//商品拣货处理
export const getPickArea = (params, config = {}) => http.post("/mzato/main/app/getpickarea", params, config)

//商品盘点接口
//离线盘点单上传
export const uploadCheckList = (params, config = {}) => http.post("/mzato/main/app/uploadchecklist", params, config)

//录标价签
//上传标价签
export const uploadLabelList = (params, config = {}) => http.post("/mzato/main/app/uploadlabellist", params, config)
//永续补货 上传
export const upload = (params, config = {}) => http.post("/mzato/main/app/upload", params, config)

//手动生成离线包
//手动生成离线数据包
export const upLoaddata = (params, config = {}) => http.post("/mzato/main/app/uploaddata", params, config)

//获取引导页图片
export const Guide = (data) => http.get("/mzato/app/guide", data)