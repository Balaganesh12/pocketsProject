import { Table, Select, Button, Empty } from "antd";
import { GET_PAYMENT, GET_PAYMENT_BY_NGOID, NGO_USER } from "../../helpers/queries";
import { useQuery } from "@apollo/client";
import arrowleft from "../../assets/images/arrow-left.png";
import export1 from "../../assets/images/export.svg";
import moment from "moment";
import Image from "next/image";
import router, { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { authProtected } from "../../components/protected-route";
import { useUserData } from '@nhost/nextjs'

export const Projectwise: React.FC = () => {
    const router = useRouter();
    const [ngogoproject, setNgoProject] = useState<any>([]);
    const user = useUserData();
    const [topproject, setTopproject] = useState<any>([]);

    const sanityIoImageLoader = ({ src, width, quality }) => {
        return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
    }
    const {
        error: paymentError,
        loading: paymentLoading,
        data: dataPayment,
        refetch: refetchPayment,
    } = useQuery(GET_PAYMENT, {
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
        error: paymentngoError,
        loading: paymentngoLoading,
        data: ngodataPayment,
        refetch: refetchngoPayment,
    } = useQuery(GET_PAYMENT_BY_NGOID, {
        variables: {
            ngo_id: ngogoproject?.toString()

        },
    });
    useEffect(() => {
        const ngoId = ngoData?.mst__ngos.map((data) => {
            return data?.id
        });
        setNgoProject(ngoId);
    }, [router])
    let paymentData = ngodataPayment?.mst__transactions;
    useEffect(() => {
        if (ngodataPayment) {
            let paymentwallet = ngodataPayment?.mst__transactions;
            let payment = paymentwallet?.map((data) => {
                return data.mst__projects
            })
            let details = payment?.filter((data) => {
                return data
            })

            setTopproject(details);
        }
    }, [ngodataPayment])
    const closeDateValue = (closedate) => {
        var eventdate = moment(closedate);
        var todaysdate = moment();
        return eventdate.diff(todaysdate, "days");
    };

    const paymentheader = [
        {
            header: "Serial No.",
            ProjectName: "Project Name",
            Charityname: "Charity name",
            StartDate: "Start Date",
            Endingin: "Ending in",
            Amount: "Amount",
        },
    ];

    return (
        <>
            <div className="project_wise">
                <div className="payment_history_headertitle">
                    <div>
                        <h1 className="gif_head">
                            <span className="payment_history_back">
                                <Image
                                    src={arrowleft}
                                    alt="arrowleft"
                                    onClick={() => router.replace("/ngowallet")}
                                />
                            </span>
                            Project wise collection
                        </h1>
                    </div>
                    <div className="payment_header_select">

                        <Select
                            className="payment_header_select"
                            placeholder="Filter by"
                        >
                            <Select.Option>data</Select.Option>
                        </Select>
                    </div>
                </div>
                <div className="wallet_payment_historyuser">
                    {/* <Table dataSource={dataSource} columns={columns} />; */}
                    {/* {paymentheader?.map((headerdata) => {
                        return (
                            <div className="payment_header">
                                <ul className="list_of_payment">
                                    <li className="payment_serial">{headerdata?.header}</li>
                                    <li className="payment_ProjectName">
                                        {" "}
                                        {headerdata?.ProjectName}

                                    </li>
                                    <li className="payment_Remittance">
                                        {headerdata?.Charityname}

                                    </li>
                                    <li className="payment_ReceivedDate">
                                        {headerdata?.StartDate}
                                    </li>
                                    <li className="payment_TransactionID">
                                        {" "}
                                        {headerdata?.Endingin}
                                    </li>
                                    <li className="payment_Amount">{headerdata?.Amount}</li>
                                </ul>
                            </div>
                        );
                    })} */}
                    {!topproject || topproject.length === 0 ? (<p>
                        <Empty />
                    </p>) : (
                        <>
                            {topproject?.map((paymentdata, i) => {
                                let startdate = moment(paymentdata?.start_date).format('D MMM YYYY')
                                let date1 = new Date();
                                let dateformat = moment(date1).format('D MMM YYYY')
                                let enddate = moment(paymentdata?.close_date).format('D MMM YYYY')
                                let receiveAmnt = paymentdata?.mst__transactions
                                    ?.map((receive) => receive.total_amount)
                                    ?.reduce(
                                        (accumulator, currentValue) =>
                                            accumulator + currentValue,
                                        0
                                    );

                                return (
                                    <>
                                        <ul className="wallet_user_projectwise">
                                            {/* <li className="wallet_payment_serial">{i + 1}</li> */}
                                            <li className="wallet_payment_name">
                                                {paymentdata?.name}
                                            </li>
                                            {/* <li className="wallet_payment_historydata">
                                        {paymentdata?.mst__ngo?.name}
                                    </li> */}
                                            <li className="wallet_payment_historydata">
                                                {" "}
                                                Posted on:{startdate}

                                            </li>
                                            <li className="wallet_payment">
                                                Ended on:{dateformat > enddate ? (<>
                                                    {enddate}

                                                </>) : (<span className="still_going">
                                                    Still going</span>)}
                                            </li>
                                            <li className="wallet_payment_amnt">
                                                £{receiveAmnt}
                                            </li>
                                        </ul>
                                    </>
                                );
                            })}
                        </>
                    )}

                </div>
            </div>
        </>
    );
};

export default authProtected(Projectwise);
