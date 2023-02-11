import { Collapse } from "antd";
import { Card } from "antd";
import "./home.scss";
import { useEffect, useState } from "react";
import {
  getAnnouncementList,
  getAnnouncementById,
} from "../../services/announcement";
const { Panel } = Collapse;

//公告数据
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Home = () => {
  //选中之后弹出公告
  const onChange = (key: string | string[]) => {
    //console.log(key);
  };

  const [data, setData] = useState([]); //查询结果
  const [query, setQuery] = useState({ page: 0, pageSize: 0 }); //查询条件
  useEffect(() => {
    const getList = async () => {
      const res = await getAnnouncementList(query);
      setData(res.data.list);
      console.log(res);
    };
    getList();
  }, [query]); //查询条件改变将影响结果

  return (
    <>
      <Card style={{ width: 1000 }} className="title">
        <p>公告</p>
      </Card>
      <Collapse
        defaultActiveKey={["1"]}
        onChange={onChange}
        className="site-collapse-custom-collapse"
      >
        {!data ? (
          <p className="notFind">No Annuncement</p>
        ) : (
          data.map((item: any, i) => {
            return (
              <>
                <Panel
                  header={item.title}
                  key={i}
                  className="site-collapse-custom-panel"
                >
                  <div className="panelContent">
                    <p className="panelContentInfo">{item.content}</p>

                    <div className="panelInfo">
                      <p>{"By " + item.creator}</p>
                      <p>
                        {item.updated_at.split("T")[0] +
                          " " +
                          item.updated_at.split("T")[1].substring(0, 5)}
                      </p>
                    </div>
                  </div>
                </Panel>
              </>
            );
          })
        )}
      </Collapse>
    </>
  );
};

export default Home;
