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

export const Paymenthistory: React.FC = () => {
    const router = useRouter();
    const user = useUserData();
    const [ngogoproject, setNgoProject] = useState<any>([]);
    const [paymenthistory, setPaymenthistory] = useState<any>([]);
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
        const ngoId = ngoData?.mst__ngos.map((data) => {
            return data?.id
        });
        setNgoProject(ngoId);
    }, []);
    useEffect(() => {
        if (ngodataPayment) {
            let paymentData = ngodataPayment?.mst__transactions;
            let payment = paymentData?.map((data) => {
                return data.mst__projects
            })
            let details = payment?.filter((data) => {
                return data
            })
            setPaymenthistory(details);
        }
    }, [ngodataPayment])
    const paymentheader = [
        {
            header: "Serial No.",
            ProjectName: "Project Name",
            Remittance: "Remittance",
            ReceivedDate: "Received Date",
            TransactionID: "Transaction ID",
            Amount: "Amount",
        },
    ];

    return (
        <>
            <div className="total_payment">
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
                            Payment History
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
                <div className="wallet_payment_history">
                    {/* <Table dataSource={dataSource} columns={columns} />; */}
                    {paymentheader?.map((headerdata) => {
                        return (
                            <div className="payment_header">
                                <ul className="list_of_payment">
                                    <li className="payment_serial">{headerdata?.header}</li>
                                    <li className="paymenthistory_ProjectName">
                                        {" "}
                                        {headerdata?.ProjectName}

                                    </li>
                                    <li className="paymenthistory_Remittance">
                                        {headerdata?.Remittance}

                                    </li>
                                    <li className="payment_ReceivedDate">
                                        {headerdata?.ReceivedDate}
                                    </li>
                                    <li className="payment_TransactionID">
                                        {" "}
                                        {headerdata?.TransactionID}
                                    </li>
                                    <li className="payment_Amount">{headerdata?.Amount}</li>
                                </ul>
                            </div>
                        );
                    })}
                    {!paymenthistory || paymenthistory.length === 0 ? (<p>
                        <Empty />
                    </p>) : (
                        <>
                            {paymenthistory?.map((paymentdata, i) => {
                                let startdate = moment(paymentdata?.transaction_date).format('D MMM YYYY')
                                let receiveAmnt = paymentdata?.mst__transactions
                                    ?.map((receive) => receive.total_amount)
                                    ?.reduce(
                                        (accumulator, currentValue) =>
                                            accumulator + currentValue,
                                        0
                                    );
                                return (
                                    <>
                                        <ul className="wallet_payment_history">
                                            <li className="wallet_payment_serial">{i + 1}</li>
                                            <li className="wallet_payment_name">
                                                {paymentdata?.name}
                                            </li>
                                            <li className="wallet_payment_history1">
                                                {paymentdata?.mst__ngo?.name}
                                            </li>
                                            <li className="wallet_payment_history1">
                                                {" "}
                                                {startdate}
                                            </li>

                                            <li className="wallet_payment_history1">
                                                {/* {paymentdata?.transaction_id} */}
                                                RBI54678320
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

export default authProtected(Paymenthistory);
