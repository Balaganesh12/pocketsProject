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

export const Payment: React.FC = () => {
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
      Name: "Name",
      ProjectName: "Project Name",
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
                  onClick={() => router.replace("/adminwallet")}
                />
              </span>
              Gift-aid List
            </h1>
          </div>
          <div className="payment_header_select">
            <Button className="export_pdf" >
              <Image loader={sanityIoImageLoader} alt="image" src={export1} />
              Export as PDF</Button>
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
                    {headerdata?.Name}

                  </li>
                  <li className="payment_Remittance">
                    {headerdata?.ProjectName}

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
          {!paymentData || paymentData?.length === 0 ?
            (<p>
              <Empty />
            </p>) : (
              <>
                {paymentData?.map((paymentdata, i) => {
                  let startdate = moment(paymentdata?.transaction_date).format('D MMMM YYYY')

                  return (
                    <>
                      <ul className="wallet_payment_history">
                        <li className="wallet_payment_serial">{i + 1}</li>
                        <li className="wallet_payment_name">
                          {paymentdata?.user?.displayName}
                        </li>
                        <li className="wallet_payment_historydata">
                          {paymentdata?.mst__projects?.name}
                        </li>
                        <li className="wallet_payment_historydata">
                          {" "}
                          {startdate}
                        </li>
                        <li className="wallet_payment_historydata">
                          {/* {paymentdata?.transaction_id} */}
                          RBI54678320
                        </li>
                        <li className="wallet_payment_amnt">
                          £{paymentdata?.gift_aid_amount}

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

export default authProtected(Payment);
