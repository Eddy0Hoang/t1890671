import { Carousel, Col, Descriptions, Divider, List, Row, Tabs } from "antd";
import React, { Component } from "react";
import PageHeader from "src/components/PageHeader";
import { Jingdian } from "src/model/Jingdian";
import { getImage, parseQuery } from "src/utils/param";
import axios from "src/utils/request";
import Swiper from "react-swipeable-views";

import "./SearchResult.less";
/** interface of Props */
export interface ISearchResultProps {}
/** interface of State */
export interface ISearchResultState {
  jdList: Jingdian[];
  searchKey: string;
  curIndex: string
}
class SearchResult extends Component<ISearchResultProps, ISearchResultState> {
  readonly state: ISearchResultState = {
    jdList: [],
    searchKey: "",
    curIndex: '0'
  };

  constructor(props: ISearchResultProps) {
    super(props);
  }
  componentDidMount() {
    if (this.props.location.search) {
      let query = parseQuery(this.props.location.search);
      if (query.key) {
        this.setState({ searchKey: query.key });
        axios({
          url: "/api/info/search?key=" + query.key,
        }).then((res) => {
          this.setState({ jdList: res });
          console.log("req:", res);
        });
      } else {
        axios({
          url: "/api/info/jingdian",
        }).then((res) => {
          this.setState({ jdList: res });
          console.log("req:", res);
        });
      }
    } else {
      axios({
        url: "/api/info/jingdian",
      }).then((res) => {
        this.setState({ jdList: res });
        console.log("req:", res);
      });
    }
  }
  static getDerivedStateFromProps(
    nextProps: ISearchResultProps,
    prevState: ISearchResultState
  ) {
    /** return new state to update */
    return null;
  }
  public render() {
    return (
      <div className="search-result">
        <PageHeader />
        <div className="content">
          <div className="search-wrapper">
            <input type="text" className="search" maxLength={12} />
          </div>
          <div className="list">
            <Tabs onChange={e => this.setState({ curIndex: e })}>
              {this.state.jdList.map((v, i) => (
                <Tabs.TabPane tabKey={i + ''} tab={v.name} key={i}>
                  {/* <JingdianItem jingdian={v} key={v.id + "" + i} /> */}
                </Tabs.TabPane>
              ))}
            </Tabs>
            {this.state.jdList[+this.state.curIndex] && <JingdianItem jingdian={this.state.jdList[+this.state.curIndex]}/>}
            {/* <List
            dataSource={this.state.jdList}
            renderItem={(item, index) => <JingdianItem jingdian={item} />}
          ></List> */}
          </div>
        </div>
      </div>
    );
  }
}
interface IJingdianProps {
  jingdian: Jingdian;
}
const JingdianItem: React.FC<IJingdianProps> = (props: IJingdianProps) => {
  return (
    <div className="jingdian">
      <Descriptions title={props.jingdian.name} column={1}>
        <Descriptions.Item label="介绍">
          {props.jingdian.desc || "无"}
        </Descriptions.Item>

        <Descriptions.Item>
          <Carousel
            autoplay
            style={{
              display: "flex",
              justifyContent: "center",
              width: "1100px",
            }}
            key={props.jingdian.id}
          >
            {JSON.parse(props.jingdian.sceneryImages).map(
              (item: { file: string; name: string }, i: number) => (
                <div className="carousel-item" key={i + item.file}>
                  <img
                    src={getImage(item.file)}
                    width="1100"
                    height="600"
                    alt={item.name}
                  />
                  <span className="title">{item.name}</span>
                </div>
              )
            )}
          </Carousel>
          <Divider />
        </Descriptions.Item>
        <Descriptions.Item label="特产">
          {props.jingdian.specialty || "无"}
        </Descriptions.Item>
        <Descriptions.Item label="风俗">
          {props.jingdian.customs || "无"}
        </Descriptions.Item>
        <Descriptions.Item label="著名景点">
          {props.jingdian.famousScenery || "无"}
        </Descriptions.Item>
        <Descriptions.Item label="节日">
          {props.jingdian.festivals || "无"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default SearchResult;
