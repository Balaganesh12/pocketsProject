import React from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  message,
  Tooltip,
  Progress,
  Space,
  Select,
  Empty
} from "antd";
import { DownOutlined, DingdingOutlined } from "@ant-design/icons";
import trend from "../../assets/images/trend-up.png"
import like from "../../assets/images/Wishlist-two-tone.png"
import messages from "../../assets/images/message.png"
import swap from "../../assets/images/repeat.png"
import MaximizeButton from "../../assets/images/maximize.png";
import arrowup from "../../assets/images/arrow-up.svg";
import arrowdown from "../../assets/images/arrow-down.svg";
import Janifer from "../../assets/images/janifer.png";
import Food from "../../assets/images/food.png";
import Statusred from "../../assets/images/statusred.png";
import Statusgreen from "../../assets/images/statusgreen.png";
// import WaveImg from "../../../public/vector 3001.png";
// import Graph from "../../assets/images/Capturegraph.png";
// import WaveImg2 from "../../../public/vector 3003.png";
// import '../../assets/scss/pages/_dashboard.scss';
import chart_design from "../../assets/images/chart_design.svg"
import { GET_PAYMENT_BY_NGOID, NGO_USER, GET_PROJECT_BY_NGOID, GET_PROJECT, GET_POST_BY_NGOID } from "../../helpers/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import moment from "moment";
import Adminlogo from "../../assets/images/admin logo.svg";
import router, { useRouter } from 'next/router'
import LIKE from '../../assets/images/postImage/wishlist-svg.svg'
import Message from '../../assets/images/postImage/message-svg.svg'
import Repeat from '../../assets/images/postImage/repeat.svg'

import Image from "next/image";
import { authProtected } from "../../components/protected-route";
import { useUserData } from '@nhost/nextjs'

const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
};

const Dashboard = () => {
  const [ngogoproject, setNgoProject] = useState<any>([]);
  const [totalamount, setTotalamount] = useState<any>([]);
  const [giftamount, setGiftamount] = useState<any>([]);
  const [totalproject, setTotalproject] = useState<any>([]);
  const [completeproject, setCompleteproject] = useState<any>([]);
  const [ongoingProjectData, setOngoingProjectData] = useState([]);

  const user = useUserData();
  const router = useRouter()
  const [postngodata, setPostngodata] = useState<any>([]);

  const [fullProjectData, setFullProjectData] = useState([]);
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  const handleChange = (value: string) => {
  };
  const {
    error: paymentngoError,
    loading: paymentngoLoading,
    data: ngodataPayment,
    refetch: refetchngoPayment,
  } = useQuery(GET_PAYMENT_BY_NGOID, {
    variables: {
      ngo_id: ngogoproject?.toString()


    },
  });
  const {
    error: ngoprojectError,
    loading: ngoprojectLoading,
    data: ngodataProject,
    refetch: refetchngoProject,
  } = useQuery(GET_PROJECT_BY_NGOID, {
    variables: {
      ngo_id: ngogoproject?.toString()


    },
  });
  const {
    error: ngoError,
    loading: ngoLoading,
    data: ngoData,
    refetch: refetchngo,
  } = useQuery(NGO_USER, {
    variables: {
      id: user?.id
    },
  });
  useEffect(() => {
    if (ngoData) {
      const ngoId = ngoData?.mst__ngos.map((data) => {
        return data?.id
      });
      setNgoProject(ngoId);
    }

  }, [ngoData])
  let paymentwalletdata = ngodataPayment?.mst__transactions;
  useEffect(() => {

    if (ngodataPayment) {
      let paymentwalletdata = ngodataPayment?.mst__transactions;

      let totalproject = paymentwalletdata?.map((data) => {
        return data?.mst__projects
      });
      let completedProject = totalproject?.filter((data) => {
        return moment().isAfter(data?.close_date, "day")
      })

      let ongoingProject = totalproject?.filter((data) => {
        return moment().isBefore(data.close_date, "day") && data.is_active;
      });
      setOngoingProjectData(ongoingProject);
      let details = totalproject?.filter((data) => {
        return data
      })
      let receiveTotalAmnt = paymentwalletdata
        ?.map((receive) => receive.total_amount)
        ?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue,
          0
        );
      let receiveGiftAmnt = paymentwalletdata?.map((receive) => receive.gift_aid_amount)
        ?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue,
          0
        );
      setTotalamount(receiveTotalAmnt);
      setGiftamount(receiveGiftAmnt);

      setTotalproject(details);
      setCompleteproject(completedProject);
    }
  }, [ngodataPayment])

  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });
  const {
    error: getpostngo,
    loading: getpostngoload,
    data: getPostNgo,
    refetch: refetchgetpost,
  } = useQuery(GET_POST_BY_NGOID, {
    variables: {
      ngo_id: ngogoproject?.toString()
    },
  });
  useEffect(() => {
    if (getPostNgo) {
      let filterPost = getPostNgo?.mst_posts;
      let filterProject = filterPost?.filter(
        (data) => data.is_active === true
      );

      setPostngodata(filterProject);
    }
  }, [getPostNgo])
  useEffect(() => {
    if (dataProject) {
      const ngoId = ngoData?.mst__ngos.map((data) => {
        return data?.id;
      });
      let projectData = dataProject?.mst__projects;
      if (user?.defaultRole === "ngo") {
        projectData = dataProject?.mst__projects?.filter(
          (data) => data?.mst__ngo?.id === ngoId?.toString()
        );
      }
      let filterProject = projectData?.filter(
        (data) => data.is_active === true
      );
      setFullProjectData(filterProject);
    }
  }, [dataProject])
  return (
    <div className="dashboard_align">
      <div>
        <div>
          <h3 className="pockets_dashboard">Dashboard</h3>
        </div>

        <Row
          justify="space-between"
          style={{ margin: "30px 0px", padding: "0px" }}
        >
          <Col span={8} style={{ padding: "0px" }} className="dashboard_card">
            <Card style={{ padding: "0px", marginRight: "-35px", width: "100%", height: "92%" }}>
              <div style={{ color: "#878787" }}>
                <h4 style={{ margin: "0px", padding: "0px" }} className="collected_amount">
                  Total Collected Amount
                </h4>
              </div>
              <div style={{ color: "#252947", marginTop: "-6px" }}>
                <h2
                  style={{ margin: "10px 0px", textDecoration: "underlined" }}
                  className="ero_amount"
                >
                  £{totalamount}
                </h2>
              </div>
              <Progress
                style={{ margin: "0px" }}
                showInfo={false}
                percent={75}
                status="active"
                strokeColor={{
                  from: "#252947",
                  to: "#7FACD6",
                }}
              />
              <div style={{ display: "flex", paddingTop: "8px", paddingBottom: "12px", gap: "10px" }}>
                <div style={{ display: "flex" }}>
                  <div>
                    {/* <Image loader={sanityIoImageLoader} alt="image" src={SqrImg} width={10} height={10} /> */}
                  </div>
                  <div>
                    <h5 style={{ margin: "0px" }} className="Collected">
                      <span className="collected_active"></span>
                      <span style={{ color: "#878787" }}>Collected Amount</span>
                      (£10658)
                    </h5>
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <div>
                    {/* <Image loader={sanityIoImageLoader} alt="image" src={SqrImg} width={10} height={10} /> */}
                  </div>
                  <div>
                    <h5 style={{ margin: "0px" }} className="Collected">
                      <span className="collected_success"></span>
                      <span style={{ color: "#878787" }}>Giftaid</span>
                      (£{giftamount})
                    </h5>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col span={5} >
            <Card className="total_project">
              <div style={{ color: "#878787" }}>
                <h4 style={{ margin: "0px", fontSize: "13px" }} className="collected_amount">
                  Total Project
                </h4>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ color: "#252947" }}>
                  <h2 style={{ margin: "2px 0px" }} className="collect_percentage">{totalproject?.length}</h2>
                </div>


              </div>

            </Card>
          </Col>

          <Col span={5} style={{ marginRight: "4px" }}>
            <Card className="total_project">
              <div style={{ color: "#878787" }}>
                <h4 style={{ margin: "0px", fontSize: "13px" }} className="collected_amount">
                  Live Project
                </h4>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ color: "#252947" }}>
                  <h2 style={{ margin: "2px 0px" }} className="collect_percentage">{ongoingProjectData?.length}</h2>
                </div>


              </div>

            </Card>
          </Col>

          <Col span={5}>
            <Card className="total_project">
              <div style={{ color: "#878787" }}>
                <h4 style={{ margin: "0px", fontSize: "12px" }} className="collected_amount">
                  Completed Project
                </h4>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ color: "#252947" }}>
                  <h2 style={{ margin: "2px 0px" }} className="collect_percentage">{completeproject?.length}</h2>
                </div>


              </div>

            </Card>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ margin: "30px 0px", padding: "0px" }}
          className="statistic_row"
        >
          <Col span={12} className="Statistics_col">
            <Card style={{ margin: "0px", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div>
                  <h2 style={{ fontSize: "16px", marginTop: "0px" }} className="Statistics">Statistics</h2>
                </div>
                <div>
                  <Select defaultValue="This Year" style={{ width: 100 }} onChange={handleChange}
                    options={[{ value: '2022', label: '2022' }, { value: '2021', label: '2021' }, { value: '2020', label: '2020' }]} />
                </div>
              </div>

              <Image
                src={chart_design}
                alt="graph"
                style={{ width: "100%", height: "100%", marginTop: "24px" }}
              />
            </Card>
          </Col>

          <Col span={11} className="project_col">
            <Card style={{ padding: "11px", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div>
                  <h2 style={{ fontSize: "16px", marginTop: "0px" }} className="project_title">Project Insights</h2>
                </div>
                <div>
                  <Image src={MaximizeButton} alt="image"
                    style={{ cursor: "pointer" }}

                    onClick={() => router.replace('/project')}
                  />
                </div>
              </div>
              {!fullProjectData || fullProjectData?.length === 0 ? (<p>
                <Empty />
              </p>) : (
                <>
                  {fullProjectData?.slice(0, 2)?.map((project) => {
                    let startdate = moment(project?.start_date).format("D MMMM YYYY");
                    let closedate = moment(project?.close_date).format("D MMMM ");
                    let receiveAmnt = project?.mst__transactions
                      ?.map((receive) => receive.total_amount)
                      ?.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      );
                    var date1 = new Date(startdate);
                    var date2 = new Date(closedate);
                    var diff = new Date(date2.getTime() - date1.getTime());
                    var days = diff.getUTCDate() - 1
                    return <div className="noti">
                      <div className="pockets_noti_general">
                        <p className="pockets_dashboard_general">{project?.project_category?.name}</p>
                        <p className="general_date">{startdate} - {closedate}</p>
                        <div className="general_card">
                          <div>
                            <p className="general_pounds">£{receiveAmnt}</p>
                            <p className="general_amount">Amount Collected</p>
                          </div>
                          <div>
                            <p className="general_earn">{project?.mst__transactions.length}</p>
                            <p className="general_donors">No. of Donors</p>
                          </div>
                        </div>
                      </div>
                      <div className="general_progress">
                        <Progress type="circle" percent={days} format={(percent) => `${percent} Days`} width={77} strokeColor={{
                          from: "#50CD89",
                        }} />
                      </div>
                    </div>

                  })}
                </>)}


            </Card>
          </Col>
        </Row>

        <Row justify="space-around" style={{ marginTop: "20px", marginBottom: "40px" }} className="Payment_row">
          <Col span={12} className="payment_col">
            <Card style={{ height: "100%" }} >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  paddingBottom: "8px"
                }}
              >
                <div>
                  <h2 className="dashbaord_payment">Payment History</h2>
                </div>
                <div>
                  <Image src={MaximizeButton} alt="image" />
                </div>
              </div>
              {!paymentwalletdata || paymentwalletdata.length === 0 ? (<>
                <p>
                  <Empty />
                </p>
              </>) : (
                <>
                  {paymentwalletdata?.slice(0, 3).map((paymentdata) => {
                    let startdate = moment(paymentdata?.transaction_date).format('D MMMM YYYY');
                    return <div className="notify_card" style={{ backgroundColor: "rgba(245, 245, 245, 1)" }}>
                      <div className="payment_insight">
                        <div>
                          <Image src={Adminlogo} alt="image" className="payment_image" />
                        </div>
                        <div className="payment_profile">
                          <h4 className="payment_details">{paymentdata?.mst__ngo?.name}</h4>
                          <h5 className="payment_date">{startdate}</h5>
                        </div>
                      </div>
                      <div>
                        <h3 className="payment_dollar" >£{paymentdata?.total_amount}</h3>
                      </div>
                    </div>
                  })}
                </>
              )}




            </Card>
          </Col>

          <Col span={12} className="post_col">
            <Card className="post_insights" style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <div>
                  <h2 className="pockets_post">Post Insights</h2>
                </div>
                <div>
                  <Image src={MaximizeButton} alt="image"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.replace('/post')}
                  />
                </div>
              </div>
              {!postngodata || postngodata?.length === 0 ? (<p>
                <Empty />
              </p>) : (
                <>
                  {postngodata?.slice(0, 2)?.map((postdata) => {
                    let startdate = moment(postdata?.post_date).format('D MMMM YYYY');
                    let image = postdata?.image
                    return <div className="food_des">
                      <div className="pockets_noti_general">
                        <div className="pockets_post_insights" >
                          <div className="pockets_post">
                            <div className="food_img">
                              <Image src={image} alt="image" className="pockets_food_img" width={20} height={20} />
                            </div>
                            <div className="pockets_post_food">
                              <p className="pockets_food_dist">{postdata?.title}</p>
                              <p className="pockets_posted">Posted on: {startdate}</p>
                            </div>
                          </div>

                        </div>
                        <div className="pockets_icons">
                          <Image src={LIKE} alt="image" className="post_icon" /><span className="pockets_post_count">{postdata?.mst_post_likes?.length}</span>
                          <Image src={Message} alt="image" className="post_icon" /><span className="pockets_post_count">{postdata?.mnt__comments?.length}</span>
                          <Image src={Repeat} alt="image" className="post_icon" /><span className="pockets_post_count">{postdata?.mst_post_reports?.length}</span>
                        </div>
                      </div>
                    </div>
                  })}

                </>)}


            </Card>
          </Col>
        </Row>
      </div >
    </div >
  );
};

export default authProtected(Dashboard);
