import { Button, message } from "antd";
import React, { Component } from "react";
import { LoginOutlined } from "@ant-design/icons";
import "./Login.less";
import axios from "./../../utils/request";
/** interface of Props */
export interface ILoginProps {
  history: any;
}
/** interface of State */
export interface ILoginState {
  accout: string;
  password: string;
  fadeOut: string;
}
class Login extends Component<ILoginProps, ILoginState> {
  readonly state: ILoginState = {
    accout: "abcd",
    password: "abcd",
    fadeOut: "",
  };

  constructor(props: ILoginProps) {
    super(props);
  }
  private submit = () => {
    if (this.state.accout.trim().length < 4) {
      message.error("账号长度不能小于4", 800);
      return;
    }
    if (this.state.password.trim().length < 4) {
      message.error("密码长度不能小于4", 800);
      return;
    }
    axios({
      url: `/api/access/check?usr=${this.state.accout}&psd=${this.state.password}`,
    }).then((res: any) => {
      console.log('res:', res)
      if (res.code == 1) {
        localStorage.setItem('userdata', (typeof res.data === 'string') ? res.data : JSON.stringify(res.data))
        this.setState({ fadeOut: 'fade-out' }, () => {
          setTimeout(() => {
            this.props.history.push('/main')
          }, 1100);
        })
      } else {
        message.error(res.msg, 1200)
      }
    });
  };
  private toReg = () => {
    this.setState({ fadeOut: "fade-down" }, () => {
      setTimeout(() => {
        this.props.history.push("/reg");
      }, 1200);
    });
  };
  public render() {
    return (
      <div className={"login " + this.state.fadeOut}>
        <div className={"form " + this.state.fadeOut}>
          <header>登录到彩云之南</header>
          <div className="form-item">
            <div className="label"><i className="required"/>账户</div>
            <input
              type="text"
              className="input"
              maxLength={12}
              value={this.state.accout}
              onInput={(e) => this.setState({ accout: e.target.value })}
            />
          </div>
          <div className="form-item">
            <div className="label"><i className="required"/>密码</div>
            <input
              type="password"
              className="input"
              maxLength={12}
              value={this.state.password}
              onInput={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <footer>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={this.submit}
            >
              登录
            </Button>
            <Button type="link" size="small" onClick={this.toReg}>
              去注册
            </Button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Login;
