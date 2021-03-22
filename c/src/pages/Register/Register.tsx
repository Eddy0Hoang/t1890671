import { LoginOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { Component } from "react";
import axios from "src/utils/request";
import "./Register.less";
/** interface of Props */
export interface IRegisterProps {
  history: any
}
/** interface of State */
export interface IRegisterState {
  account: string
  username: string
  password: string
  psd2: string
  fadeOut: string
}
class Register extends Component<IRegisterProps, IRegisterState> {
  readonly state: IRegisterState = {
    username: '',
    account: '',
    password: '',
    psd2: '',
    fadeOut: ''
  };

  constructor(props: IRegisterProps) {
    super(props);
  }
  private submit = () => {
    if (this.state.username.trim().length < 4) {
      message.error('用户名长度必须大于4')
      return
    }
    if (this.state.account.trim().length < 4) {
      message.error('账户长度必须大于4')
      return
    }
    if (this.state.password.trim().length < 4) {
      message.error('密码长度必须大于4')
      return
    }
    if (this.state.psd2.trim() != this.state.password.trim()) {
      message.error('请输入两次相同的密码')
      return
    }
    axios({
      url: '/api/access/register',
      method: 'post',
      data: {
        ...this.state
      }
    }).then((res: any) => {
      if (res.code == 1) {
        message.success(res.msg)
        this.setState({ fadeOut: 'fade-out' }, () => {
          setTimeout(() => {
            this.props.history.push('/main')
          }, 1100);
        })
      } else {
        message.error(res.msg)
      }
    })
  }
  private toLogin = () => {
    this.setState({ fadeOut: 'fade-down' }, () => {
      setTimeout(() => {
        this.props.history.push('/login')
      }, 1100);
    })
  }
  public render() {
    return (
      <div className="register">
        <div className={"form " + this.state.fadeOut}>
          <header>注册彩云之南</header>
          <div className="form-item">
            <div className="label"><i className="required"/>用户名</div>
            <input
              type="text"
              className="input"
              maxLength={12}
              placeholder="4~12位用户名"
              value={this.state.username}
              onInput={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div className="form-item">
            <div className="label"><i className="required"/>账户</div>
            <input
              type="text"
              className="input"
              placeholder="4~12位数字英文"
              maxLength={12}
              value={this.state.account}
              onInput={(e) => this.setState({ account: e.target.value })}
            />
          </div>
          <div className="form-item">
            <div className="label"><i className="required"/>密码</div>
            <input
              type="password"
              className="input"
              placeholder="4~12位数字英文"
              maxLength={12}
              value={this.state.password}
              onInput={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="form-item">
            <div className="label"><i className="required"/>确认密码</div>
            <input
              type="password"
              className="input"
              placeholder="4~12位数字英文"
              maxLength={12}
              value={this.state.psd2}
              onInput={(e) => this.setState({ psd2: e.target.value })}
            />
          </div>
          <footer>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={this.submit}
            >
              注册
            </Button>
            <Button type="link" size="small" onClick={this.toLogin}>
              去登录
            </Button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Register;
