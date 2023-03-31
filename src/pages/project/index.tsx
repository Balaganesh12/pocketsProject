import { useEffect, useState } from "react";
import {
  Tag,
  Progress,
  Row,
  Col,
  Modal,
  Button,
  Card,
  Select,
  message,
  Popover,
  Empty,
} from "antd";
import {
  MoreOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";
import type { UploadProps } from "antd";
import Image from "next/image";
import edit from "../../assets/images/edit.png";
import eyeslash from "../../assets/images/eye-slash.png";
import ticket from "../../assets/images/dot_ticket.svg";
import arrow from "../../assets/images/arrow-left.png";
import {
  GET_PROJECT,
  EDIT_PROJECT,
  NGO_USER,
  TRANSACTION_TABLE,
} from "../../helpers/queries";
import { useQuery, useMutation } from "@apollo/client";
import Createproject from "./Createproject";
import Raiseticketproject from "./Raiseticketproject";
import { Carousel } from "antd";
import Sliderleft from "../../assets/images/arrow-circle-left.png";
import Sliderright from "../../assets/images/arrow-circle-right.png";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import Revenue from "./Revenue";
import router, { useRouter } from "next/router";
import ProductCardLoader from "../../components/loader";
import downarrow from "../../assets/images/downarrow.svg";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { authProtected } from "../../components/protected-route";
import { useUserData } from "@nhost/nextjs";
import tickcircle from "../../assets/images/tick-circle.svg";
import profile_user from "../../assets/images/profile-2user.svg";

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export const project: React.FC = () => {
  const user = useUserData();
  const router = useRouter();
  const [opened, setOpened] = useState(null);
  const [tabdata, setTabdata] = useState("ALL");
  const [selectedCreate, setSelectedCreate] = useState();
  console.log(selectedCreate, "selectedCreate");
  const [fullProjectData, setFullProjectData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [ongoingProjectData, setOngoingProjectData] = useState([]);
  const [compltedProjectData, setCompletedProjectData] = useState([]);
  const [archivedProjectData, setArchiveProjectData] = useState([]);
  const [createData, setCreatedata] = useState();
  const [hideArchive, sethideArchiveModal] = useState(false);
  const [unhideArchive, setUnhideArchiveModal] = useState(false);
  const [projectcreateModal, setprojectcreateModal] = useState(false);
  const [projectEditModal, setprojectEditModal] = useState(false);
  const [projectId, setProjectId] = useState();
  const [projectticketModal, setProjectticketModal] = useState(false);

  console.log(archivedProjectData, "archivedProjectData");
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

  const projectOkModal = () => {
    setprojectcreateModal(false);
  };

  const projectEditOkModal = () => {
    setprojectEditModal(false);
  };
  const {
    error: ngoError,
    loading: ngoLoading,
    data: ngoData,
    refetch: refetchngo,
  } = useQuery(NGO_USER, {
    variables: {
      id: user?.id,
    },
  });

  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });
  console.log(dataProject, "dataProject");

  const {
    error: transactionError,
    loading: transactionLoading,
    data: transactionData,
    refetch: refetchTransaction,
  } = useQuery(TRANSACTION_TABLE, {
    variables: {},
  });
  console.log(transactionData, "transactionData");
  let received_amnt = [];
  // console.log(received_amnt, "received_amnt");

  useEffect(() => {
    if (dataProject?.mst__projects && ngoData?.mst__ngos) {
      const ngoId = ngoData?.mst__ngos.map((data) => {
        return data?.id;
      });
      let projectData = dataProject?.mst__projects;
      if (user?.defaultRole === "ngo") {
        projectData = dataProject?.mst__projects?.filter(
          (data) => data?.mst__ngo?.id === ngoId?.toString()
        );
      }
      console.log(projectData, "projectDataaaaaa");

      let filterProject = projectData?.filter(
        (data) => data.is_active === true
      );
      console.log(filterProject, "filterProject");
      setFullProjectData(filterProject);

      let ongoingProject = projectData?.filter((data) => {
        return moment().isBefore(data.close_date, "day") && data.is_active;
      });
      setOngoingProjectData(ongoingProject);

      let completedProject = projectData?.filter((data) => {
        return moment().isAfter(data.close_date, "day") && data.is_active;
      });
      setCompletedProjectData(completedProject);

      let archivedProject = projectData?.filter((data) => {
        return data.is_active === false;
      });
      setArchiveProjectData(archivedProject);

      setProjectData(projectData);
    }
  }, [dataProject, ngoData]);

  useEffect(() => {
    if (fullProjectData) {
      setProjectData(fullProjectData);
    }
  }, [fullProjectData]);

  // useEffect(() => {
  //   if (dataProject?.mst__projects) {
  //     let filterArchive = dataProject?.mst__projects.filter(
  //       (data) => data.is_active === true
  //     );
  //     setArchiveProjectData(filterArchive);
  //     console.log(dataProject?.mst__projects, "filterdata");
  //   }
  // }, [dataProject]);

  useEffect(() => {
    if (tabdata === "ONGOING") {
      setProjectData(ongoingProjectData);
    } else if (tabdata === "COMPLETED") {
      setProjectData(compltedProjectData);
    } else if (tabdata === "ARCHIVE") {
      setProjectData(archivedProjectData);
    } else {
      setProjectData(fullProjectData);
    }
  }, [tabdata]);

  const [
    editCreate,
    { loading: contactloading, error: contacterror, data: contactdataAddress },
  ] = useMutation(EDIT_PROJECT, {
    errorPolicy: "all",
  });

  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };

  const content = (
    <div className={opened ? "popover_display" : ""}>
      <div className="More_list_project">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={edit} />
        </span>
        <h5 onClick={() => setOpened("edit")}>Edit this project</h5>
      </div>
      {tabdata === "ALL" ? (
        <>
          <div className="More_list_project">
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
        </>
      ) : (
        <></>
      )}

      {tabdata === "ONGOING" ? (
        <>
          <div className="More_list_project">
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
        </>
      ) : (
        <></>
      )}

      {tabdata === "COMPLETED" ? (
        <>
          <div className="More_list_project">
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
        </>
      ) : (
        <></>
      )}

      {tabdata === "ARCHIVE" ? (
        <>
          <div className="More_list_project">
            <span>
              <Image
                loader={sanityIoImageLoader}
                alt="image"
                className="items_list_logo"
                src={eyeslash}
              />
            </span>
            <h5 onClick={unhideArchiveModal}>Show on profile</h5>
          </div>
        </>
      ) : (
        <></>
      )}
      {user?.defaultRole === "admin" ? (
        <></>
      ) : (
        <>
          <div className="More_list_project">
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
        </>
      )}
    </div>
  );

  const archiveTheProject = () => {
    let projectObject = JSON.parse(JSON.stringify(selectedCreate));

    console.log(projectObject, "projectObjectarchive");

    projectObject.is_active = false;
    projectObject.project_categories_id = projectObject?.project_category?.id;
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
    console.log(projectObject, "unarchiveTheProject");
    projectObject.is_active = true;
    projectObject.project_categories_id = projectObject?.project_category?.id;
    editCreate({
      variables: projectObject,
    }).then((response) => {
      console.log(response, "unarchiveTheProject");
      if (response.errors) {
        setUnhideArchiveModal(false);
      } else {
        setUnhideArchiveModal(false);
        refetchProject();
        setTabdata("ARCHIVE");
      }
    });
  };
  const closeDateValue = (closedate) => {
    console.log(closedate, "closedateclosedate");
    var eventdate = moment(closedate);
    var todaysdate = moment();
    return eventdate.diff(todaysdate, "days");
  };

  const projectIdData = (id: any) => {
    console.log(id, "projectidvalueid");
  };

  const handleRevenue = (createdata: any) => {
    setOpened("Revenue");
    setCreatedata(createdata);
  };

  const clickDrawn = () => {
    setOpened(false);
  };

  const clickModal = () => {
    setprojectcreateModal(true);
  };

  const clickEditModal = () => {
    setprojectEditModal(true);
  };

  const editPage = () => {
    setTabdata("ALL");
  };
  const TicketModal = () => {
    setProjectticketModal(true);
  };
  const ticketOkModal = () => {
    setProjectticketModal(false);
  };
  return (
    <>
      <ToastContainer />
      {projectLoading ? (
        <ProductCardLoader />
      ) : (
        <div className="total_project_page">
          <div className="total_project_page_sub">
            <Row>
              <Col md="8">
                <div className="total_tab_project">
                  <div className="myproject_header">
                    <h2 className="my_project">My Project</h2>
                    <div className="project_select">
                      <Select
                        suffixIcon={
                          <div className="select_arrow">
                            <p className="project_select_counter">0</p>{" "}
                            <Image src={downarrow} alt="downarrow" />
                          </div>
                        }
                        className="input_height filter_dropdown"
                        placeholder="Filter project by"
                        options={[
                          {
                            value: "Recently uploaded",
                            label: "Recently uploaded",
                          },
                          { value: "Highly Reached", label: "Highly Reached" },
                          { value: "Top 10", label: "Top 10" },
                          { value: "High Coments", label: "High Coments" },
                          { value: "Lorem ipsum", label: "Lorem ipsum" },
                        ]}
                      >
                        {/* {projectData?.map((a) => (
                          <Select.Option key={a?.name} value={a?.name}>
                            {a?.name}
                          </Select.Option>
                        ))} */}
                      </Select>
                      {user?.defaultRole === "admin" ? (
                        <></>
                      ) : (
                        <>
                          <Button
                            className="create_new_project_btn"
                            onClick={() => setOpened("create")}
                          >
                            <PlusOutlined className="plusIcon_project" />
                            Create new project
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="tabs_header_project">
                    <ul className="tab_header_content_project">
                      <li
                        className={tabdata === "ALL" ? "active" : ""}
                        onClick={() => setTabdata("ALL")}
                      >
                        All{" "}
                        <span
                          className={tabdata === "ALL" ? "active" : "tab_count"}
                        >
                          {fullProjectData?.length}
                        </span>
                      </li>
                      <li
                        className={tabdata === "ONGOING" ? "active" : ""}
                        onClick={() => setTabdata("ONGOING")}
                      >
                        Ongoing{" "}
                        <span
                          className={
                            tabdata === "ONGOING" ? "active" : "tab_count"
                          }
                        >
                          {ongoingProjectData?.length}
                        </span>
                      </li>
                      <li
                        className={tabdata === "COMPLETED" ? "active" : ""}
                        onClick={() => setTabdata("COMPLETED")}
                      >
                        Completed{" "}
                        <span
                          className={
                            tabdata === "COMPLETED" ? "active" : "tab_count"
                          }
                        >
                          {compltedProjectData?.length}
                        </span>
                      </li>
                      <li
                        className={tabdata === "ARCHIVE" ? "active" : ""}
                        onClick={() => setTabdata("ARCHIVE")}
                      >
                        Archive{" "}
                        <span
                          className={
                            tabdata === "ARCHIVE" ? "active" : "tab_count"
                          }
                        >
                          {archivedProjectData?.length}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="projectcard_data">
                      {projectData.length > 0 ? (
                        projectData?.map((createdata) => {
                          console.log(createdata, "createdata");
                          let projectimage = createdata?.image.split(/[,]/);
                          let receiveAmnt = createdata?.mst__transactions
                            ?.map((receive) => receive.total_amount)
                            ?.reduce(
                              (accumulator, currentValue) =>
                                accumulator + currentValue,
                              0
                            );
                          console.log(receiveAmnt, "receiveAmnt");
                          let targetAmntVal = createdata?.amount_target;
                          let prograssBar = Math.ceil(
                            (receiveAmnt / targetAmntVal) * 100
                          );
                          console.log(prograssBar, "prograssBar");
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
                                          onClick={() =>
                                            handleRevenue(createdata)
                                          }
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
                                      // style={{background:"#D9D9D9"}}
                                      />
                                    </div>
                                    <div className="count_sec">
                                      <p className="pockets_project_count">
                                        <div className="profile_user_img">
                                          <Image src={profile_user} loader={sanityIoImageLoader} alt="profile" />
                                        </div>
                                        <span>{createdata?.mst__transactions.length}</span>
                                      </p>
                                      <p className="pockets_earn">
                                        <span className="amount_target">
                                          £
                                          {createdata?.mst__transactions
                                            ?.map(
                                              (receive) => receive.total_amount
                                            )
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
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="total_project_drawer">
            <Drawer
              className="drawer_sec"
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
                  {opened === "create" ? <h2>Create Project</h2> : <></>}
                  {opened === "edit" ? <h2>Edit Project</h2> : <></>}
                  {opened === "raiseticket" ? <h2>Ticket details</h2> : <></>}
                  {opened === "Revenue" ? <h2>Child in need</h2> : <></>}
                </div>
              }
              width="700px"
            >
              {opened === "create" ? (
                <>
                  <Createproject
                    createdata={null}
                    clickDrawn={clickDrawn}
                    clickModal={clickModal}
                  />
                </>
              ) : (
                <></>
              )}

              {opened === "edit" ? (
                <>
                  <Createproject
                    createdata={selectedCreate}
                    clickDrawn={clickDrawn}
                    clickEditModal={clickEditModal}
                    editPage={editPage}
                  />
                </>
              ) : (
                <></>
              )}

              {opened === "raiseticket" ? (
                <>
                  <Raiseticketproject createdata={selectedCreate}
                    clickDrawn={clickDrawn} TicketModal={TicketModal}
                  />
                </>
              ) : (
                <></>
              )}

              {opened === "Revenue" ? (
                <>
                  <Revenue carddetail={createData} />
                </>
              ) : (
                <></>
              )}
            </Drawer>
          </div>

          <div >
            <Modal open={hideArchive} footer={false} className="total_archive_modal">
              <div className="hideArchivemodal">
                <h4>Confirmation</h4>
                <p>Are you sure you want to archive this project ?</p>
                <p>
                  To learn more about archive post , please<span> visit the help center.</span>
                </p>
                <div className="hideArchivemodal_btn">
                  <Button
                    onClick={hideArchiveCancel}
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
            <Modal open={projectticketModal} footer={false} width="400px">
              <div className="modal_project_success">
                <Image
                  loader={sanityIoImageLoader}
                  src={tickcircle}
                  alt="tickcircle"
                />
                <h4>Success!</h4>
                <p>Your ticket has been raised.</p>
                <div className="modal_project_success_btn">
                  <Button onClick={ticketOkModal}>Done</Button>
                </div>
              </div>
            </Modal>
          </div>
          <div>
            <Modal open={unhideArchive} footer={false} className="total_archive_modal">
              <div className="hideArchivemodal">
                <h4>Confirmation</h4>
                <p>Are you sure you want to show on profile ?</p>
                <p>
                  To learn more about show on profile , please
                  <span> visit the help center.</span>
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
            <div>
              <Modal open={projectcreateModal} footer={false} width="400px">
                <div className="modal_project_success">
                  <div className="message_image">
                    <Image
                      loader={sanityIoImageLoader}
                      src={tickcircle}
                      alt="tickcircle"
                    />
                  </div>

                  <h4>Project created!</h4>
                  <p>Your project has been created.</p>
                  <div className="modal_project_success_btn">
                    <Button onClick={projectOkModal}>Done</Button>
                  </div>
                </div>
              </Modal>
            </div>
            <div>
              <Modal open={projectEditModal} footer={false} width="400px">
                <div className="modal_project_success">
                  <div className="message_image">
                    <Image
                      loader={sanityIoImageLoader}
                      src={tickcircle}
                      alt="tickcircle"
                    />
                  </div>
                  <h4>Project updated!</h4>
                  <p>Changes have been saved.</p>
                  <div className="modal_project_success_btn">
                    <Button onClick={projectEditOkModal}>Done</Button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default authProtected(project);
