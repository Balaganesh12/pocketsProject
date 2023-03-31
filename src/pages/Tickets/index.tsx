import { authProtected } from "../../components/protected-route";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input, Form, Row, Col, Button, Popover } from "antd";
import Image from "next/image";
import newmail from "../../assets/images/newmail.svg";
import childneed from "../../assets/images/childneed.svg";
import messagereply from "../../assets/images/messagereply.svg";
import ticket_message from "../../assets/images/ticket_message.svg";
import dot_messageuser from "../../assets/images/dot_messageuser.svg";
import dot_ticket_tick_circle from "../../assets/images/dot_ticket_tick_circle.svg";
import dot_ticket_del from "../../assets/images/dot_ticket_del.svg";

import { EllipsisOutlined } from "@ant-design/icons";
import edit from "../../assets/images/edit.png";
import { Drawer } from "antd";
import arrow from "../../assets/images/arrow-left.png";
import Messageuser from "./Messageuser";
import Ticketdetail from "./Ticketdetail";
import { GET_REPORT } from "../../helpers/queries";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

export const ticket: React.FC = () => {
  const [tabdata, setTabdata] = useState("INPROGRASS");
  const [opened, setOpened] = useState(null);
  const [reportData, setReportData] = useState();
  const [inprograss, setInprograss] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [fullreport, setFullreport] = useState([]);
  const [listReportData, setListReportData] = useState([]);


  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };


  const {
    error: reportError,
    loading: reportLoading,
    data: dataReport,
    refetch: refetcReport,
  } = useQuery(GET_REPORT, {
    variables: {},
  });
  console.log(dataReport, "dataReport");

  let reportdatas = dataReport?.mst_post_report;

  console.log(reportdatas, "reportdatas");


  useEffect(() => {
    if (dataReport?.mst_post_report) {
      let ReportDatas = dataReport?.mst_post_report;

      console.log(ReportDatas, "ReportDatas");


      let filterinprograss = ReportDatas.filter((data) => data?.status === "INPROGRASS")
      console.log(filterinprograss, "filterinprograss");
      setInprograss(filterinprograss)


      let filtercompleted = ReportDatas.filter((data) => data?.status === "COMPLETED")
      setCompleted(filtercompleted);

      setFullreport(filterinprograss);

      setListReportData(ReportDatas);

    }
  }, [dataReport]);

  useEffect(() => {
    if (fullreport) {
      setListReportData(fullreport)
    }
  }, [fullreport])

  useEffect(() => {
    if (tabdata === "INPROGRASS") {
      setListReportData(inprograss)
    } else {
      setListReportData(completed)
    }
  }, [tabdata])
  const content = (
    <div>
      <div className="More_list_project">
        <span>
          <Image
            loader={sanityIoImageLoader}
            alt="image"
            src={dot_messageuser}
          />
        </span>
        <h5 onClick={() => setOpened("Messageuser")}>Message user</h5>
      </div>

      <div className="More_list_project">
        <span>
          <Image
            loader={sanityIoImageLoader}
            alt="image"
            src={dot_ticket_tick_circle}
          />
        </span>
        <h5>Mark as Completed</h5>
      </div>

      <div className="More_list_project">
        <span>
          <Image
            loader={sanityIoImageLoader}
            alt="image"
            src={dot_ticket_del}
          />
        </span>
        <h5>Delete</h5>
      </div>
    </div>
  );
  const handleReport = (report: any) => {
    setReportData(report);
    setOpened("Ticketdetail");
  }
  return (
    <div>
      <div className="total_inbox">
        <div className="inbox_tittle">
          <div>
            <h1>Tickets</h1>
          </div>
        </div>

        <div className="search-inboxPage">
          <Form className="search-form">
            <input type="text" />
            <Button>
              <FiSearch style={{ fontSize: "30px" }} />
            </Button>
          </Form>
        </div>

        <div className="tabs_header_ticket">
          <ul className="tab_header_content_ticket">
            <li
              className={tabdata === "INPROGRASS" ? "active" : ""}
              onClick={() => setTabdata("INPROGRASS")}
            >
              New Tickets
              <span className={tabdata === "INPROGRASS" ? "active" : "tab_count"}>
                {inprograss?.length}
              </span>
            </li>
            <li
              className={tabdata === "COMPLETED" ? "active" : ""}
              onClick={() => setTabdata("COMPLETED")}
            >
              Completed
              <span className={tabdata === "COMPLETED" ? "active" : "tab_count"}>
                {completed?.length}
              </span>
            </li>
          </ul>
        </div>

        <div className="inboxInnerContainer">
          {listReportData?.map((report) => {
            console.log(report, "report")
            let ngocreatedate = moment(report?.mst_ngo?.created_at).format('YYYY-MM-D');
            return (
              <div className="inbox-comments">
                <div className="inbox-commentsContent">
                  <div className="inbox_list">
                    <span>
                      <Image
                        src={childneed}
                        alt="childneed"
                        loader={sanityIoImageLoader}
                      />
                    </span>

                    <div>
                      <h5>{report?.mst_ngo?.name}</h5>
                      <h6>{ngocreatedate}</h6>
                    </div>
                  </div>

                  <div className="ticket_list_item">
                    <span>
                      <Image
                        src={ticket_message}
                        loader={sanityIoImageLoader}
                        alt="ticket"
                      />
                    </span>
                    <h5
                      className="inbox_list_item_list"
                      onClick={() => handleReport(report)}
                    >
                      {report?.mst_report_options?.option_name}
                    </h5>
                  </div>

                  <div className="message_popover">
                    <Popover
                      placement="bottomRight"
                      content={content}
                      trigger="click"
                    >
                      <EllipsisOutlined />
                    </Popover>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <Drawer
          placement="right"
          open={opened?.length > 1 ? true : false}
          closable={false}
          onClose={() => setOpened(false)}
          title={
            <div className="create_project_sec">
              <Image
                loader={sanityIoImageLoader}
                alt="image"
                src={arrow}
                width="25"
                style={{ cursor: "pointer" }}
                onClick={() => setOpened(false)}
              />
              {opened === "Ticketdetail" ? <h2>Ticket Details</h2> : <></>}
              {opened === "Messageuser" ? <h2>Message user</h2> : <></>}
            </div>
          }
          width="700px"
        >
          {opened === "Ticketdetail" ? (
            <>
              <Ticketdetail ReportDatas={reportData} />
            </>
          ) : (
            <></>
          )}

          {opened === "Messageuser" ? (
            <>
              <Messageuser />
            </>
          ) : (
            <></>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default authProtected(ticket);
