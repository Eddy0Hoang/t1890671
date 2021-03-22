/*
 * @Author: Eddy Huang
 * @Date: 2021-01-25 14:54:04
 * @LastEditors: Eddy Huang
 * @LastEditTime: 2021-01-25 15:04:10
 * @Description: TODO:
 */
import React from "react";
import { HashRouter, Switch, Route, RouteProps } from "react-router-dom";
import { Redirect, RouteComponentProps } from "react-router";
import ReactLoadable from "react-loadable";

import Main from "src/pages/Main";
import Login from "src/pages/Login";
import Register from "src/pages/Register";
import SearchResult from "src/pages/SearchResult";

type Component =
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;

const loadable = (component: any): Component =>
  ReactLoadable({
    loader: component,
    loading: () => <div>loading</div>,
  });
const routes: Array<RouteProps> = [
  {
    exact: true,
    path: "/main",
    component: Main,
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/reg',
    exact: true,
    component: Register
  },
  {
    path: '/search',
    component: SearchResult
  }
  /** loadable example */
  // {
  //     exact: false,
  //     path: '/',
  //     component: loadable(() => import('src/pages/Main'))
  // }
];

const Router: React.FC = () => (
  <HashRouter>
    <Switch>
      {routes.map((v, i) => (
        <Route exact={v.exact} path={v.path} component={v.component} key={i} />
      ))}
      <Redirect from="/" to="login"/>
    </Switch>
  </HashRouter>
);

export default Router;
