import { AutoComplete, Carousel, Input } from "antd";
import React, { Component } from "react";
import PageHeader from "src/components/PageHeader";
import { User } from "src/model/User";
import "./Main.less";
import img0 from "../../assets/img0.jpeg";
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.jpeg";
import img4 from "../../assets/img4.jpeg";
import axios from "src/utils/request";
import { OptionType } from "antd/lib/select";
const carouselImages: any = [
  {
    img: img0,
    url:
      "https://baike.baidu.com/item/%E6%8C%96%E8%89%B2%E9%95%87/3150957?fr=aladdin",
  },
  {
    img: img1,
    url:
      "https://baike.baidu.com/item/%E5%8F%8C%E5%BB%8A%E9%95%87/10094494?fr=aladdin",
  },
  {
    img: img2,
    url:
      "https://baike.baidu.com/item/%E6%B3%B8%E6%B2%BD%E6%B9%96/396555?fr=aladdin",
  },
  {
    img: img3,
    url: "https://baike.baidu.com/item/%E6%89%8D%E6%9D%91/7336796?fr=aladdin",
  },
  {
    img: img4,
    url:
      "https://baike.baidu.com/item/%E5%A4%A7%E7%90%86%E5%8F%A4%E5%9F%8E/1874828?fr=aladdin",
  },
];
/** interface of Props */
export interface IMainProps {
  history: any;
}
/** interface of State */
export interface IMainState {
  userdata?: User | undefined;

  searchHints: { value: string; label?: string }[];
}
class Main extends Component<IMainProps, IMainState> {
  readonly state: IMainState = {
    userdata: undefined,
    searchHints: [],
  };

  constructor(props: IMainProps) {
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
    }
    axios({
      url: "/api/info/hints",
    }).then((res: any) => {
      this.setState({
        searchHints: res.map((v: string) => ({ value: v, label: v })),
      });
    });
  }
  private toSearch = (value: string) => {
    console.log('tosearch')
    this.props.history.push('/search?key=' + value)
    // this.props.history.push({ path: "/search", query: { key: value } });
  };
  public render() {
    return (
      <div className="main">
        <PageHeader />
        <div className="nav-wrapper">
          <div className="navs">
            <span className="nav">首页</span>
            <span className="nav">景点查询</span>
            <span className="nav">路线规划</span>
          </div>
          <div className="search-wrapper">
            <AutoComplete
              options={this.state.searchHints}
              onSelect={this.toSearch}
            >
              <Input.Search placeholder="搜索：丽江" enterButton />
            </AutoComplete>
          </div>
        </div>
        <div className="content">
          <div className="image-wrapper">
            <Carousel autoplay>
              {carouselImages.map((v: any, i: number) => (
                <div
                  className="arousel-item"
                  key={i}
                  onClick={() => window.open(v.url)}
                >
                  <img src={v.img} width={1100} height={600} />
                </div>
              ))}
            </Carousel>
          </div>
          <h2>云南</h2>
          <p>
            云南省，简称云或滇，中国23个省之一，位于西南地区，省会昆明。介于北纬21°8′～29°15′，东经97°31′～106°11′之间，东部与贵州、广西为邻，北部与四川相连，西北部紧依西藏，西部与缅甸接壤，南部和老挝、越南毗邻，云南省总面积39.41万平方千米，是全国边境线最长的省份之一。截至2019年末，云南省常住人口4858.3万人，比2018年末增加28.8万人，是中国民族种类最多的省份。
            [1]
          </p>
          <p>
            云南省属低纬度内陆地区，地势呈西北高、东南低，自北向南呈阶梯状逐级下降，为山地高原地形，山地面积占全省总面积的88.64%，地跨长江、珠江、元江、澜沧江、怒江、大盈江6大水系。云南气候基本属于亚热带和热带季风气候，滇西北属高原山地气候。云南动植物种类数为全国之冠，素有“动植物王国”之称，被誉为“有色金属王国”，历史文化悠久，自然风光绚丽，是人类文明重要发祥地之一。
          </p>
        </div>
      </div>
    );
  }
}

export default Main;
