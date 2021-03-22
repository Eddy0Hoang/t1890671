import React, { Component } from "react";
import { User } from "src/model/User";
import "./PageHeader.less";
/** interface of Props */
export interface IPageHeaderProps {
  history?: any;
}
/** interface of State */
export interface IPageHeaderState {
  userdata?: User | null;
  tmpName: string;
}
class PageHeader extends Component<IPageHeaderProps, IPageHeaderState> {
  readonly state: IPageHeaderState = {
    userdata: null,
    tmpName: "",
  };

  constructor(props: IPageHeaderProps) {
    super(props);
  }
  componentDidMount() {
    let userdata = localStorage.getItem("userdata");
    if (userdata) {
      try {
        this.setState({ userdata: JSON.parse(userdata) });
      } catch (e) {
        console.error(e);
        this.props.history.push("/login");
      }
    } else {
      let tmpName =
        sessionStorage.getItem("tmpName") ||
        "游客" + Math.random().toString(16).substr(2, 7);
      this.setState({ tmpName }, () => {
        sessionStorage.setItem("tmpName", tmpName);
      });
    }
  }
  static getDerivedStateFromProps(
    nextProps: IPageHeaderProps,
    prevState: IPageHeaderState
  ) {
    /** return new state to update */
    return null;
  }
  private toLogin = () => {
    window.location.href = '/#/login'
  }
  public render() {
    return (
      <div className="page-header">
        <span className="title">彩云之南</span>
        <span className="right-info">
          你好！
          <i className="username">
            {this.state.userdata
              ? this.state.userdata.username
              : this.state.tmpName}
          </i>
          <i>{this.state.userdata ? "" : "，"}</i>
          <i className="link" onClick={this.toLogin}>{this.state.userdata ? "" : "去登陆"}</i>
        </span>
      </div>
    );
  }
}

export default PageHeader;
