/*
 * @Author: Eddy Huang
 * @Date: 2021-01-25 14:52:28
 * @LastEditors: Eddy Huang
 * @LastEditTime: 2021-01-26 12:42:45
 * @Description: TODO:
 */
import React, { FC } from "react";
import ReactDOM from "react-dom";
import Router from "./router";
/** 引入 antd/dist/antd.less 在编译时会报错 */
import "../node_modules/antd/lib/style/components.less";
import "../node_modules/antd/lib/style/themes/index.less";
import "../node_modules/antd/lib/style/core/index.less";
// import "./global.less";
const App: FC = () => <Router />;

ReactDOM.render(<App />, document.getElementById("app"));
