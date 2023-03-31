import Link from "next/link";
import { Row, Col, Progress, Select, Empty } from "antd";
import Image from "next/image";
import collectamnt from "../../assets/images/collectamnt.png";
import giftaid from "../../assets/images/giftaid.png";
import maximize from "../../assets/images/maximize_wallet.svg";
import Adminlogo from "../../assets/images/admin logo.svg";

import payment_user from "../../assets/images/payment_user.png";
import { useEffect, useState } from "react";
import { GET_PAYMENT, GET_PROJECT, GET_PROJECT_BY_NGOID, NGO_USER, GET_PAYMENT_BY_NGOID } from "../../helpers/queries";
import { useQuery } from "@apollo/client";
import router, { useRouter } from 'next/router'
import moment from "moment";
import { authProtected } from '../../components/protected-route';
import { useUserData } from '@nhost/nextjs'

export const walletindex: React.FC = () => {
    const user = useUserData();
    const [ngogoproject, setNgoProject] = useState<any>([]);
    const [topproject, setTopproject] = useState<any>([]);
    const [giftamount, setGiftamount] = useState<any>([]);
    const [appfeesamut, setAppfeesamut] = useState<any>([]);
    const [totalamount, setTotalamount] = useState<any>([]);
    const [monthAmount, setMonthAmount] = useState<any>([]);
    const [todayTransaction, setTodayTransaction] = useState<any>([]);
    const [weekAmount, setWeekAmount] = useState<any>([]);
    const {
        error: paymentError,
        loading: paymentLoading,
        data: dataPayment,
        refetch: refetchPayment,
    } = useQuery(GET_PAYMENT, {
        variables: {},
    });
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
    let paymentwalletdata = ngodataPayment?.mst__transactions;
    useEffect(() => {

        if (ngodataPayment) {
            let paymentwallet = ngodataPayment?.mst__transactions;


            let Createat = paymentwallet?.map((data) => {
                return data
            });
            let todayDate = new Date();
            let dateformat = moment(todayDate).format('YYYY-MM-D');
            let filterdate = Createat.filter(data => data?.transaction_date === dateformat)
            let Todaytransactions = filterdate?.map((receive) => receive.total_amount)
                ?.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue,
                    0
                );
            let currentMonth = '0' + (new Date().getMonth() + 1)
            let currentYear = new Date().getFullYear()
            let events = Createat.filter((e) => {
                var dateStr = currentYear + '-' + currentMonth;
                return (e.transaction_date.indexOf(dateStr) !== -1)
            });
            let thisMonthTransaction = events?.map((receive) => receive.total_amount)
                ?.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue,
                    0
                );


            const getWeek = date => {
                let now = new Date(date);
                let firstJanuary = new Date(now.getFullYear(), 0, 1);
                return Math.ceil((((now.getTime() - firstJanuary.getTime()) / 86400000) + firstJanuary.getDay() + 1) / 7);
            }


            const currentWeek = getWeek(new Date);

            const currentWeekItem = Createat.filter(item =>
                getWeek(new Date(item.created_at)) === currentWeek
            )


            let thisWeekTransaction = currentWeekItem?.map((receive) => receive.total_amount)
                ?.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue,
                    0
                );
            let payment = paymentwallet?.map((data) => {
                return data.mst__projects
            })
            let details = payment?.filter((data) => {
                return data
            })
            let receiveGiftAmnt = paymentwalletdata?.map((receive) => receive.gift_aid_amount)
                ?.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue,
                    0
                );
            let receiveappfeesAmnt = paymentwalletdata?.map((receive) => receive.app_fee_amount)
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
            setGiftamount(receiveGiftAmnt);
            setTotalamount(receiveTotalAmnt);
            setTodayTransaction(Todaytransactions);
            setAppfeesamut(receiveappfeesAmnt);
            setMonthAmount(thisMonthTransaction);
            setTopproject(details);
            setWeekAmount(thisWeekTransaction);
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
        error: ngoError,
        loading: ngoLoading,
        data: ngoData,
        refetch: refetchngo,
    } = useQuery(NGO_USER, {
        variables: {
            id: user?.id
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
    useEffect(() => {
        if (ngoData) {
            const ngoId = ngoData?.mst__ngos.map((data) => {
                return data?.id
            });
            setNgoProject(ngoId);
        }

    }, [ngoData])
    let projectwalletdata = ngodataProject?.mst__projects?.slice(0, 3);
    const closeDateValue = (closedate) => {
        var eventdate = moment(closedate);
        var todaysdate = moment();
        return eventdate.diff(todaysdate, "days");
    };

    const router = useRouter()
    return (
        <>

            <div className="total_wallet">
                <div className="total_wallet_header">
                    <h1>Wallet</h1>
                </div>

                <div className="wallet_section1">
                    <Row gutter={12}>
                        <Col md={12}>
                            <div className="wallet_header">
                                <h5>Total Collected Amount</h5>
                                <h1>£ {totalamount}</h1>
                                <div className="wallet_progress">
                                    <Progress
                                        percent={70}
                                        showInfo={false}
                                        strokeColor={"#252947"}
                                    />
                                </div>
                                <ul className="list_of_wallet">
                                    <li>
                                        <Image src={collectamnt} alt="collectamnt" />
                                    </li>
                                    <li>
                                        <h6>
                                            Collected Amount
                                            <span className="collect_amnt"> (£10000)</span>
                                        </h6>
                                    </li>
                                    <li>
                                        <Image src={giftaid} alt="collectamnt" />
                                    </li>
                                    <li>
                                        <h6>
                                            Giftaid <span className="collect_gift">(£{giftamount})</span>
                                        </h6>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="calendar_count">
                                <div className="daily_count">
                                    <h5>Today</h5>
                                    <h1>£ {todayTransaction}</h1>
                                </div>
                                <div className="daily_count">
                                    <h5>This week</h5>
                                    <h1>£ {weekAmount}</h1>
                                </div>
                                <div className="daily_count">
                                    <h5>This month</h5>
                                    <h1>£ {monthAmount}</h1>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="wallet_section_user">
                    <Row>
                        <Col md={12}>
                            <div className="top_project">
                                <h1>Top 3 project</h1>
                                {!topproject || topproject.length === 0 ? (<p>

                                    <Empty />

                                </p>) : (
                                    <>
                                        {topproject?.slice(0, 3)?.map((topprojectdata) => {
                                            let startdate = moment(topprojectdata?.start_date).format('D MMMM YYYY');

                                            let receiveAmnt = topprojectdata?.mst__transactions
                                                ?.map((receive) => receive.total_amount)
                                                ?.reduce(
                                                    (accumulator, currentValue) =>
                                                        accumulator + currentValue,
                                                    0
                                                );
                                            return (
                                                <div className="top_project_list">
                                                    <div className="project_list_detail">
                                                        <h5>{topprojectdata?.name}</h5>
                                                        <p>{startdate}</p>
                                                    </div>

                                                    <div className="project_list_amount">
                                                        <h4>£{receiveAmnt}</h4>
                                                    </div>

                                                </div>
                                            );
                                        })}
                                    </>
                                )}

                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="wallet_payment">
                                <div className="walletpayment_header">
                                    <h1>Payment history</h1>
                                    <Image
                                        src={maximize}
                                        alt="maximize"
                                        onClick={() => router.replace('/ngowallet/Paymentdetails')}
                                    />
                                </div>
                                {!paymentwalletdata || paymentwalletdata.length === 0 ? (<>
                                    <p>
                                        <Empty />
                                    </p>
                                </>) : (

                                    <>
                                        {paymentwalletdata?.slice(0, 3).map((paymentdata) => {
                                            let startdate = moment(paymentdata?.transaction_date).format('D MMMM YYYY');

                                            return (
                                                <div className="wallet_payment_list">
                                                    <div className="wallet_list_detail">
                                                        <div>
                                                            <Image src={Adminlogo} alt="payment_user" />
                                                        </div>
                                                        <div className="wallet_payment_date">
                                                            <h5>{paymentdata?.mst__ngo?.name}
                                                            </h5>
                                                            <p>{startdate}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="wallet_list_amount">
                                                        <h4>£{paymentdata?.total_amount}</h4>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                )}

                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="wallet_section3">
                    <div className="wallet_section3_header">
                        <h1>Project wise collection</h1>
                        <Image
                            src={maximize}
                            alt="maximize"
                            onClick={() => router.replace('/ngowallet/Projectwise')}
                        />
                    </div>

                    {!topproject || topproject.length === 0 ? (
                        <p>
                            <Empty />
                        </p>

                    ) : (
                        <>
                            {topproject?.slice(0, 3)?.map((projectdata) => {
                                let startdate = moment(projectdata?.start_date).format('D-MMM-YYYY')
                                let receiveAmnt = projectdata?.mst__transactions
                                    ?.map((receive) => receive.total_amount)
                                    ?.reduce(
                                        (accumulator, currentValue) =>
                                            accumulator + currentValue,
                                        0
                                    );
                                return (
                                    <div className="wallet_align3">
                                        <ul className="wallet_project_wise">
                                            <li className="wallet_project_name">{projectdata?.name}</li>
                                            <li className="wallet_project_date">
                                                {startdate}
                                            </li>
                                            <li className="wallet_project_date"> {closeDateValue(
                                                projectdata?.close_date
                                            )}{" "}
                                                days</li>
                                            <li className="wallet_project_date">
                                                {projectdata?.project_category?.name}
                                            </li>

                                        </ul>
                                        <ul className="wallet_project_wise3">
                                            <li className="wallet_project_amnt2">
                                                £{receiveAmnt}
                                            </li>
                                        </ul>

                                    </div>
                                );
                            })}
                        </>
                    )}

                </div>
            </div>

        </>
    );
};

export default authProtected(walletindex);
