import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Progress,
  Drawer,
  Select,
  Modal,
  Divider,
  Carousel,
  Popover,
  Tag,
  Empty,
  Checkbox,
} from "antd";
import { useRouter } from "next/router";
import Profileimg from "../../../public/charityprofile.png";
import Image from "next/image";
import Profileuser from "../../../public/profileuser.png";
import EditButton from "../../assets/images/edit.svg";
import Statusred from "../../assets/images/statusred.png";
import Statusgreen from "../../assets/images/statusgreen.png";
import CharityGraph from "../../assets/images/charitygraph.png";
import Project from "../project/index";
import CreateNgo from "./createngo";
import CharityFollower from "./charityFollower";
import arrow from "../../assets/images/arrow-left.svg";
import downarrow from "../../assets/images/downarrow.svg";
import info from "../../assets/images/info.png";
import done from "../../assets/images/tick-circle.png";
import { useQuery, useMutation } from "@apollo/client";
import arrowup from "../../assets/images/arrow-up.svg";
import arrowdown from "../../assets/images/arrow-down.svg";
import Sliderleft from "../../assets/images/arrow-circle-left.png";
import Sliderright from "../../assets/images/arrow-circle-right.png";
import {
  GET_BYID_NGO,
  GET_PROJECT,
  EDIT_PROJECT,
  CHARITY_POST,
  CHARITY_TRANSACTION,
  GET_BYID_PROJECT,
  NGO_USER,
  EDIT_POST,
  NGO_FOLLOWER,
  ADMIN_TRANSACTION,
  GET_TRANSACTION_AMOUNT
} from "../../helpers/queries";
import { authProtected } from "../../components/protected-route";
import {
  MoreOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  RightOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import edit from "../../assets/images/edit.png";
import moment from "moment";
import eyeslash from "../../assets/images/import.svg";
import ticket from "../../assets/images/postImage/ticket.svg";
import receipt from "../../assets/images/receipt.svg";
import Message from "../../assets/images/postImage/message-svg.svg";
import Repeat from "../../assets/images/postImage/repeat.svg";
import Trend from "../../assets/images/postImage/trend-up-svg.svg";
import LIKE from "../../assets/images/postImage/wishlist-svg.svg";
import trash from "../../assets/images/trash1.svg";
import CreateProject from "../project/Createproject";
import Revenue from "./charityrevenue";
import CreatePost from "../post/Createpost";
import RaiseTicket from "../post/Raiseticket";
import { useUserData } from "@nhost/nextjs";
import tickcircle from "../../assets/images/tick-circle.svg";
import Repost from "../post/Repost";
import Commentpost from "../post/Commentpost";
import PostLike from "../post/Postlike"; 
import { Form } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
 
const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
};
const stripePromise = loadStripe('pk_test_51MhQKaSHtnJU4gMotYVHpY8UOOYdVw4Sh4KZXEs9XtA4OhYIsKYUbqPYLo7Czwf9VDZs0uD1bvqK7RMCgvZPsYfF00NZIPV3YX');

export const charityDashboard: React.FC<any[]> = () => {
  const router = useRouter();
  const user = useUserData();
  const [tabdata, setTabdata] = useState("Info");
  const [opened, setOpened] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ispayment, setPayment] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [createData, setCreatedata] = useState();
  const [selectedCreate, setSelectedCreate] = useState();
  const [selectedPost, setSelectedPost] = useState();
  const [postLikedata, setPostLikedata] = useState();
  const [postCommentId, setPostCommentId] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const [totalCollectAmount, setTotalCollectAmount] = useState<any>(0);
  const [hideArchive, sethideArchiveModal] = useState(false);
  const [unhideArchive, setUnhideArchiveModal] = useState(false);
  const [postEditModal, setpostEditModal] = useState(false);
  const [charityEditModal, setcharityEditModal] = useState(false);
  const [deactivate, setdeactivate] = useState(false);
  const [postcreateModal, setpostcreateModal] = useState(false);
  const [fullProjectlist, setFullProjectlist] = useState([]);
  const [completedProject, setCompletedProject] = useState([]);
  const [archivedProject, setArchivedProject] = useState([]);
  const [liveProject, setLiveProject] = useState([]);
  const [charityId, setCharityId] = useState(null);
  const [charityFollower, setCharityFollower] = useState(null);
  const [charityDetail, setCharityDetail] = useState(null);
  const [infoDetails, setInfodetails] = useState(null);
  const [repost, setRepost] = useState<any>([]);
  const [collectedAmount, setCollectedAmount] = useState(null);
  const [formatdatee, setFormatDate] = useState<any>([]);
  const [filtered, setFiltered] = useState<any>([]);
  console.log(filtered,"filtered");
  
  const [transationamount, settransationamount] = useState<any>([]);
  console.log(transationamount,"transationamount");

  const [payment, setPaymentCollected] = useState<any>([]);
  console.log(payment,"payment");
  
  const [clientSecret, setClientSecret] = React.useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    setCharityId(router.query.slug);
    let url = router.query.slug;
    if (url) {
      let urlQuery = url?.['split']("-");
      if (urlQuery[5] === "Payment") {
        setTabdata("Payment");
      }
    }
  }, [router.query.slug]);

  const {
    error: transactionError,
    loading: transactionLoading,
    data: dataTransaction,
    refetch: refetchTransaction,
  } = useQuery(CHARITY_TRANSACTION, {
    variables: {
      ngo_id: charityId,
    },
  });

  const {
    error: adminError,
    loading: adminLoading,
    data: dataAdmin,
    refetch: refetchadmin,
  } = useQuery(ADMIN_TRANSACTION, {
    variables: {
      to: charityId,
    },
  });

  useEffect(()=>{
    if(dataAdmin){
      let latestdate = new Date(Math.max.apply(null, dataAdmin?.mst__admin_transaction?.map(function (e: any) {
        return new Date(e?.transfer_date);
      })));
      let formatdate = moment(latestdate).format("YYYY-MM-DD");
      setFormatDate(formatdate);
    }},[dataAdmin])

 useEffect(()=>{
  if(dataTransaction){
    let gettransactionamount = dataTransaction?.mst__transactions?.map((transfergetamount) =>{
      return transfergetamount?.total_amount
    })?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    settransationamount(gettransactionamount)

    let transactiondate = dataTransaction?.mst__transactions?.map((transferdata: any) => {
      return transferdata?.transaction_date
    })
    setFiltered(transactiondate)
  }},[dataTransaction])

  const filteredArr = filtered?.filter((val: any) => val?.includes(formatdatee))
  console.log(filteredArr,"filteredArr");
  

   const {
    error: transactionamountError,
    loading: transactionamountLoading,
    data: dataTransactionamount,
    refetch: refetchtransactionamount,
  } = useQuery(GET_TRANSACTION_AMOUNT, {
    variables: {
      transaction_date : filteredArr?.[0],
    },
  });
  
useEffect(()=>{
  if(dataTransactionamount){
    let PaymentAmount = dataTransactionamount?.mst__transactions?.map((datatransfer)=>{
      return datatransfer?.total_amount
    })?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setPaymentCollected(PaymentAmount)
  }},[dataTransactionamount])


  useEffect(() => {
    if (dataAdmin) {
      let monthcollectedamount = dataAdmin?.mst__admin_transaction?.map((collectedamont) => {
        return collectedamont?.donation_amount
      })?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setCollectedAmount(monthcollectedamount);
    }
  }, [dataAdmin])


  const {
    error: ngoError,
    loading: ngoLoading,
    data: dataNgo,
    refetch: refetchNgo,
  } = useQuery(GET_BYID_NGO, {
    variables: {
      id: charityId,
    },
  });

  useEffect(() => {
    if (dataNgo) {
      setCharityDetail(dataNgo?.mst__ngos[0]);
      let charitytotalamount = dataNgo?.mst__ngos[0]?.mst__transactions
        ?.map((totalamount) => {
          return totalamount?.total_amount;
        })
        ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      let charitygiftaid = dataNgo?.mst__ngos[0]?.mst__transactions
        ?.map((totalgiftaid) => {
          return totalgiftaid?.gift_aid_amount;
        })
        ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      let charityappfee = dataNgo?.mst__ngos[0]?.mst__transactions
        ?.map((totalappfee) => {
          return totalappfee?.app_fee_amount;
        })
        ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      let collectedAmount = {
        charitytotalamount,
        charitygiftaid,
        charityappfee,
      };
      setInfodetails(collectedAmount);
    }
  }, [dataNgo]);

  const {
    error: userError,
    loading: userLoading,
    data: charityfollower,
    refetch: refetchNgoUser,
  } = useQuery(NGO_FOLLOWER, {
    variables: {
      followee_id: charityId,
    },
  });

  useEffect(() => {
    if (charityfollower) {
      setCharityFollower(charityfollower?.map_user_follow);
    }
  }, [charityfollower]);



  let transactiondetail = dataTransaction?.mst__transactions?.map(
    (transadata) => {
      return transadata?.mst__projects;
    }
  );

  let transactiondata = dataTransaction?.mst__transactions
    ?.map((data) => data?.total_amount)
    ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  useEffect(() => {
    setTotalCollectAmount(transactiondata);
  }, [transactiondata]);

  let transactionamount = transactiondata - 0;

  const showpaymentModal = (data: any) => {
    setPayment(true);
    setTotalAmount(data ?? 0);
    setIsModalOpen(false);
    setTotalCollectAmount(0);
  };

  const handlepaymentOk = () => {
    setPayment(false);
  };

  const handlepaymentCancel = () => {
    setPayment(false);
    setIsModalOpen(false);
  };

  const hideArchiveModal = () => {
    sethideArchiveModal(true);
  };

  const hideArchiveCancel = () => {
    sethideArchiveModal(false);
  };

  const unhideArchiveModal = () => {
    setUnhideArchiveModal(true);
  };

  const unhideArchiveCancel = () => {
    setUnhideArchiveModal(false);
  };

  const [
    editCreate,
    { loading: contactloading, error: contacterror, data: contactdataAddress },
  ] = useMutation(EDIT_PROJECT, {
    errorPolicy: "all",
  });

  const handleRevenue = (createdata: any) => {
    setOpened("Revenue");
    setCreatedata(createdata);
  };

  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });

  const {
    error: projectidError,
    loading: projectidLoading,
    data: dataidProject,
    refetch: refetchidProject,
  } = useQuery(GET_BYID_PROJECT, {
    variables: {
      ngo_id: charityId,
    },
  });

  useEffect(() => {
    if (dataidProject) {
      setFullProjectlist(dataidProject?.mst__projects);

      let filterCompletedProject = dataidProject?.mst__projects?.filter(
        (data) => {
          return moment().isAfter(data.close_date, "day") && data.is_active;
        }
      );
      setCompletedProject(filterCompletedProject);

      let filteredArchivedProject = dataidProject?.mst__projects?.filter(
        (data) => {
          return !data.is_active;
        }
      );
      setArchivedProject(filteredArchivedProject);

      let filteredLiveProject = dataidProject?.mst__projects?.filter((data) => {
        return moment().isBefore(data.close_date, "day") && data.is_active;
      });
      setLiveProject(filteredLiveProject);
    }
  }, [dataidProject]);

  const {
    error: charityPostError,
    loading: charityPostLoading,
    data: dataPostCharity,
  } = useQuery(CHARITY_POST, {
    variables: {
      ngo_id: charityId,
    },
  });

  const {
    error: ngopostError,
    loading: ngopostLoading,
    data: ngoData,
    refetch: refetchngo,
  } = useQuery(NGO_USER, {
    variables: {
      id: user?.id,
    },
  });

  const archiveTheProject = () => {
    let projectObject = JSON?.parse(JSON.stringify(selectedCreate));
    projectObject.is_active = false;
    editCreate({
      variables: projectObject,
    }).then((response) => {
      if (response.errors) {
        sethideArchiveModal(false);
      } else {
        sethideArchiveModal(false);
        refetchProject();
      }
    });
  };

  const unarchiveTheProject = () => {
    let projectObject = JSON.parse(JSON.stringify(selectedCreate));
    projectObject.is_active = true;
    editCreate({
      variables: projectObject,
    }).then((response) => {
      if (response.errors) {
        setUnhideArchiveModal(false);
      } else {
        setUnhideArchiveModal(false);
        refetchProject();
        setTabdata("ALL");
      }
    });
  };

  useEffect(() => {
    if (dataNgo) {
      setProjectData(dataNgo?.mst__ngos[0]);
    }
  }, [dataNgo]);

  let received_amnt = dataProject?.mst__transactions;
  const closeDateValue = (closedate) => {
    var eventdate = moment(closedate);
    var todaysdate = moment();
    return eventdate.diff(todaysdate, "days");
  };

  const handelLike = (postLike: any) => {
    setOpened("postlike");
    setPostLikedata(postLike);
  };

  const handleComment = (postComment: any) => {
    setOpened("comment");
    setPostCommentId(postComment);
  };

  const closeModal = (status) => {
    setOpened(status);
  };

  const clickEditModal = () => {
    setpostEditModal(true);
  };

  const charityDeactivate = () => {
    setdeactivate(true);
  }

  const clickCharityModal = () => {
    setcharityEditModal(true);
  };

  const charityEditOkModal = () => {
    setcharityEditModal(false);
  };

  const [editPost, { loading: loading, error: error, data: dataAddress }] =
    useMutation(EDIT_POST, {
      errorPolicy: "all",
    });

  const archiveThePost = () => {
    let postObject = JSON.parse(JSON.stringify(selectedPost));
    const ngoId = ngoData?.mst__ngos.map((data) => {
      return data?.id;
    });
    postObject.is_active = false;
    postObject.ngo_id = ngoId?.toString();
    postObject.amount_received = 10;
    postObject.amount_targeted = 10;
    postObject.created_by = "Admin";
    editPost({
      variables: postObject,
    }).then((response) => {
      if (response.errors) {
        sethideArchiveModal(false);
      } else {
        sethideArchiveModal(false);
        // refetchPost();
      }
    });
  };

  const unarchiveThePost = () => {
    let postObject = JSON.parse(JSON.stringify(selectedPost));
    const ngoId = ngoData?.mst__ngos.map((data) => {
      return data?.id;
    });
    postObject.is_active = true;
    postObject.ngo_id = ngoId?.toString();
    postObject.amount_received = 10;
    postObject.amount_targeted = 10;
    postObject.created_by = "Admin";
    editPost({
      variables: postObject,
    }).then((response) => {
      if (response.errors) {
        setUnhideArchiveModal(false);
      } else {
        setUnhideArchiveModal(false);
        // refetchPost();
      }
    });
  };

  const charitycontent = (
    <div className={opened ? "popover_display" : ""}>
      <div className="More_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={edit} />
        </span>
        <h5 onClick={() => setOpened("edit")}>Edit this charity</h5>
      </div>

      <div className="More_list">
        <span>
          <Image
            loader={sanityIoImageLoader}
            alt="image"
            className="items_list_logo"
            src={trash}
          />
        </span>
        <h5 onClick={charityDeactivate}>Deactivate this charity</h5>
      </div>
    </div>
  );

  const content = (
    <div className={opened ? "popover_display" : ""}>
      <div className="More_list">
        <span>
          <Image
            loader={sanityIoImageLoader}
            alt="image"
            className="items_list_logo"
            src={receipt}
          />
        </span>
        <h5 onClick={() => setOpened("Revenue")}>Revenue details</h5>
      </div>
      <div className="More_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={edit} />
        </span>
        <h5 onClick={() => setOpened("editproject")}>Edit content</h5>
      </div>
      <div className="More_list">
        <span>
          <Image
            loader={sanityIoImageLoader}
            alt="image"
            className="items_list_logo"
            src={eyeslash}
          />
        </span>
        <h5 onClick={hideArchiveModal}>Archive this project</h5>
      </div>
      <div className="More_list">
        <span>
          <Image
            loader={sanityIoImageLoader}
            alt="image"
            className="items_list_logo"
            src={trash}
          />
        </span>
        <h5>Delete project</h5>
      </div>
    </div>
  );

  const postcontent = (
    <div className={opened ? "popover_display" : ""}>
      <div className="More_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={edit} />
        </span>
        <h5 onClick={() => setOpened("editpost")}>Edit this post</h5>
      </div>

      {/* <div className="More_list">
          <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={eyeslash} /></span>
          <h5
            onClick={hideArchiveModal}
          >Hide this post</h5>
        </div> */}

      <div className="More_list">
        <span>
          <Image
            loader={sanityIoImageLoader}
            alt="image"
            className="items_list_logo"
            src={ticket}
          />
        </span>
        <h5 onClick={() => setOpened("raiseticket")}>Raise a ticket</h5>
      </div>
    </div>
  );

  const handleChange = (value: string) => { };

  const clickDrawn = () => {
    setOpened(false);
  };

  const clickModal = () => {
    setpostcreateModal(true);
  };

  const postOkModal = () => {
    setpostcreateModal(false);
  };

  const projectEditOkModal = () => {
    setpostEditModal(false);
  };

  const handleRepost = (postrepost: any) => {
    setOpened("repost");
    setRepost(postrepost);
  };

  const { success, canceled } = router.query;

  useEffect(() => {
    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
  }, [success, canceled]);

  return (
    <div className="charity_main_dashboard">
       {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <div className="charity_dashboard">
        <Row>
          <Col span={12}>
            <div style={{ display: "flex" }}>
              <Image
                loader={sanityIoImageLoader}
                alt="image"
                src={arrow}
                width="40"
                height="40"
                style={{ cursor: "pointer" }}
                onClick={() => router.replace("/charity")}
              />
              <h3>{charityDetail?.name}</h3>
            </div>
          </Col>
          <Col span={12}>
            <div>
              {tabdata === "Payment" ? (
                <div className="payment_select">
                  {" "}
                  <Select
                    suffixIcon={
                      <div className="select_arrow">
                        {" "}
                        <Image
                          className="payment_charity_select"
                          src={downarrow}
                          alt="downarrow"
                        />{" "}
                      </div>
                    }
                    className="charity_add_button"
                    placeholder="This month"
                    options={[
                      { value: "This month", label: "This month" },
                      { value: "This year", label: "This year" },
                      { value: "This week", label: "This week" },
                      { value: "Last month ", label: "Last month" },
                      { value: "Last 3 month", label: "Last 3 month" },
                    ]}
                  ></Select>
                </div>
              ) : (
                <></>
              )}
              {tabdata === "Project" ? (
                <div className="project_charity_select">
                  <Select
                    suffixIcon={
                      <div className="select_arrow">
                        <p className="charity_select_counter">0</p>{" "}
                        <Image src={downarrow} alt="downarrow" />
                      </div>
                    }
                    className="input_height_charity filter_dropdown"
                    placeholder="Filter project by"
                    options={[
                      {
                        value: "Recently uploaded",
                        label: "Recently uploaded",
                      },
                      { value: "Highly Reached", label: "Highly Reached" },
                      { value: "Top 10", label: "Top 10" },
                      { value: "High Comments", label: "High Comments" },
                    ]}
                  ></Select>

                  <Button
                    type="ghost"
                    className="create_new_charity_btn"
                    onClick={() => setOpened("createproject")}
                  >
                    {" "}
                    <PlusOutlined /> Create new project{" "}
                  </Button>
                </div>
              ) : (
                <></>
              )}
              {tabdata === "Post" ? (
                <div className="post_charity_select">
                  <Select
                    suffixIcon={
                      <div className="select_arrow">
                        <p className="charity_select_counter">0</p>{" "}
                        <Image src={downarrow} alt="downarrow" />
                      </div>
                    }
                    className="input_height_charity filter_dropdown"
                    placeholder="Filter post by"
                    options={[
                      { value: "Top post", label: "Top post" },
                      { value: "New post", label: "New post" },
                      { value: "High Comments", label: "High Comments" },
                    ]}
                  ></Select>

                  <Button
                    type="ghost"
                    className="create_new_charity_btn"
                    onClick={() => setOpened("createpost")}
                  >
                    {" "}
                    <PlusOutlined /> Create new post{" "}
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Col>
        </Row>
      </div>

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
            {opened === "edit" ? <h2>Charity details</h2> : <></>}
            {opened === "follower" ? <h2>Charity Followers</h2> : <></>}
            {opened === "createproject" ? <h2>Create Project</h2> : <></>}
            {opened === "editproject" ? <h2>Edit Project</h2> : <></>}
            {opened === "Revenue" ? <h2>Revenue</h2> : <></>}
            {opened === "createpost" ? <h2>Create Post</h2> : <></>}
            {opened === "editpost" ? <h2>Edit Post</h2> : <></>}
            {opened === "raiseticket" ? <h2>Raise Ticket</h2> : <></>}
            {opened === "repost" ? <h2>Repost</h2> : <></>}
            {opened === "comment" ? <h2>Comments</h2> : <></>}
            {opened === "postlike" ? <h2>Likes</h2> : <></>}
          </div>
        }
      >
        {opened === "edit" ? (
          <>
            <CreateNgo
              clickModal={clickCharityModal}
              closeModal={closeModal}
              ngodata={projectData}
              data={opened}
            />
          </>
        ) : (
          <></>
        )}
        {opened === "follower" ? (
          <>
            <CharityFollower />
          </>
        ) : (
          <></>
        )}
        {opened === "createproject" ? (
          <>
            <CreateProject
              createdata={null}
              clickDrawn={clickDrawn}
              charityId={charityId}
              clickModal={clickModal}
            />
          </>
        ) : (
          <></>
        )}
        {opened === "editproject" ? (
          <>
            <CreateProject
              createdata={selectedCreate}
              clickDrawn={clickDrawn}
              clickEditModal={clickEditModal}
            />
          </>
        ) : (
          <></>
        )}
        {opened === "Revenue" ? (
          <>
            <Revenue createdata={selectedCreate} />
          </>
        ) : (
          <></>
        )}
        {opened === "createpost" ? (
          <>
            <CreatePost
              postdata={null}
              closeModal={closeModal}
              charityId={charityId}
              clickModal={clickModal}
            />
          </>
        ) : (
          <></>
        )}
        {opened === "editpost" ? (
          <>
            <CreatePost
              postdata={selectedPost}
              closeModal={closeModal}
              clickEditModal={clickEditModal}
            />
          </>
        ) : (
          <></>
        )}
        {opened === "raiseticket" ? (
          <>
            <RaiseTicket />
          </>
        ) : (
          <></>
        )}
        {opened === "repost" ? (
          <>
            <Repost postrepost={repost} />
          </>
        ) : (
          <></>
        )}
        {opened === "comment" ? (
          <>
            <Commentpost postCommentId={postCommentId} />
          </>
        ) : (
          <></>
        )}
        {opened === "postlike" ? (
          <>
            <PostLike postLike={postLikedata} />
          </>
        ) : (
          <></>
        )}
      </Drawer>

      <div className="tabs_header">
        <ul className="tab_header_content">
          <li
            className={tabdata === "Info" ? "active" : ""}
            onClick={() => setTabdata("Info")}
          >
            Info
          </li>
          <li
            className={tabdata === "Payment" ? "active" : ""}
            onClick={() => setTabdata("Payment")}
          >
            Payment
          </li>
          <li
            className={tabdata === "Project" ? "active" : ""}
            onClick={() => setTabdata("Project")}
          >
            Project{""}
            <span className={tabdata === "Project" ? "active" : "tab_count"}>
              {fullProjectlist?.length}
            </span>
          </li>
          <li
            className={tabdata === "Post" ? "active" : ""}
            onClick={() => setTabdata("Post")}
          >
            Post{""}
            <span className={tabdata === "Post" ? "active" : "tab_count"}>
              {dataPostCharity?.mst_posts?.length}
            </span>
          </li>
          <li
            className={tabdata === "Archived" ? "active" : ""}
            onClick={() => setTabdata("Archived")}
          >
            Archived{""}
            <span className={tabdata === "Archived" ? "active" : "tab_count"}>
              {archivedProject?.length}
            </span>
          </li>
          <li
            className={tabdata === "Deleted" ? "active" : ""}
            onClick={() => setTabdata("Deleted")}
          >
            Deleted{""}
            <span className={tabdata === "Deleted" ? "active" : "tab_count"}>
              0
            </span>
          </li>
        </ul>
      </div>
      <div>
        {tabdata === "Info" ? (
          <>
            <Card className="charity_info"> </Card>
            <Card className="charity_details">
              <Row>
                <Col span={12}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "90px", marginTop: "-18px" }}>
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={Profileimg}
                        width={80}
                        height={86}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          color: "#252947",
                          fontSize: "14px",
                          margin: "-23px 0px 0px 16px",
                        }}
                      >
                        <h3 className="charity_info_details">
                          {charityDetail?.name}
                        </h3>
                      </div>

                      <div
                        style={{
                          marginTop: "-21px",
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "10px",
                        }}
                      >
                        <div>
                          <Image
                            loader={sanityIoImageLoader}
                            alt="image"
                            src={Profileuser}
                          />
                        </div>
                        <div className="charity_follower">
                          <h4 onClick={() => setOpened("follower")}>
                            {charityFollower?.length} <span>followers</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={4} offset={8}>
                  <div
                    style={{
                      margin: "0px 0px",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <div className="pockets_edit_icon">
                      <Popover placement="bottomRight" content={charitycontent} trigger="click">
                        <MoreOutlined />
                      </Popover>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>

            <Row
              justify="space-between"
              style={{ margin: "62px 0px", padding: "0px" }}
            >
              <Col span={7} style={{ padding: "0px" }}>
                <Card
                  style={{
                    padding: "0px",
                    marginRight: "-35px",
                    width: "115%",
                    height: "99%",
                  }}
                >
                  <div style={{ color: "#878787" }}>
                    <h4 className="charity_head">Total Collected Amount</h4>
                  </div>
                  <div style={{ color: "#252947", marginTop: "-6px" }}>
                    <h2 className="charity_amount">
                      £ {infoDetails?.charitytotalamount}
                    </h2>
                  </div>
                  <Progress
                    style={{ margin: "0px" }}
                    showInfo={false}
                    percent={100}
                    status="active"
                    strokeColor={{
                      from: "#252947",
                      to: "#7FACD6",
                    }}
                  />
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <h5 style={{ margin: "0px" }}>
                          <span className="collected_amount_active"></span>
                          <span className="charity_app_fee">App fee</span>
                          <span>(£{infoDetails?.charityappfee})</span>
                        </h5>
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div>
                        <h5 style={{ margin: "0px" }}>
                          <span className="collected_amount_success"></span>
                          <span className="charity_app_fee">Giftaid</span>
                          <span className="charity_gift_aid">
                            (£{infoDetails?.charitygiftaid})
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col span={5} style={{ marginRight: "12px", marginLeft: "38px" }}>
                <Card>
                  <div style={{ color: "#878787" }}>
                    <h4 className="charity_head">Total Project</h4>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ color: "#252947" }}>
                      <h2 className="charity_sec_amount">
                        {fullProjectlist?.length}
                      </h2>
                    </div>

                    <div className="charity_green_graph">
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={Statusgreen}
                        width={50}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className="charity_amount_percent">
                    <h4>
                      25%{" "}
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={arrowup}
                        width={15}
                        height={12}
                      />
                    </h4>
                    <h5>vs Last Month</h5>
                  </div>
                </Card>
              </Col>

              <Col span={5} style={{ marginRight: "4px" }}>
                <Card>
                  <div style={{ color: "#878787" }}>
                    <h4 className="charity_head">Live Project</h4>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ color: "#252947" }}>
                      <h2 className="charity_sec_amount">
                        {liveProject?.length}
                      </h2>
                    </div>

                    <div className="charity_green_graph">
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={Statusred}
                        width={50}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className="charity_amount__percent">
                    <h4>
                      25%
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={arrowdown}
                        width={15}
                        height={12}
                      />
                    </h4>
                    <h5>vs Last Month</h5>
                  </div>
                </Card>
              </Col>

              <Col span={5}>
                <Card>
                  <div style={{ color: "#878787" }}>
                    <h4 className="charity__head">Completed Project</h4>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ color: "#252947" }}>
                      <h2 className="charity_sec_amount">
                        {completedProject?.length}
                      </h2>
                    </div>

                    <div className="charity_green_graph">
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={Statusgreen}
                        width={50}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className="charity_amount_percent">
                    <h4>
                      25%
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={arrowup}
                        width={15}
                        height={12}
                      />
                    </h4>
                    <h5>vs Last Month</h5>
                  </div>
                </Card>
              </Col>
            </Row>

            <Card style={{ width: "100%" }}>
              <div>
                {/* <Image loader={sanityIoImageLoader} alt="image" src={CharityGraph} style={{ width: "100%" }} /> */}
              </div>
            </Card>
          </>
        ) : (
          <></>
        )}

        {tabdata === "Payment" ? (
          <>
            <Card>
              <Row>
                <Col span={11}>
                  <div className="payment_charity">
                    <p className="payment_collected_amount">
                      Total Collected Amount (this month)
                    </p>
                    <p className="payment_amount">
                    £ {payment?.length === 0 ? transationamount :  payment  }  
                    </p>
                    <div className="payment_info">
                      {" "}
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={info}
                        width={16}
                        height={16}
                      />{" "}
                      <span className="payment_settle_amount">
                        15 days more for settlement day (20-feb-2022)
                      </span>
                    </div>
                  </div>
                </Col>

                <Col span={13}>
                  <div className="payment_pay_button">
                    {/* <form action="/api/checkout_session" method="POST"> */}
                      <Button
                        className="payment_button_align"
                        onClick={() => setIsModalOpen(true)}
                        htmlType="submit"
                        role="link"
                      >
                        Pay now
                      </Button>
                    {/* </form> */}
                    <Modal
                      footer={false}
                      open={isModalOpen}
                      onOk={() => setIsModalOpen(false)}
                      onCancel={() => setIsModalOpen(false)}
                    >
                      <div className="payment_popup_details">
                        <p>Payment</p>
                        <h3>Amount collected for the month of February </h3>
                      </div>
                      <div className="payment_popup_card">
                        <Card>
                          <div className="payment_amount_charges">
                            <div className="payment_collected">
                              <p>Collected amount</p>
                              <p>Transactional Charges</p>
                            </div>
                            <div className="payment_transcation_amount">
                              <p>£ {transactiondata}</p>
                              <p>- £ 0</p>
                            </div>
                          </div>
                          <Divider className="divider_line" />
                          <div className="payment_payable_amount">
                            <p className="payment_credit">Payable amount</p>
                            <p className="payment_pounds">
                              £ {transactionamount}
                            </p>
                          </div>
                        </Card>
                      </div>
                      <div className="payment_info_details">
                        <Image
                          className="info_images"
                          src={info}
                          alt="downarrow"
                          width={16}
                          height={16}
                        />
                        <p>
                          Are you sure you want to settle the amount prior to 15
                          days of settlement day? (20-feb-2022)
                        </p>
                      </div>
                      <div className="payment_button">
                        <Button className="cancel_button">Cancel</Button>
                        <Button
                          className="ok_button"
                          onClick={() => showpaymentModal(transactionamount)}
                        >
                          Yes,pay
                        </Button>
                      </div>
                    </Modal>
                    <Modal
                      footer={false}
                      open={ispayment}
                      onOk={() => handlepaymentOk()}
                    >
                      <div>
                        <Image
                          src={done}
                          alt="downarrow"
                          className="payment_done_image"
                        />
                        <p className="payment_success">Payment Successfull</p>
                        <p className="payment_paid">
                          £ {transactionamount} paid to child in need charity
                        </p>
                        <Button
                          className="done_button"
                          onClick={() => handlepaymentCancel()}
                        >
                          Done
                        </Button>
                      </div>
                    </Modal>
                  </div>
                </Col>
              </Row>
            </Card>

            <div>
              <Row>
                <Col>
                  <Card className="giftaid_card">
                    <div>
                      <p className="payment_giftaid_details">
                        Gift Aid (this month)
                      </p>
                      <p className="payment_giftaid_amount">
                        £ {infoDetails?.charitygiftaid}
                      </p>
                    </div>
                  </Card>
                </Col>

                <Col>
                  <Card className="giftaid_sec_card">
                    <div>
                      <p className="payment_giftaid_sec_details">
                        Total amount transferred till
                      </p>
                      <p className="payment_giftaid_sec_amount">
                        £ {collectedAmount}
                      </p>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <div>
              <div className="payment_section2">
                <div className="payment_section2_header">
                  <h1>Payment history</h1>
                  <div className="charity_select">
                    <Select
                      suffixIcon={
                        <div className="select_arrow">
                          <Image src={downarrow} alt="downarrow" />
                        </div>
                      }
                      className="input_height_charity filter_dropdown"
                      placeholder="Last 4 month"
                      options={[
                        { value: "This month", label: "This month" },
                        { value: "This year", label: "This year" },
                        { value: "This week", label: "This week" },
                        { value: "Last month ", label: "Last month" },
                        { value: "Last 3 month", label: "Last 3 month" },
                      ]}
                      onChange={handleChange}
                    ></Select>
                  </div>
                </div>
                {dataAdmin?.mst__admin_transaction?.map((projectdata) => {
                  let startDate = moment(projectdata?.transfer_date).format(
                    "MMMM"
                  );
                  return (
                    <div className="payment_amount_align2">
                      <ul className="payment_project_wise2">
                        <li className="payment_project_name2">{startDate}</li>
                        <li className="payment_project_date2">
                          {projectdata?.transfer_date}
                        </li>
                        <li className="payment_project_date2">
                          {transactiondetail?.length} projects
                        </li>
                        <li className="payment_project_date2">Paid</li>
                      </ul>
                      <ul className="payment_project_wise3">
                        <li className="payment_project_amnt2">
                          £{projectdata?.donation_amount}
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {tabdata === "Project" ? (
          <>
            {" "}
            <div className="projectcard_data">
              {fullProjectlist?.length > 0 ? (
                fullProjectlist?.map((createdata) => {
                  let receiveAmnt = createdata?.mst__transactions
                    ?.map((receive) => receive.total_amount)
                    ?.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue,
                      0
                    );
                  let targetAmntVal = createdata?.amount_target;
                  let prograssBar = Math.ceil(
                    (receiveAmnt / targetAmntVal) * 100
                  );
                  let projectimage = createdata?.image.split(/[,]/);
                  let startdate = moment(createdata?.start_date).format(
                    "D-MM-YYYY"
                  );
                  return (
                    <div className="card_project_width">
                      {
                        <Card>
                          <div className="imageHolder">
                            <Carousel
                              autoplay={false}
                              arrows
                              nextArrow={
                                <Image
                                  src={Sliderright}
                                  alt="sliderleft"
                                  loader={sanityIoImageLoader}
                                  className="Prevearrow"
                                />
                              }
                              prevArrow={
                                <Image
                                  src={Sliderleft}
                                  alt="sliderright"
                                  loader={sanityIoImageLoader}
                                  className="Prevearrow"
                                />
                              }
                            >
                              {projectimage.map((sliderimage) => {
                                return (
                                  <Image
                                    src={sliderimage}
                                    alt="projectimage"
                                    className="create_project_img"
                                    width={100}
                                    height={100}
                                    loader={sanityIoImageLoader}
                                  />
                                );
                              })}
                            </Carousel>
                          </div>
                          <div className="card_content_project">
                            <div className="pockets_project_top">
                              <div>
                                <h2
                                  className="pockets_child_helpline"
                                // onClick={() =>
                                //   handleRevenue(createdata)
                                // }
                                >
                                  {createdata?.name}
                                </h2>
                                <p className="pockets_created">
                                  Created on: {startdate}
                                </p>
                              </div>
                              <Button className="pockets_medico_button">
                                {createdata?.project_category?.name}
                              </Button>
                              <div className="pockets_more_icon">
                                <Popover
                                  placement="bottomRight"
                                  content={content}
                                  trigger="click"
                                >
                                  <MoreOutlined
                                    onClick={() =>
                                      setSelectedCreate(createdata)
                                    }
                                  />
                                </Popover>
                              </div>
                            </div>

                            <div className="days_left_icon">
                              <Tag color="green">
                                <ClockCircleOutlined />
                                {closeDateValue(createdata?.close_date)}
                                days left
                              </Tag>
                            </div>

                            <div>
                              <p className="pockets_projects_para">
                                {createdata?.details}
                              </p>
                            </div>
                            <div>
                              <Progress
                                percent={prograssBar}
                                showInfo={false}
                                strokeColor={"#252947"}
                              />
                            </div>
                            <div className="count_sec">
                              <p className="pockets_project_count">
                                <TeamOutlined />

                                {createdata?.mst__transactions.length}
                              </p>
                              <p className="pockets_earn">
                                <span className="amount_target">
                                  £
                                  {createdata?.mst__transactions
                                    ?.map((receive) => receive.total_amount)
                                    ?.reduce(
                                      (accumulator, currentValue) =>
                                        accumulator + currentValue,
                                      0
                                    )}
                                </span>
                                <span className="pockets_amoutcollected_project">
                                  /£{createdata?.amount_target}
                                </span>
                              </p>
                            </div>
                          </div>
                        </Card>
                      }
                    </div>
                  );
                })
              ) : (
                <div className="centered">
                  <Empty />
                </div>
              )}
            </div>
          </>
        ) : (
          <></>
        )}

        {tabdata === "Post" ? (
          <>
            {" "}
            <div className="Postcard_data">
              {dataPostCharity?.mst_posts?.length > 0 ? (
                dataPostCharity?.mst_posts?.map((postdata) => {
                  let Postdate = moment(postdata?.post_date).format(
                    "D-MM-YYYY"
                  );
                  let postimage = postdata?.image?.split(/[,]/);

                  return (
                    <div className="card_post_width">
                      <Card>
                        <div className="post_image">
                          <Carousel
                            autoplay={false}
                            arrows
                            nextArrow={<RightOutlined />}
                            prevArrow={<LeftOutlined />}
                          >
                            {postimage?.map((postImage) => {
                              return (
                                <Image
                                  src={postImage}
                                  className="Post_slider"
                                  alt="postimage"
                                  width={500}
                                  height={250}
                                  loader={sanityIoImageLoader}
                                />
                              );
                            })}
                          </Carousel>
                        </div>
                        <div className="total_card_content">
                          <div className="card_heading">
                            <div>
                              <p className="cardPara">
                                {postdata.title} <br />
                                <span className="cardparaTwo">
                                  Posted on: {Postdate}
                                </span>
                              </p>
                            </div>
                            <div className="post_more_icon">
                              <Popover
                                placement="bottomRight"
                                content={postcontent}
                                trigger="click"
                              >
                                <MoreOutlined
                                  onClick={() => setSelectedPost(postdata)}
                                />
                              </Popover>
                            </div>
                          </div>
                          <div>
                            <p className="cardPara_title">
                              {postdata?.mst__project?.name}{" "}
                            </p>
                            <p className="cardBody">{postdata.description}</p>
                          </div>
                          <div className="like_bttn">
                            <Image
                              loader={sanityIoImageLoader}
                              alt="image"
                              src={LIKE}
                              width="20"
                              className="like_align"
                            //  onClick={() => handleLike(postdata.id)}
                            />
                            <span
                              onClick={() => handelLike(postdata)}
                              className="Like_count"
                            >
                              {postdata?.mst_post_likes.length}
                            </span>

                            <Image
                              loader={sanityIoImageLoader}
                              alt="image"
                              src={Message}
                              width="20"
                              className="like_align"
                            />

                            <span
                              onClick={() => handleComment(postdata)}
                              key={postdata?.id}
                              className="Like_count"
                            >
                              {postdata?.mnt__comments.length}
                            </span>
                            <Image
                              loader={sanityIoImageLoader}
                              alt="image"
                              src={Repeat}
                              width="20"
                              className="like_align"
                            />
                            <span
                              onClick={() => handleRepost(postdata)}
                              className="Like_count"
                            >
                              {" "}
                              {postdata?.mst_post_reports?.length}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })
              ) : (
                <div className="centered">
                  <Empty />
                </div>
              )}
            </div>
          </>
        ) : (
          <></>
        )}

        {tabdata === "Archived" ? <></> : <></>}

        {tabdata === "Deleted" ? (
          <>
            <div className="centered">
              <Empty />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div>
        <Modal open={charityEditModal} footer={false} width="400px">
          <div className="modal_project_success">
            <Image
              loader={sanityIoImageLoader}
              src={tickcircle}
              alt="tickcircle"
            />
            <h4>Charity updated!</h4>
            <p>Changes have been saved.</p>
            <div className="modal_project_success_btn">
              <Button onClick={charityEditOkModal}>Done</Button>
            </div>
          </div>
        </Modal>
      </div>

      <div>
        <Modal open={deactivate} footer={false}>
          <div className="deactivatemodal">
            <h4>Do you want this charity to be deactivate</h4>
            <p>This will remove the data temporarily, the data will not be recovered!</p>

            <div className="hideArchivemodal_btn">
              <Button
                onClick={() => hideArchiveCancel()}
                className="hideArchivemodal_btn_cancel"
              >
                Cancel
              </Button>
              <Button
                onClick={() => archiveTheProject()}
                className="hideArchivemodal_btn_yes"
              >
                Yes,deactivate
              </Button>
            </div>
          </div>
        </Modal>
      </div>

      <div>
        <Modal open={hideArchive} footer={false}>
          <div className="hideArchivemodal">
            <h4>Confirmation</h4>
            <p>Are you sure you want to archive this post ?</p>
            <p>
              To learn more about archive post , please
              <span> visit the help center.</span>
            </p>
            <div className="hideArchivemodal_btn">
              <Button
                onClick={() => hideArchiveCancel()}
                className="hideArchivemodal_btn_cancel"
              >
                Cancel
              </Button>
              <Button
                onClick={() => archiveTheProject()}
                className="hideArchivemodal_btn_yes"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal open={unhideArchive} footer={false}>
          <div className="hideArchivemodal">
            <h4>Confirmation</h4>
            <p>Are you sure you want to show on profile ?</p>
            <p>
              To learn more about show on profile , please
              <span>visit the help center.</span>
            </p>
            <div className="hideArchivemodal_btn">
              <Button
                onClick={unhideArchiveCancel}
                className="hideArchivemodal_btn_cancel"
              >
                Cancel
              </Button>
              <Button
                onClick={() => unarchiveTheProject()}
                className="hideArchivemodal_btn_yes"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal open={postcreateModal} footer={false} width="400px">
          <div className="modal_project_success">
            <Image
              loader={sanityIoImageLoader}
              src={tickcircle}
              alt="tickcircle"
            />
            <h4>Post created!</h4>
            <p>Your Post has been created.</p>
            <div className="modal_project_success_btn">
              <Button onClick={postOkModal}>Done</Button>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal open={postEditModal} footer={false} width="400px">
          <div className="modal_project_success">
            <Image
              loader={sanityIoImageLoader}
              src={tickcircle}
              alt="tickcircle"
            />
            <h4>Post updated!</h4>
            <p>Changes have been saved.</p>
            <div className="modal_project_success_btn">
              <Button onClick={projectEditOkModal}>Done</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default authProtected(charityDashboard);
