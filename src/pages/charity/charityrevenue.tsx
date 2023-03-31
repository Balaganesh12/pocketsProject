import { useEffect, useState } from "react";
import revenue from "../../assets/images/revenue.png";
import Image from "next/image";
import { Tag, Drawer, Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import donors from "../../assets/images/donors.png";
import received_amnt from "../../assets/images/received_amnt.png";
import coin from "../../assets/images/coin.png";
import gift from "../../assets/images/gift.png";
import arrow from "../../assets/images/arrow-left.png";
import moment from "moment";

export const charityrevenue: React.FC<any> = ({ createdata }) => {
  const [drawnpage, setDrawnpage] = useState(null);
  const [revenuedetail, setRevenuedetail] = useState(null);
  const [collectedamount, setCollectedamount] = useState(null);

  useEffect(()=>{
    setRevenuedetail(createdata)
    let charitytotalamount = createdata?.mst__transactions?.map((totalamount)=>{
      return totalamount?.total_amount
    })

    let charitygiftaid = createdata?.mst__transactions?.map((giftaid)=>{
      return giftaid?.gift_aid_amount
    })

    let charityappfee = createdata?.mst__transactions?.map((appfee)=>{
      return appfee?.app_fee_amount
    })
    
    let charitycollected = { charitytotalamount, charitygiftaid, charityappfee }

    setCollectedamount(charitycollected)

  },[createdata])

  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };

  const Daysleft = (close_date) => {
    var evendate = moment(close_date);
    var todaydate = moment();
    return evendate.diff(todaydate, "days");
  };

  return (
    <div className="total_revenue_page">
      <div className="revenue_page">
        <div className="revenue_content">
          <div className="revenue_img">
            <Image src={revenue} alt="revenue" />
          </div>
          <div className="revenue_detail">
            <h2 className="project_title_revenue">
              Created by: {revenuedetail?.name}
            </h2>
            <p className="project_date_revenue">
              Created on: {revenuedetail?.start_date}
            </p>
            <Button className="pockets_medico_button">
              {revenuedetail?.project_category?.name}
            </Button>
            <div className="days_left_tag">
              <Tag color="green" className="days_left_revenue">
                <ClockCircleOutlined /> {Daysleft(revenuedetail?.close_date)} days
                left
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <div className="revenue_section2">
        <div className="revenue_section2_header">
          <h5>Revenue details</h5>
        </div>
        <div className="revenue_detail_card">
          <h6>Total donors</h6>
          <h1>
            <span>
              <Image src={donors} alt="donors" />
            </span>
            {createdata?.mst__transactions?.length}
          </h1>
        </div>
        <div className="revenue_list_item">
          <div className="revenue_detail_card">
            <h6>Received amount </h6>
            <h1>
              <span>
                <Image src={received_amnt} alt="received_amnt" />
              </span>
              £ {collectedamount?.charitytotalamount}
            </h1>
          </div>
          <div className="revenue_detail_card">
            <h6>App fee</h6>
            <h1>
              <span>
                <Image src={coin} alt="coin" />
              </span>
              £ {collectedamount?.charityappfee}
            </h1>
          </div>
          <div className="revenue_detail_card">
            <h6>Gift aid</h6>
            <h1>
              <span>
                <Image src={gift} alt="gift" />
              </span>
              £ {collectedamount?.charitygiftaid}
            </h1>
          </div>
        </div>
      </div>
      <div>
      </div>

    </div>
  );
};

export default charityrevenue;
