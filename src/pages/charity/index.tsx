import { useState } from "react";
import { GET_NGO, GET_PROJECT } from "../../helpers/queries";
import type { PaginationProps } from "antd";
import { Table, Button, Select, Drawer, Tag, Popover, Tooltip, Checkbox, Modal } from "antd";
import { useQuery } from "@apollo/client";
import { PlusOutlined } from "@ant-design/icons";
import arrow from "../../assets/images/arrow-left.svg";
import Image from "next/image";
import info from "../../assets/images/info.png"
import router, { useRouter } from "next/router";
import CreateNgo from "../charity/createngo";
import downarrow from "../../assets/images/downarrow.svg";
import ProductCardLoader from "../../components/loader";
import { SearchOutlined } from '@ant-design/icons';
import document from "../../assets/images/postadd.png";
import { authProtected } from "../../components/protected-route";
import tickcircle from "../../assets/images/tick-circle.svg";
const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return <a>Prev</a>;
  }
  if (type === "next") {
    return <a>Next</a>;
  }
  return originalElement;
};



export const charitytable: React.FC = () => {
  const [opened, setOpened] = useState("");
  const router = useRouter();
  const [favlistItemCurrentPage, setfavlistItemCurrentPage] = useState(1)
  console.log(favlistItemCurrentPage,"favlistItemCurrentPage");
  const [favPageSize, setFavPageSize] = useState(10)
  console.log(favPageSize,"favPageSize");
  
  
  const [charityCreateModal, setcharitycreateModal] = useState(false);

  const colors = ['rgba(255, 255, 255, 1)']
  const text = 
  <div>
  <div className="amount_tooltip">
    <span className="charity_amount_pending">Amount Pending</span>
    <span className="charity_amount_tooltip">£ 75.06</span>
  </div>;
  <div className="amount_month_settlement">
    <Image src={info} alt="info" width={15} height={15}/>
    <span>15 days to go for this month settlement (22.02.2023)</span>
  </div>
  </div>

  const {
    error: ngoError,
    loading: ngoLoading,
    data: dataNgo,
    refetch: refetchNgo,
  } = useQuery(GET_NGO, {
    variables: {},
  });

  const datas = dataNgo?.mst__ngos;
  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });


  const charityOkModal = () => {
    setcharitycreateModal(false);
  };

  const clickModal = () => {
    setcharitycreateModal(true);
  };

  const columns = [
    {
      title: "Charity Id",
      render: (value) => <><p className='total_projects_count'>{value?.charity_id}</p></>,
    },
    {
      title: "Charity Name",
      render: (value) => (
        console.log(value, "value"),
        <a onClick={() => router.replace("/charity/" + `${value?.id}`)}>
          {" "}
          {value?.name}{" "}
        </a>
      ),
    },
    {
      title: "Total Projects",
      render: (value) => <><p className='total_projects_count'>{value?.mst__projects.length}</p></>,
    },
    {
      title: "Total Post",
      render: (value) => <><p className='total_projects_count'>{value?.mst_posts.length}</p></>,
    },
    {
      title: <><p>Amount <br />(This month)</p></>,
      render: (value) =>
      (
        <>
     {colors.map((color) => ( 
     <Tooltip title={text} color={color}>
          <span className="pockets_amoutcollected">£{
            value?.mst__transactions?.map(ars => ars.total_amount)?.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue,
              0
            )
          }</span>
      </Tooltip>
  ))}
          <span className="pay_tag"><Tag color="cyan" onClick={() => router.replace("/charity/" + `${value?.id}` +"-Payment")} style={{cursor:"pointer"}}>Pay</Tag></span>
        </>
      ),
      filterIcon: filtered => <Image src={document} alt="search" />,
      filters: [
        {
          text: "Charity Id",
          value: "Charity Id",
        },
        {
          text: "Charity name",
          value: "Charity name",
        },
        {
          text: "Total projects",
          value: "Total projects",
        },
        {
          text: "Total post",
          value: "Total post",
        },
        {
          text: "Amount collected",
          value: "Amount collected",
        },
        {
          text: "Started date",
          value: "Started date",
        },
        {
          text: "Location",
          value: "Location",
        },
        {
          text: "Charity Type",
          value: "Charity Type",
        },
        {
          text: "Preferred currency",
          value: "Preferred currency",
        },
      ],
    },
  ];

  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };

  const closeModal = (status) => {
    setOpened(status)
  }

  return (
    <>
      {ngoLoading ? (
        <ProductCardLoader />
      ) : (
        <div>
          <div className="charity_table_head">
            <h2>Charity</h2>
            <div className="charity_select">
              {/* <Select
                suffixIcon={
                  <div className="select_arrow">
                    <p className="charity_select_counter">0</p>{" "}
                    <Image src={downarrow} alt="downarrow" />
                  </div>
                }
                className="input_height_charity filter_dropdown"
                placeholder="Filter charity by"
                 
                options= {[
                 { value: "Lorem ipsum ", label:  <Checkbox> Lorem ipsum </Checkbox> },
                  { value: "Lorem ipsum ", label: <Checkbox> Lorem ipsum </Checkbox> },
                  { value: "Lorem ipsum ", label: <Checkbox> Lorem ipsum </Checkbox> },
                  { value: "Lorem ipsum ", label: <Checkbox> Lorem ipsum </Checkbox> },
                ]}
              >
              </Select> */}

              <>
                <Drawer
                  open={opened?.length > 1 ? true : false}
                  onClose={() => setOpened(null)}
                  width={opened === "comment" ? 550 : 650}
                  placement="right"
                  closable={false}
                  title={
                    <div className="create_charity_sec">
                      <Image
                        loader={sanityIoImageLoader}
                        alt="image"
                        src={arrow}
                        width="25"
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpened(null)}
                      />
                      {opened === "create" ? <h2>Add new charity</h2> : <></>}
                    </div>
                  }
                >
                  {opened === "create" ? (
                    <>
                      <CreateNgo clickModal={clickModal} closeModal={closeModal} ngodata={null} />
                    </>
                  ) : (
                    <></>
                  )}
                </Drawer>

                <div>
              <Modal open={charityCreateModal} footer={false} width="400px">
                <div className="modal_project_success">
                  <Image
                    loader={sanityIoImageLoader}
                    src={tickcircle}
                    alt="tickcircle"
                  />
                  <h4>Charity created!</h4>
                  <p>Your charity has been created.</p>
                  <div className="modal_project_success_btn">
                    <Button onClick={charityOkModal}>Done</Button>
                  </div>
                </div>
              </Modal>
            </div>
          
              </>

              <Button
              type="ghost"
                className="create_new_charity_btn"
                onClick={() => setOpened("create")}
              >
                {" "}
                <PlusOutlined /> Add new charity{" "}
              </Button>
            </div>
          </div>
          <div className="charity_table">
            <Table
              dataSource={datas}
              columns={columns}
              // pagination={{
              //   pageSize: 10,
              //   itemRender: itemRender
              // }}
              pagination={{
                onChange(currentpage, size) {
                  setfavlistItemCurrentPage(currentpage);
                  setFavPageSize(size);
                },
                defaultPageSize: 10,
                itemRender: itemRender
              }}
            >
            </Table>

            <h6 className="charity_data">Show of {favlistItemCurrentPage} to <span>{favPageSize}</span> of <span>{datas?.length}</span> rows</h6>
          </div>
        </div>
      )}


    </>
  );
};

export default authProtected(charitytable)