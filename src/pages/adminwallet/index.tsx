import Link from "next/link";
import { Row, Col, Progress, Select, Button, Empty, Form } from "antd";
import Image from "next/image";
import collectamnt from "../../assets/images/collectamnt.png";
import giftaid from "../../assets/images/giftaid.png";
import maximize from "../../assets/images/maximize_wallet.svg";
import payment_user from "../../assets/images/payment_user.png";
import Payment from "./Payment";
import Projectwise from "./Projectwise";
import { useEffect, useState } from "react";
import { GET_PAYMENT, GET_PROJECT } from "../../helpers/queries";
import { useQuery } from "@apollo/client";
import router, { useRouter } from 'next/router'
import moment from "moment";
import { authProtected } from '../../components/protected-route';

export const walletindex: React.FC = () => {
  const router = useRouter()
  const [projectwise, setProjectwise] = useState<any>([]);
  const [giftamount, setGiftamount] = useState<any>([]);
  const [appfeesamut, setAppfeesamut] = useState<any>([]);
  const [totalamount, setTotalamount] = useState<any>([]);

  const {
    error: paymentError,
    loading: paymentLoading,
    data: dataPayment,
    refetch: refetchPayment,
  } = useQuery(GET_PAYMENT, {
    variables: {},
  });

  let paymentwalletdata = dataPayment?.mst__transactions;
  useEffect(() => {

    if (dataPayment) {
      let paymentwallet = dataPayment?.mst__transactions;
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

      setAppfeesamut(receiveappfeesAmnt);
      setProjectwise(details);
    }
  }, [dataPayment])
  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });

  const closeDateValue = (closedate) => {
    var eventdate = moment(closedate);
    var todaysdate = moment();
    return eventdate.diff(todaysdate, "days");
  };

  return (
    <>

      <div className="total_wallet">
        <div className="total_wallet_header">
          <h1>Wallet</h1>
          <div className='filter_select'>
            <Form.Item
              name="user"
              className="select-selector"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select

                placeholder="This month"
                options={[
                  { value: "This month ", label: "This month " },
                  { value: "This year ", label: "This year " },
                  { value: "This week", label: "This week" },
                  { value: "Last month", label: "Last month" },
                  { value: "Last 3 month", label: "Last 3 month" },
                ]}
              >
              </Select>
            </Form.Item>
          </div>
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
                      Transferred
                      <span className="collect_amnt"> (£10000)</span>
                    </h6>
                  </li>

                </ul>
              </div>
            </Col>
            <Col md={12}>
              <div className="calendar_count">


                <div className="daily_count">
                  <h5>Gift-aid</h5>
                  <h1>£ {giftamount}</h1>
                </div>
                <div className="daily_count">
                  <h5>App fee</h5>

                  <h1>£{appfeesamut}</h1>
                </div>



              </div>
            </Col>
          </Row>
        </div>

        <div className="wallet_section2">
          <div className="wallet_section2_header">
            <h1>Gift-aid</h1>
            <Image
              src={maximize}
              alt="maximize"
              onClick={() => router.replace('/adminwallet/Payment')}
            />
          </div>
          {!paymentwalletdata || paymentwalletdata?.length === 0 ? (<p>
            <Empty />
          </p>) : (
            <>
              {paymentwalletdata?.slice(0, 3).map((projectdata) => {
                let startdate = moment(projectdata?.start_date).format('D-MMM-YYYY')


                return (
                  <div className="amount_align2">
                    <ul className="wallet_project_wise2">
                      <li className="wallet_project_name2">{projectdata?.user?.displayName}</li>
                      <li className="wallet_project_date2">
                        {startdate}
                      </li>
                      <li className="wallet_project_date2">
                        {projectdata?.mst__projects?.name}
                      </li>

                    </ul>
                    <ul className="wallet_project_wise3">
                      <li className="wallet_project_amnt2">
                        £{projectdata?.gift_aid_amount}
                      </li>
                    </ul>

                  </div>
                );
              })}
            </>
          )}

        </div>

        <div className="wallet_section3">
          <div className="wallet_section3_header">
            <h1>Project wise collection</h1>
            <a
              onClick={() => router.replace('/adminwallet/Projectwise')}
            >
              <Image
                src={maximize}
                alt="maximize"
              />
            </a>
          </div>
          {!projectwise || projectwise?.length === 0 ? (<p>
            <Empty />
          </p>) : (
            <>
              {projectwise?.slice(0, 3)?.map((projectdata) => {
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
                      <li className="wallet_project_date">{closeDateValue(
                        projectdata?.close_date
                      )}{" "}
                        days left</li>
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

        <div className="trans_history">
          <div className="wallet_section3_header">
            <h1>Transaction history</h1>
            <a
              onClick={() => router.replace('/adminwallet/Transaction')}
            >
              <Image
                src={maximize}
                alt="maximize"
              />
            </a>
          </div>
          {!paymentwalletdata || paymentwalletdata?.length === 0 ? (<p>
            <Empty />
          </p>) : (
            <>
              {paymentwalletdata?.slice(0, 3).map((projectdata) => {
                let startdate = moment(projectdata?.transaction_date).format('D-MMM-YYYY')
                return (
                  <div className="wallet_align3">
                    <ul className="wallet_project_wise">
                      <li className="wallet_project_name">{projectdata?.mst__ngo?.name}
                      </li>
                      <li className="wallet_project_date">
                        {startdate}
                      </li>


                    </ul>
                    <ul className="wallet_project_wise3">
                      <Button className="Panid_bttn">Paid</Button>
                      <li className="wallet_project_amnt2">
                        £{projectdata?.total_amount}
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
