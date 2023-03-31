import { useState } from "react";
import Image from "next/image";
import revenue from "../../assets/images/revenue.png";
import { GET_PROJECT } from "../../helpers/queries";
import { useQuery } from "@apollo/client";
import { Tag, Popover, Button, Input } from "antd";
import { MoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import edit from "../../assets/images/edit.png";
import revenue_icon from "../../assets/images/revenue_icon.png";
import payment_icon from "../../assets/images/money-time.png";
import eyeslash from "../../assets/images/eye-slash.png";
import trash from "../../assets/images/trash.png";
import commentsearch from "../../assets/images/commentsearch.png";
import payment_user from "../../assets/images/payment_user.png";
import refresh from "../../assets/images/refresh.png";
import { Collapse } from "antd";

export const Paymenthistory: React.FC<any> = ({ carddetail }) => {
  const [drawnpage, setDrawnpage] = useState(null);
  const [value, setValue] = useState('');

  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });
  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };
  const { Panel } = Collapse;
  const { TextArea } = Input;
  const contentreturn = (
    <div>
      <div className="revenue_drawn_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={refresh} />
        </span>
        <h5>Return this amount</h5>
      </div>
    </div>
  );
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
        <h5>Delete project</h5>
      </div>
    </div>
  );
  const payementhistorydata = [
    {
      name: "Child in need",
      date: "started on: 05 June 2022",
      Giftaid: "£ 05",
      Appfee: "£ 10",
      Donation: "£ 75",
    },
    {
      name: "Child in need",
      date: "started on: 05 June 2022",
      Giftaid: "£ 05",
      Appfee: "£ 10",
      Donation: "£ 75",
    },
    {
      name: "Child in need",
      date: "started on: 05 June 2022",
      Giftaid: "£ 05",
      Appfee: "£ 10",
      Donation: "£ 75",
    },
    {
      name: "Child in need",
      date: "started on: 05 June 2022",
      Giftaid: "£ 05",
      Appfee: "£ 10",
      Donation: "£ 75",
    },
    {
      name: "Child in need",
      date: "started on: 05 June 2022",
      Giftaid: "£ 05",
      Appfee: "£ 10",
      Donation: "£ 75",
    },
  ];
  return (
    <>
      <div className="total_payment_history">
        <div className="revenue_page_payment">
          <div className="revenue_content_payment">
            <div className="revenue_img_payment">
              <Image src={revenue} alt="revenue" />
            </div>
            <div className="revenue_detail_payment">
              <h2 className="project_title_revenue_payment">
                Created by: {carddetail?.name}
              </h2>
              <p className="project_date_revenue_payment">
                Created on: {carddetail?.start_date}
              </p>
              <Button className="pockets_medico_button_payment">
                {carddetail?.project_category?.name}
              </Button>
              <div className="days_left_tag_payment">
                <Tag color="green" className="days_left_revenue_payment">
                  <ClockCircleOutlined /> 32 days left
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
        <div className="total_data_payment">
          <div className="payment_history_lists">
            <Input
              className="input_height_comment"
              placeholder="Type to search or @ to mention..."
            />
            <Image
              loader={sanityIoImageLoader}
              alt="image"
              src={commentsearch}
            />
          </div>

          {payementhistorydata?.map((paymentdata) => {
            return (
              <>
                <Collapse bordered={false} ghost>
                  <Panel
                    showArrow={false}
                    header={
                      <div className="payment_history_list_items">
                        <div className="payment_history_list_items_img">
                          <Image src={payment_user} alt="maximize" />
                        </div>
                        <div className="payment_history_list_name">
                          <h5>{paymentdata?.name}</h5>
                          <p>{paymentdata?.date}</p>
                        </div>
                        <div>
                          <ul className="list_order">
                            <li>
                              Gift-aid -
                              <span className="list_order_color">
                                {" "}
                                {paymentdata?.Giftaid}
                              </span>
                            </li>
                            <li>
                              App fee -{" "}
                              <span className="list_order_color">
                                {" "}
                                {paymentdata?.Appfee}
                              </span>
                            </li>
                            <li>
                              Donation -
                              <span className="list_order_color">
                                {paymentdata?.Donation}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="popover_payment">
                          <Popover
                            placement="bottomRight"
                            content={contentreturn}
                            trigger="click"
                          >
                            <MoreOutlined />
                          </Popover>
                        </div>
                      </div>
                    }
                    key="1"
                  >
                    <div className="return_amnt">
                      <h6>Reason</h6>
                      <TextArea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter reason for retaking amount"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                      <div className="return_amnt_btns">
                        <Button className="return_amnt_btns_cancel">Cancel</Button>
                        <Button className="return_amnt_btns_return">Return</Button>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Paymenthistory;
