import { Table, Select, Button, Empty } from "antd";
import { GET_PAYMENT } from "../../helpers/queries";
import { useQuery } from "@apollo/client";
import arrowleft from "../../assets/images/arrow-left.png";
import export1 from "../../assets/images/export.svg";
import moment from "moment";

import Image from "next/image";
import router, { useRouter } from 'next/router'
import { useEffect } from "react";
import { authProtected } from "../../components/protected-route";

export const Transaction: React.FC = () => {
    const router = useRouter();
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

    let paymentData = dataPayment?.mst__transactions;

    const paymentheader = [
        {
            header: "Serial No.",
            Charityname: "Charity name",
            Formonth: "For month",
            Date: "Date",
            Status: "Status",
            Amount: "Amount",
        },
    ];

    return (
        <>
            <div className="transaction_details">
                <div className="payment_history_headertitle">
                    <div>
                        <h1 className="gif_head">
                            <span className="payment_history_back">
                                <Image
                                    src={arrowleft}
                                    alt="arrowleft"
                                    onClick={() => router.replace("/adminwallet")}
                                />
                            </span>
                            Transaction history
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
                                    <li className="payment_ProjectName">
                                        {" "}
                                        {headerdata?.Charityname}

                                    </li>
                                    <li className="payment_Remittance">
                                        {headerdata?.Formonth}

                                    </li>
                                    <li className="payment_ReceivedDate">
                                        {headerdata?.Date}
                                    </li>
                                    <li className="payment_TransactionID">
                                        {" "}
                                        {headerdata?.Status}
                                    </li>
                                    <li className="payment_Amount">{headerdata?.Amount}</li>
                                </ul>
                            </div>
                        );
                    })}
                    {!paymentData || paymentData?.length === 0 ? (
                        <p>
                            <Empty />
                        </p>
                    ) : (
                        <>
                            {paymentData?.map((paymentdata, i) => {
                                let startdate = moment(paymentdata?.transaction_date).format('D MMM YYYY')

                                console.log(paymentdata, "paymentdata")
                                return (
                                    <div>
                                        <ul className="wallet_payment_history">
                                            <li className="wallet_payment_serial">{i + 1}</li>
                                            <li className="wallet_payment_name">
                                                {paymentdata?.mst__ngo?.name}
                                            </li>
                                            <li className="wallet_payment_historydata">
                                                {/* {paymentdata?.remittance} */}
                                                December
                                            </li>
                                            <li className="wallet_payment_historydata">
                                                {" "}
                                                {startdate}
                                            </li>
                                            <li className="wallet_payment_historydata">
                                                {/* {paymentdata?.transaction_id} */}
                                                <Button className="Panid_bttn">Paid</Button>
                                            </li>
                                            <li className="wallet_payment_amnt">
                                                £{paymentdata?.total_amount
                                                }
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

export default authProtected(Transaction);
