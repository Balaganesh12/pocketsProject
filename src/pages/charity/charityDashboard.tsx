import React, { useState } from "react";
import { Card, Button, Col, Row, Progress, Drawer } from "antd";
import Profileimg from "../../../public/charityprofile.png";
import SqrImg from "../../../public/square.png";
// import WaveImg from "../../assets/images/vector 3001.png";
// import WaveImg2 from "../../assets/images/vector 3002.png";
import Image from "next/image";
import Arrow from "../../../public/arrow.png";
import Profileuser from "../../../public/profileuser.png";
import EditButton from "../../assets/images/edit.png";
import Statusred from "../../assets/images/statusred.png";
import Statusgreen from "../../assets/images/statusgreen.png";
import CharityGraph from "../../assets/images/charitygraph.png";
import Project from "../project/index"
import CreateNgo from '../charity/createngo'
import arrow from '../../assets/images/arrow-left.png'
import Post from "../post/index"
import { authProtected } from "../../components/protected-route";
const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
};

export const charityDashboard: React.FC<any> = () => {

  const [tabdata, setTabdata] = useState("Info");
  const [currentUser, setCurrentuser] = useState();
  const [opened, setOpened] = useState('');
  const [selectedPost, setSelectedPost] = useState();
  return (
    <div className="charity_main_dashboard">
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div style={{ margin: "0px 15px" }}>
          <Image
            loader={sanityIoImageLoader}
            alt="image"
            src={Arrow}
            width={30}
            height={30}
          />
        </div>
        <div className="charity_dashboard" style={{ fontSize: "26px", margin: "0px 0px" }}>
          <h3>Child In Need</h3>
        </div>
      </div>

      <Drawer
        open={opened?.length > 1 ? true : false}
        onClose={() => setOpened(null)}
        width={opened === "comment" ? (550) : (650)}
        placement="right"
        closable={false}
        title={<div className='create_post_sec'>
          <Image loader={sanityIoImageLoader} alt="image" src={arrow} width="25"
            style={{ cursor: "pointer" }}
            onClick={() => setOpened(null)}
          />
          {opened === "edit" ? (<h2>Edit charity</h2>) : (<></>)}
        </div>}
      >
        {opened === "edit" ? (
          <>
            <CreateNgo ngodata={selectedPost} data={opened} />
          </>
        ) : (<></>)}
      </Drawer>

      <div className="tabs_header">
        <ul className="tab_header_content">
          <li onClick={() => setTabdata("Info")}>
            All
          </li>
          <li onClick={() => setTabdata("Project")}>Project<span className="tab_count">12</span></li>
          <li onClick={() => setTabdata("Post")}>Post<span className="tab_count">34</span></li>
          <li onClick={() => setTabdata("Archived")}>Archived<span className="tab_count">2</span></li>
          <li onClick={() => setTabdata("Deleted")}>Deleted<span className="tab_count">2</span></li>
        </ul>
      </div>
      <div>
        {tabdata === "Info" ? (
          <>
            <Card style={{ backgroundColor: "#252947", height: "26px" }}>  </Card>
            <Card
              style={{
                backgroundColor: "#fff",
                margin: "0px 2px -24px",
                borderRadius: "5px",
                height: "100px",
              }}
            >
              <Row>
                <Col span={8}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "90px", marginTop: "-18px" }}>
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={Profileimg}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          color: "#252947",
                          fontSize: "14px",
                          margin: "-23px 0px 0px 16px",
                        }}
                      >
                        <h3>Children in Need</h3>
                      </div>

                      <div
                        style={{
                          marginTop: "-21px",
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "10px"
                        }}
                      >
                        <div>
                          <Image
                            loader={sanityIoImageLoader}
                            alt="image"
                            src={Profileuser}
                          />
                        </div>
                        <div>
                          <h4>
                            30 <span>followers</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={8} offset={8}>
                  <div
                    style={{
                      margin: "0px 0px",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#252947",
                      }}
                    >
                      <Image
                        loader={sanityIoImageLoader}
                        src={EditButton}
                        alt="edit"
                        onClick={() => setOpened("edit")}
                      />
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>


            <Row
              justify="space-between"
              style={{ margin: "62px 0px", padding: "0px" }}
            >
              <Col span={7} style={{ padding: "0px" }}>
                <Card style={{ padding: "0px", marginRight: "-35px", width: "100%", height: "92%" }}>
                  <div style={{ color: "#878787" }}>
                    <h4 style={{ margin: "0px", padding: "0px" }}>
                      Total Collected Amount
                    </h4>
                  </div>
                  <div style={{ color: "#252947", marginTop: "-6px" }}>
                    <h2
                      style={{ margin: "10px 0px", textDecoration: "underlined" }}
                    >
                      £10658
                    </h2>
                  </div>
                  <Progress
                    style={{ margin: "0px" }}
                    showInfo={false}
                    percent={100}
                    status="active"
                    strokeColor={{
                      from: "#108ee9",
                      to: "#87d068",
                    }}
                  />
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <h5 style={{ margin: "0px" }}>
                          <span style={{ color: "#878787" }}>Collected Amount</span>
                          (£10658)
                        </h5>
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div>
                        <h5 style={{ margin: "0px" }}>
                          <span style={{ color: "#878787" }}>Giftaid</span>
                          (£10658)
                        </h5>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col span={5} style={{ marginRight: "12px" }}>
                <Card>
                  <div style={{ color: "#878787" }}>
                    <h4 style={{ margin: "0px", fontSize: "13px" }}>
                      Total Project
                    </h4>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ color: "#252947" }}>
                      <h2 style={{ margin: "2px 0px" }}>136</h2>
                    </div>

                    <div>
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={Statusgreen}
                        width={50}
                        height={20}
                      />
                    </div>
                  </div>
                  <div style={{ color: "#50CD89" }}>
                    <h4 style={{ margin: "0px", marginTop: "14px" }}>25%</h4>
                    <h5 style={{ color: "#C2C2C2", margin: "0px" }}>
                      vs Last Month
                    </h5>
                  </div>
                </Card>
              </Col>

              <Col span={5} style={{ marginRight: "4px" }}>
                <Card>
                  <div style={{ color: "#878787" }}>
                    <h4 style={{ margin: "0px", fontSize: "13px" }}>
                      Live Project
                    </h4>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ color: "#252947" }}>
                      <h2 style={{ margin: "2px 0px" }}>70</h2>
                    </div>

                    <div>
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={Statusred}
                        width={50}
                        height={20}
                      />
                    </div>
                  </div>
                  <div style={{ color: "#50CD89" }}>
                    <h4 style={{ margin: "0px", marginTop: "14px", color: "#DC0036" }}>25%</h4>
                    <h5 style={{ color: "#C2C2C2", margin: "0px" }}>
                      vs Last Month
                    </h5>
                  </div>
                </Card>
              </Col>

              <Col span={5}>
                <Card>
                  <div style={{ color: "#878787" }}>
                    <h4 style={{ margin: "0px", fontSize: "12px" }}>
                      Completed Project
                    </h4>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ color: "#252947" }}>
                      <h2 style={{ margin: "2px 0px" }}>66</h2>
                    </div>

                    <div>
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={Statusgreen}
                        width={50}
                        height={20}
                      />
                    </div>
                  </div>
                  <div style={{ color: "#50CD89" }}>
                    <h4 style={{ margin: "0px", marginTop: "14px" }}>25%</h4>
                    <h5 style={{ color: "#C2C2C2", margin: "0px" }}>
                      vs Last Month
                    </h5>
                  </div>
                </Card>
              </Col>
            </Row>

            <Card style={{ width: "100%" }}>
              <div>
                <Image loader={sanityIoImageLoader} alt="image" src={CharityGraph} />
              </div>
            </Card>
          </>
        ) : (
          <></>
        )}

        {tabdata === "Project" ? (
          <>
            <Project />
          </>
        ) : (
          <></>
        )}

        {tabdata === "Post" ? (
          <>
            <Post />
          </>
        ) : (
          <></>
        )}

        {tabdata === "Archived" ? (
          <>

          </>
        ) : (
          <></>
        )}

        {tabdata === "Deleted" ? (
          <>

          </>
        ) : (
          <></>
        )}
      </div>



    </div>
  );
};

export default authProtected(charityDashboard);
