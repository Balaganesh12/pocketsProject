import { useEffect, useState } from "react";
import { Button, Card, Select } from "antd";
import { Tag, Tabs, Progress, Row, Col } from "antd";
import {
  MoreOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import { Drawer } from "antd";
import type { UploadProps } from "antd";
import { message, Upload, Form } from "antd";
import { Popover } from "antd";
import Image from "next/image";
import edit from "../../assets/images/edit.png";
import eyeslash from "../../assets/images/eye-slash.png";
import ticket from "../../assets/images/dot_ticket.svg";
import arrow from "../../assets/images/arrow-left.png";
import { GET_PROJECT, EDIT_PROJECT } from "../../helpers/queries";
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
  const router = useRouter();
  const [opened, setOpened] = useState(null);
  const [tabdata, setTabdata] = useState("ALL");
  const [selectedCreate, setSelectedCreate] = useState();
  const [fullProjectData, setFullProjectData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [ongoingProjectData, setOngoingProjectData] = useState([]);
  const [compltedProjectData, setCompletedProjectData] = useState([]);
  const [archivedProjectData, setArchiveProjectData] = useState([]);
  const [createData, setCreatedata] = useState();
  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });

  console.log(dataProject, "dataProjectreceived")
  const archiveThePost = () => {
    let createObject = JSON.parse(JSON.stringify(selectedCreate));
    editCreate({
      variables: createObject,
    }).then((response) => {
      if (response.errors) {
        toast.error("Error");
      } else {
        toast.success("Post Created successfully");
        refetchProject();
      }
    });
  };
  console.log(dataProject, "dataProject");
  useEffect(() => {
    if (dataProject?.mst__projects) {
      setFullProjectData(dataProject?.mst__projects);
      setProjectData(dataProject?.mst__projects);

      let ongoingProject = dataProject?.mst__projects.filter((data) => {
        return moment().isBefore(data.close_date, "day");
      });
      setOngoingProjectData(ongoingProject);

      let completedProject = dataProject?.mst__projects.filter((data) => {
        return moment().isAfter(data.close_date, "day");
      });
      setCompletedProjectData(completedProject);

      let archivedProject = dataProject?.mst__projects.filter((data) => {
        return data.is_active === false;
      });
      setArchiveProjectData(archivedProject);
    }
  }, [dataProject]);

  useEffect(() => {
    if (dataProject?.mst__projects) {
      let filterArchive = dataProject?.mst__projects.filter(
        (data) => data.is_active === true
      );
      setArchiveProjectData(filterArchive);
      console.log(dataProject?.mst__projects, "filterdata");
    }
  }, [dataProject]);

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
      <div className="More_list">
        <span>
          <Image loader={sanityIoImageLoader} alt="image" src={edit} />
        </span>
        <h5 onClick={() => setOpened("edit")}>Edit this project</h5>
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
        <h5>Archive this project</h5>
      </div>
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

  const closeDateValue = (closedate) => {
    var eventdate = moment(closedate);
    var todaysdate = moment();
    return eventdate.diff(todaysdate, "days");
  };

  const handleRevenue = (createdata: any) => {
    setOpened("Revenue");
    setCreatedata(createdata);
  };

  function hidepopover() { }

  const clickDrawn = (status) => {
    setOpened(status);
  };

  return (
    <>
      <ToastContainer />
      {projectLoading ? (
        <ProductCardLoader />
      ) : (
        <div className="total_project_page">
          <div className="total_project_page_sub">
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
                >
                  {projectData?.map((a) => (
                    <Select.Option key={a?.name} value={a?.name}>
                      {a?.name}
                    </Select.Option>
                  ))}
                </Select>

                <Button
                  className="create_new_project_btn"
                  onClick={() => setOpened("create")}
                >
                  <PlusOutlined className="plusIcon_project" />
                  Create new project
                </Button>
              </div>
            </div>
            <div className="tabs_header_project">
              <ul className="tab_header_content_project">
                <li
                  className={tabdata === "ALL" ? "active" : ""}
                  onClick={() => setTabdata("ALL")}
                >
                  All{" "}
                  <span className={tabdata === "ALL" ? "active" : "tab_count"}>
                    {fullProjectData?.length}
                  </span>
                </li>
                <li
                  className={tabdata === "ONGOING" ? "active" : ""}
                  onClick={() => setTabdata("ONGOING")}
                >
                  Ongoing{" "}
                  <span
                    className={tabdata === "ONGOING" ? "active" : "tab_count"}
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
                    className={tabdata === "COMPLETED" ? "active" : "tab_count"}
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
                    className={tabdata === "ARCHIVE" ? "active" : "tab_count"}
                  >
                    {archivedProjectData?.length}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="projectcard_data">
                {projectData?.map((createdata) => {
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
                              autoplay
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
                                  onClick={() => handleRevenue(createdata)}
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
                                {closeDateValue(createdata?.close_date)} days
                                left
                              </Tag>
                            </div>

                            <div>
                              <p className="pockets_projects_para">
                                {createdata?.details}
                              </p>
                            </div>
                            <div>
                              <Progress
                                percent={70}
                                showInfo={false}
                                strokeColor={"#252947"}
                              />
                            </div>
                            <div className="count_sec">
                              <p className="pockets_project_count">
                                <TeamOutlined /> <span>33</span>
                              </p>
                              <p className="pockets_earn">
                                <span className="amount_target">
                                  £{createdata?.amount_target}
                                </span>
                                /£{createdata?.amount_target}
                              </p>
                            </div>
                          </div>
                        </Card>
                      }
                    </div>
                  );
                })}
              </div>
            </div>
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
                  <Createproject createdata={null} clickDrawn={clickDrawn} />
                </>
              ) : (
                <></>
              )}

              {opened === "edit" ? (
                <>
                  <Createproject createdata={selectedCreate} />
                </>
              ) : (
                <></>
              )}

              {opened === "raiseticket" ? (
                <>
                  <Raiseticketproject createdata={selectedCreate} />
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
        </div>
      )}
    </>
  );
};

export default authProtected(project);
