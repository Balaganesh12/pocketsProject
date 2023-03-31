import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
// import noti from '../assets/images/noti.png'
import maximize from "./../../assets/images/maximize.png";
import NotificationImage from "./../../assets/images/noti.png";
import backside_arrow from "../../assets/images/rightsidearrow.svg";
const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
};

const NotificationBar: React.FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div className="sideBar">
        <div className="notificationDiv">
          <div className="notification_head">
            <p className="notificationHeader">Notifications</p>
            <Image loader={sanityIoImageLoader} alt="image" src={maximize} />
          </div>

          <div className="notificatioinsDiv">
            <div className="notificatioins">
              <Image
                loader={sanityIoImageLoader}
                alt="image"
                src={NotificationImage}
              />
              <div className="notificatioinsCommentContent">
                <ul>
                  <p className="notifications_comment">
                    <b>Janie, soni &</b> 2 others commented in your post{" "}
                    <b>“Food Distribution”</b>
                  </p>
                </ul>
              </div>
              {/* <div className="notificatioinsCommentTIme">(2hr ago)</div> */}
            </div>
            <div className="notificatioins">
              <Image
                loader={sanityIoImageLoader}
                alt="image"
                src={NotificationImage}
              />
              <div className="notificatioinsCommentContent">
                <ul>
                  <p className="notifications_comment">
                    <b>Janie, soni &</b> 2 others commented in your post{" "}
                    <b>“Food Distribution”</b>
                  </p>
                </ul>
              </div>
              {/* <div className="notificatioinsCommentTIme">(2hr ago)</div> */}
            </div>
            <div className="notificatioins">
              <Image
                loader={sanityIoImageLoader}
                alt="image"
                src={NotificationImage}
              />
              <div className="notificatioinsCommentContent">
                <ul>
                  <p className="notifications_comment">
                    <b>Janie, soni &</b> 2 others commented in your post{" "}
                    <b>“Food Distribution”</b>
                  </p>
                </ul>
              </div>
              {/* <div className="notificatioinsCommentTIme">(2hr ago)</div> */}
            </div>
            <div className="notificatioins">
              <Image
                loader={sanityIoImageLoader}
                alt="image"
                src={NotificationImage}
              />
              <div className="notificatioinsCommentContent">
                <ul>
                  <p className="notifications_comment">
                    <b>Janie, soni &</b> 2 others commented in your post{" "}
                    <b>“Food Distribution”</b>
                  </p>
                </ul>
              </div>
              {/* <div className="notificatioinsCommentTIme">(2hr ago)</div> */}
            </div>
            {/* <div className="back_side_arrow">
              <Image
                loader={sanityIoImageLoader}
                src={backside_arrow}
                alt="backsidearrow"
              />
            </div> */}
          </div>
        </div>

        <div className="showCase">
          <h2 className="calTag">Calendar</h2>
          <div className="calender">
            <Calendar onChange={setDate} value={date} />
          </div>
          <div className="details">
            {/* {date.toDateString()} */}
            <span className="notification_date">
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </span>
            <p className="pockets_notifications_general">
              <label className="notification_link"> General </label>
              <span className="packets_notifications">project end date</span>
            </p>
            <p className="pockets_notification_distribution">
              <label className="notification_link">Food Distribution</label>
              <span className="packets_notifications"> project end date</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default NotificationBar;
