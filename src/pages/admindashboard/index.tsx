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
import chart_design from "../../assets/images/chart_design.svg"
import MaximizeButton from "../../assets/images/maximize.png";
import arrowup from "../../assets/images/arrow-up.svg";
import arrowdown from "../../assets/images/arrow-down.svg";
import Janifer from "../../assets/images/janifer.png";
import Danger from "../../assets/images/Danger Circle.svg";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import moment from "moment";

import Food from "../../assets/images/food.png";
import Statusred from "../../assets/images/statusred.png";
import Statusgreen from "../../assets/images/statusgreen.png";
// import WaveImg from "../../../public/vector 3001.png";
// import Graph from "../../assets/images/Capturegraph.png";
// import WaveImg2 from "../../../public/vector 3003.png";
// import '../../assets/scss/pages/_dashboard.scss';
import Image from "next/image";
import { authProtected } from "../../components/protected-route";
import { GET_PAYMENT, GET_PROJECT, GET_NGO, GET_REPORT } from "../../helpers";

const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
};

const AdminDashboard = () => {

    const [projectwise, setProjectwise] = useState<any>([]);
    const [giftamount, setGiftamount] = useState<any>([]);
    const [appfeesamut, setAppfeesamut] = useState<any>([]);
    const [totalamount, setTotalamount] = useState<any>([]);
    const [completeproject, setCompleteproject] = useState<any>([]);
    const [inprograss, setInprograss] = useState([]);

    const [ongoingProjectData, setOngoingProjectData] = useState([]);
    const [highlyamount, setHighlyamount] = useState<any>([]);

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
        console.log(`selected ${value}`);
    };
    const {
        error: paymentError,
        loading: paymentLoading,
        data: dataPayment,
        refetch: refetchPayment,
    } = useQuery(GET_PAYMENT, {
        variables: {},
    });
    const {
        error: projectError,
        loading: projectLoading,
        data: dataProject,
        refetch: refetchProject,
    } = useQuery(GET_PROJECT, {
        variables: {},
    });
    console.log(dataProject, "dataProject")
    const {
        error: ngoError,
        loading: ngoLoading,
        data: dataNgo,
        refetch: refetchNgo,
    } = useQuery(GET_NGO, {
        variables: {},
    });

    const datas = dataNgo?.mst__ngos;
    console.log(datas, "datas")
    let paymentwalletdata = dataPayment?.mst__transactions;

    const {
        error: reportError,
        loading: reportLoading,
        data: dataReport,
        refetch: refetcReport,
    } = useQuery(GET_REPORT, {
        variables: {},
    });
    console.log(dataReport, "dataReport");
    useEffect(() => {
        if (dataReport) {
            let reportdatas = dataReport?.mst_post_report;
            let filterinprograss = reportdatas.filter((data) => data?.status === "INPROGRASS")
            console.log(filterinprograss, "filterinprograss");
            setInprograss(filterinprograss)
        }
    }, [dataReport])
    useEffect(() => {
        let projectData = dataProject?.mst__projects;
        let completedProject = projectData?.filter((data) => {
            return moment().isAfter(data?.close_date, "day") && data.is_active;

        })

        let ongoingProject = projectData?.filter((data) => {
            return moment().isBefore(data?.close_date, "day") && data.is_active;
        });
        let details = projectData?.filter((data) => {
            return data
        })
        const getWeek = date => {
            let now = new Date(date);
            let firstJanuary = new Date(now.getFullYear(), 0, 1);
            return Math.ceil((((now.getTime() - firstJanuary.getTime()) / 86400000) + firstJanuary.getDay() + 1) / 7);
        }


        const currentWeek = getWeek(new Date);

        const currentWeekItem = projectData?.filter(item =>
            getWeek(new Date(item?.created_at)) === currentWeek
        )
        console.log(currentWeekItem, "currentWeekItem")
        setOngoingProjectData(ongoingProject);
        setCompleteproject(completedProject);
        setProjectwise(details);

        if (dataPayment) {
            let paymentwallet = dataPayment?.mst__transactions;
            console.log(paymentwallet, "paymentwallet");

            let payment = paymentwallet?.map((data) => {
                return data.mst__projects
            })
            console.log(payment, "payment")
            let details = payment?.filter((data) => {
                return data
            })
            let receiveGiftAmnt = paymentwallet?.map((receive) => receive.gift_aid_amount)
                ?.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue,
                    0
                );
            let receiveappfeesAmnt = paymentwallet?.map((receive) => receive.app_fee_amount)
                ?.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue,
                    0
                );
            let receiveTotalAmnt = paymentwalletdata
                ?.map((receive) => receive.total_amount)
                ?.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue,
                    0
                );
            console.log(paymentwalletdata, "paymentwalletdata");

            var filterMap = {};
            paymentwalletdata?.forEach(function (item) {
                if (!filterMap[item.id] || filterMap[item.id].total_amount < item.total_amount) {
                    filterMap[item.id] = item;
                }
            })
            var result = [];
            for (var id in filterMap) {
                result.push(filterMap[id]);
            }

            result.sort(function (a, b) {
                return b.total_amount - a.total_amount;
            });
            console.log(result, "paymentwalletdata")
            setHighlyamount(result)
            setGiftamount(receiveGiftAmnt);
            setTotalamount(receiveTotalAmnt);

            setAppfeesamut(receiveappfeesAmnt);
        }
    }, [dataPayment])
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
                    <Col span={8} style={{ marginRight: "4px" }}>
                        <Card className="total_project">
                            <div style={{ color: "#878787" }}>
                                <h4 style={{ margin: "0px", fontSize: "13px" }} className="collected_amount">
                                    Total Donation Amount
                                </h4>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <div style={{ color: "#252947" }}>
                                    <h2 style={{ margin: "10px 0px" }} className="collect_percentage">£ {totalamount}</h2>
                                </div>


                            </div>
                            <div className="admin_dashboard_top">
                                <div className="text_style">
                                    <h2 className="h2_align">£ {appfeesamut}</h2>
                                    <p className="app_align">App fee</p>
                                </div>
                                <div className="text_style">
                                    <h2 className="h2_align">£ {giftamount}</h2>
                                    <p className="app_align">Gift-aid</p>
                                </div>

                            </div>
                        </Card>
                    </Col>




                    <Col span={7} style={{ marginRight: "4px" }}>
                        <Card className="total_project">
                            <div style={{ color: "#878787" }}>
                                <h4 style={{ margin: "0px", fontSize: "13px" }} className="collected_amount">
                                    Total Project
                                </h4>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <div style={{ color: "#252947" }}>
                                    <h2 style={{ margin: "10px 0px" }} className="collect_percentage">{projectwise?.length}</h2>
                                </div>


                            </div>
                            <div className="admin_dashboard_top">
                                <div className="text_style">
                                    <h2 className="h2_align">05</h2>
                                    <p className="app_align">New</p>
                                </div>
                                <div className="text_style">
                                    <h2 className="h2_align">{ongoingProjectData?.length}</h2>
                                    <p className="app_align">Live</p>
                                </div>
                                <div className="text_style">
                                    <h2 className="h2_align">{completeproject?.length}</h2>
                                    <p className="app_align">Completed</p>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col span={7}>
                        <Card className="total_project">
                            <div style={{ color: "#878787" }}>
                                <h4 style={{ margin: "0px", fontSize: "12px" }} className="collected_amount">
                                    Total Charity
                                </h4>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <div style={{ color: "#252947" }}>
                                    <h2 style={{ margin: "10px 0px" }} className="collect_percentage">{datas?.length}</h2>
                                </div>


                            </div>
                            <div className="admin_dashboard_top">
                                <div className="text_style">
                                    <h2 className="h2_align">25</h2>
                                    <p className="app_align">New charity</p>
                                </div>

                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row
                    justify="space-around" style={{ marginTop: "20px", marginBottom: "40px" }}
                    className="statistic_row"
                >
                    <Col span={11} className="Statistics_col">
                        <Card style={{ margin: "0px", height: "100%" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                }}
                            >
                                <div>
                                    <h2 style={{ fontSize: "16px", marginTop: "0px" }} className="Statistics">New users</h2>
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
                        <Card style={{ padding: "11px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                }}
                            >
                                <div>
                                    <h2 style={{ fontSize: "16px", marginTop: "0px" }} className="project_title">New Ticket Requests</h2>
                                </div>
                                <div>
                                    <Image src={MaximizeButton} alt="image" />
                                </div>
                            </div>
                            {inprograss?.slice(0, 3)?.map((ticket) => {
                                return <div className="admin_ticket">
                                    <div className="project_sec">
                                        <Image src={Janifer} alt="image" width={40} height={40} />
                                        <span className="project_name">{ticket?.mst_ngo?.name}</span>
                                    </div>
                                    <span className="delete_sec">
                                        <Image src={Danger} alt="image" width={20} height={20} />
                                        <span className="delete_name">Delete post</span>
                                    </span>
                                </div>
                            })}





                        </Card>
                    </Col>
                </Row>

                <Row justify="space-around" style={{ marginTop: "20px", marginBottom: "40px" }} className="Payment_row">
                    <Col span={11} className="payment_col">
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
                                    <h2 className="dashbaord_payment">Highly collected Project</h2>
                                </div>
                                <div>
                                    <Image src={MaximizeButton} alt="image" />
                                </div>
                            </div>
                            {!highlyamount || highlyamount.length === 0 ? (<p>

                                <Empty />

                            </p>) : (<>

                                {highlyamount?.slice(0, 3).map((project) => {
                                    let startdate = moment(project?.mst__projects?.start_date).format('D MMMM YYYY');

                                    return <div className="notify_card" style={{ backgroundColor: "rgba(245, 245, 245, 1)" }}>
                                        <div className="payment_insight">
                                            <div>
                                                <Image src={Janifer} alt="image" className="payment_image" />
                                            </div>
                                            <div className="payment_profile">
                                                <h4 className="payment_details">{project?.mst__projects?.name}</h4>
                                                <h5 className="payment_date">{startdate}</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="payment_dollar" >£{project?.total_amount}</h3>
                                        </div>
                                    </div>
                                })}
                            </>)}



                        </Card>
                    </Col>

                    <Col span={11} className="payment_col">
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
                                    <h2 className="dashbaord_payment">Top Charity</h2>
                                </div>
                                <div>
                                    <Image src={MaximizeButton} alt="image" />
                                </div>
                            </div>

                            <div className="notify_card" style={{ backgroundColor: "rgba(245, 245, 245, 1)" }}>
                                <div className="payment_insight">
                                    <div>
                                        <Image src={Janifer} alt="image" className="payment_image" />
                                    </div>
                                    <div className="payment_profile">
                                        <h4 className="payment_details">Janifer</h4>
                                        <h5 className="payment_date">05 June 2022</h5>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="payment_dollar" >£75.06</h3>
                                </div>
                            </div>

                            <div className="notify_card" style={{ backgroundColor: "rgba(245, 245, 245, 1)", marginTop: "15px" }}>
                                <div className="payment_insight">
                                    <div>
                                        <Image src={Janifer} alt="image" className="payment_image" />
                                    </div>
                                    <div className="payment_profile">
                                        <h4 className="payment_details">Janifer</h4>
                                        <h5 className="payment_date">05 June 2022</h5>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="payment_dollar" >£75.06</h3>
                                </div>
                            </div>

                            <div className="notify_card" style={{ backgroundColor: "rgba(245, 245, 245, 1)", marginTop: "15px" }}>
                                <div className="payment_insight">
                                    <div>
                                        <Image src={Janifer} alt="image" className="payment_image" />
                                    </div>
                                    <div className="payment_profile">
                                        <h4 className="payment_details">Janifer</h4>
                                        <h5 className="payment_date">05 June 2022</h5>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="payment_dollar" >£75.06</h3>
                                </div>
                            </div>

                        </Card>
                    </Col>

                </Row>
            </div >
        </div >
    );
};

export default authProtected(AdminDashboard);
