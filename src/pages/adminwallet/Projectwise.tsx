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

export const Projectwise: React.FC = () => {
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
  console.log(dataPayment, "dataPayment")
  let paymentData = dataPayment?.mst__transactions;

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
                  onClick={() => router.replace("/adminwallet")}
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
        <div className="wallet_payment_history">
          {/* <Table dataSource={dataSource} columns={columns} />; */}
          {paymentheader?.map((headerdata) => {
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
          })}

          {!paymentData || paymentData?.length === 0 ? (
            <p>
              <Empty />
            </p>
          ) : (
            <>
              {paymentData?.map((paymentdata, i) => {
                let startdate = moment(paymentdata?.mst__projects?.start_date).format('D MMMM YYYY')

                return (
                  <>
                    <ul className="wallet_payment_history">
                      <li className="wallet_payment_serial">{i + 1}</li>
                      <li className="wallet_payment_name">
                        {paymentdata?.mst__projects?.name}
                      </li>
                      <li className="wallet_payment_historydata">
                        {paymentdata?.mst__ngo?.name}
                      </li>
                      <li className="wallet_payment_historydata">
                        {" "}
                        {startdate}

                      </li>
                      <li className="wallet_payment_historydata">
                        {closeDateValue(
                          paymentdata?.mst__projects?.close_date
                        )}{" "}
                        days
                      </li>
                      <li className="wallet_payment_amnt">
                        £{paymentdata?.total_amount}
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
