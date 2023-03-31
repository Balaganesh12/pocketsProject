import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { authProtected } from "../../components/protected-route";
import { Input, Form, Row, Col, Button, Popover, Drawer } from "antd";
import Image from "next/image";
import newmail from "../../assets/images/newmail.svg";
import childneed from "../../assets/images/childneed.svg";
import messagereply from "../../assets/images/messagereply.svg";
import forward from "../../assets/images/message-edit.svg"
import bin from "../../assets/images/message-bin.svg";
import mark from "../../assets/images/mark.svg";
import archieve from "../../assets/images/eye-slash.svg";
import recycle from "../../assets/images/trash1.svg";
import { ADMIN_INBOX } from '../../helpers/queries'
import { useQuery } from "@apollo/client";
import moment from "moment";
import arrow from "../../assets/images/arrow-left.svg";
import Replay from '../inbox/replay'
import inboxpopover from "../assets/images/inboxpopover.svg";

import { EllipsisOutlined } from "@ant-design/icons";

export const InboxPage: React.FC = () => {
  const [tabdata, setTabdata] = useState("ALL");
  const [opened, setOpened] = useState(null);

  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };

  const {
    error: inboxError,
    loading: inboxLoading,
    data: dataInbox,
    refetch: refetchInbox,
  } = useQuery(ADMIN_INBOX, {
    variables: {
    },
  });

  console.log(dataInbox,'dataInbox')

  

  const content = (
    <div className={opened ? "popover_display" : ""}>
    <div className="More_list_inbox">
      <span>
        <Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={forward} />
      </span>
      <h5>Forward</h5>
    </div>

    <div className="More_list_inbox">
        <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={bin} /></span>
        <h5>Move to bin</h5>
      </div>

    <div className="More_list_inbox">
      <span>
        <Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={mark}
        />
      </span>
      <h5>Mark as read</h5>
    </div>

    <div className="More_list_inbox">
      <span>
        <Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={archieve}
        />
      </span>
      <h5>Archieve</h5>
    </div>

    <div className="More_list_inbox">
      <span>
        <Image
          loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={recycle}
        />
      </span>
      <h5>Delete</h5>
    </div>
  </div>
  );
  return (
    <div className="total_inbox">
      <div className="inbox_tittle">
        <div>
          <h1>Inbox</h1>
        </div>

        <div className="new_mail_btn">
          <Button>
            <div className="newmail_icon">
              <Image loader={sanityIoImageLoader} src={newmail} alt="newmail" />
            </div>
            New mail
          </Button>
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

      <div className="tabs_header">
        <ul className="tab_header_content">
          <li
            className={tabdata === "RECEIVED" ? "active" : ""}
            onClick={() => setTabdata("RECEIVED")}
          >
            Received
            <span
              className={tabdata === "RECEIVED" ? "active" : "tab_count"}
            >12</span>
          </li>
          <li
            className={tabdata === "SENT" ? "active" : ""}
            onClick={() => setTabdata("SENT")}
          >
            Sent{" "}
            <span
              className={tabdata === "SENT" ? "active" : "tab_count"}
            >78</span>
          </li>
          <li
            className={tabdata === "ARCHIVED" ? "active" : ""}
            onClick={() => setTabdata("ARCHIVED")}
          >
            Archived
            <span
              className={tabdata === "ARCHIVED" ? "active" : "tab_count"}
            >0</span>
          </li>
          <li
            className={tabdata === "DRAFT" ? "active" : ""}
            onClick={() => setTabdata("DRAFT")}
          >
            Draft{" "}
            <span
              className={tabdata === "DRAFT" ? "active" : "tab_count"}
            >0</span>
          </li>
          <li
            className={tabdata === "BIN" ? "active" : ""}
            onClick={() => setTabdata("BIN")}
          >
            Bin
            <span
              className={tabdata === "BIN" ? "active" : "tab_count"}
            >7</span>
          </li>
        </ul>
      </div>
      
     <div className="inboxInnerContainer">
     {dataInbox?.mst_inbox?.map((inbox)=>{
        let createdAt = inbox?.created_at
        let formatdate = moment(createdAt).format("MMM YYYY");
        
        return <div className="inbox-comments">
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
                <h5>{inbox?.userByUser?.displayName}</h5>
                <h6>{formatdate}</h6>
              </div>
            </div>

            <ul className="inbox_list_item">
              <li className="inbox_list_item_list">
               {inbox?.message}
              </li>
              {/* <li className="inboxCommentTime">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate ...
              </li> */}
            </ul>

            <div className="messagereply">
              <Image
                src={messagereply}
                loader={sanityIoImageLoader}
                alt="messagereply"
                onClick={()=>setOpened("replay")}
                style={{ cursor: "pointer" }}    
              />
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
         })}

<Drawer
        open={opened?.length > 1 ? true : false}
        onClose={() => setOpened(null)}
        width={opened === "comment" ? 550 : 650}
        placement="right"
        closable={false}
        title={
          <div className="create_post_sec">
            <Image
              loader={sanityIoImageLoader}
              alt="image"
              src={arrow}
              width="25"
              style={{ cursor: "pointer" }}
              onClick={() => setOpened(null)}
            />
            {opened === "replay" ? <h2>Replay User</h2> : <></>}
          </div>
        }
      >
        {opened === "replay" ? (
          <>
            <Replay/>
          </>
        ) : (
          <></>
        )}
      </Drawer>
      </div>

     
      {/* <NotificationBar/>
                <CreateAcc/> */}
    </div>
  );
};
export default authProtected(InboxPage);
