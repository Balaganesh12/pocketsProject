import { useEffect, useState } from "react";
import revenue from "../../assets/images/revenue.png";
import Image from "next/image";
import { Tag, Popover, Drawer, Button, Modal } from "antd";
import { MoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import edit from "../../assets/images/edit.png";
import revenue_icon from "../../assets/images/revenue_icon.png";
import payment_icon from "../../assets/images/money-time.png";
import eyeslash from "../../assets/images/eye-slash.png";
import trash from "../../assets/images/trash.png";

import donors from "../../assets/images/donors.png";
import received_amnt from "../../assets/images/received_amnt.png";
import coin from "../../assets/images/coin.png";
import gift from "../../assets/images/gift.png";
import { GET_PROJECT } from "../../helpers/queries";
import { useQuery } from "@apollo/client";
import arrow from "../../assets/images/arrow-left.png";
import Paymenthistory from "./Paymenthistory";
import moment from "moment";

export const Revenue: React.FC<any> = ({ carddetail }) => {
  console.log(carddetail, "carddetail");
  const [revenuedata, setRevenueData] = useState();
  const [drawnpage, setDrawnpage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(revenuedata, "revenuedata");
  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });

  // useEffect(() => {
  //   if (carddetail) {
  //     setRevenueData(carddetail)
  //   }
  // }, []);
  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };

  const content = (
    <div>
      <div className="revenue_drawn_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={edit} />
        </span>
        <h5>Edit content</h5>
      </div>
      <div className="revenue_drawn_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={revenue_icon} />
        </span>
        <h5>Revenue details</h5>
      </div>
      <div className="revenue_drawn_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={payment_icon} />
        </span>
        <h5 onClick={() => setDrawnpage("Paymenthistory")}>Payment History</h5>
      </div>
      <div className="revenue_drawn_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={eyeslash} />
        </span>
        <h5>Archive this project</h5>
      </div>
      <div className="revenue_drawn_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={trash} />
        </span>
        <h5 onClick={showModal}>Delete project</h5>
      </div>
    </div>
  );

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
              Created by: {carddetail?.name}
            </h2>
            <p className="project_date_revenue">
              Created on: {carddetail?.start_date}
            </p>
            <Button className="pockets_medico_button">
              {carddetail?.project_category?.name}
            </Button>
            <div className="days_left_tag">
              <Tag color="green" className="days_left_revenue">
                <ClockCircleOutlined /> {Daysleft(carddetail?.close_date)} days
                left
              </Tag>
            </div>
          </div>
        </div>
        <div>
          <Popover placement="bottomRight" content={content} trigger="click">
            <MoreOutlined />
          </Popover>
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
            591
          </h1>
        </div>

        <div className="revenue_list_item">
          <div className="revenue_detail_card">
            <h6>Received amount </h6>
            <h1>
              <span>
                <Image src={received_amnt} alt="received_amnt" />
              </span>
              £ 591
            </h1>
          </div>

          <div className="revenue_detail_card">
            <h6>App fee</h6>
            <h1>
              <span>
                <Image src={coin} alt="coin" />
              </span>
              £ 8
            </h1>
          </div>

          <div className="revenue_detail_card">
            <h6>Gift aid</h6>
            <h1>
              <span>
                <Image src={gift} alt="gift" />
              </span>
              £ 64
            </h1>
          </div>
        </div>
      </div>
      <div>
        <Drawer
          placement="right"
          open={drawnpage?.length > 1 ? true : false}
          closable={false}
          onClose={() => setDrawnpage(false)}
          title={
            <div className="create_project_sec">
              <Image
                loader={sanityIoImageLoader}
                alt="image"
                src={arrow}
                width="25"
                style={{ cursor: "pointer" }}
                onClick={() => setDrawnpage(false)}
              />
              {drawnpage === "Paymenthistory" ? <h2>Child in need</h2> : <></>}
            </div>
          }
          width="700px"
        >
          {drawnpage === "Paymenthistory" ? (
            <>
              <Paymenthistory />
            </>
          ) : (
            <></>
          )}
        </Drawer>
      </div>

      <Modal
        open={isModalOpen}
        footer={null}
      >
        <div className="revenue_modal">
          <h1>Do you want this to be deleted</h1>
          <p>
            This will remove the data permanently, the data will not be
            recovered!
          </p>
          <div className="revenue_modal_btns">
            <Button className="revenue_modal_btns_cancel" onClick={handleOk}>Cancel</Button>
            <Button className="revenue_modal_btns_ok" onClick={handleCancel}>Yes, delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Revenue;
