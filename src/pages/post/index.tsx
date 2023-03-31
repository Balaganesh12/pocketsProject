import React, { useEffect, useState } from 'react';
import Message from '../../assets/images/postImage/message-svg.svg'
import Repeat from '../../assets/images/postImage/repeat.svg'
import Trend from '../../assets/images/postImage/trend-up-svg.svg'
import LIKE from '../../assets/images/postImage/wishlist-svg.svg'
import Add from '../../assets/images/postImage/add.svg'
import arrow from '../../assets/images/postImage/arrow-left.svg'
import Image from 'next/image'
import {
  Popover, Drawer, Button, Card, Select, Form, Empty,
  Modal
} from 'antd'
import { MoreOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import edit from "../../assets/images/postImage/edit.svg";
import eyeslash from "../../assets/images/postImage/eye-slash.svg";
import ticket from "../../assets/images/postImage/ticket.svg";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_POST, GET_POST, NGO_USER, GET_POST_BY_NGOID } from '../../helpers/queries'
import Createpost from "../post/Createpost";
import Raiseticket from "../post/Raiseticket";
import Commentpost from "../post/Commentpost";
import moment from "moment";
import { Carousel } from 'antd';
import PostLike from "../post/Postlike";
import ProductCardLoader from '../../components/loader';
import { authProtected } from '../../components/protected-route';
import { useUserData } from '@nhost/nextjs'
import tickcircle from "../../assets/images/tick-circle.svg";
import Repost from './Repost';

export const Post: React.FC = () => {
  const user = useUserData();
  const [opened, setOpened] = useState('');
  const [selectedPost, setSelectedPost] = useState();
  const [post, setPost] = useState([]);
  const [postLikedata, setPostLikedata] = useState();
  const [postCommentId, setPostCommentId] = useState<any>([]);
  const [tabdata, setTabdata] = useState("ALL");
  const [fullPostData, setFullProjectData] = useState([]);
  const [ongoingProjectData, setOngoingProjectData] = useState([]);
  const [compltedProjectData, setCompletedProjectData] = useState([]);
  const [archivedProjectData, setArchiveProjectData] = useState([]);
  const [postticketModal, setPostticketModal] = useState(false);
  const [hideArchive, sethideArchiveModal] = useState(false);
  const [unhideArchive, setUnhideArchiveModal] = useState(false);
  const [postcreateModal, setpostcreateModal] = useState(false);
  const [postEditModal, setpostEditModal] = useState(false);
  const [ngoPost, setNgoPost] = useState<any>([]);
  const [repost, setRepost] = useState<any>([]);
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

  const clickModal = () => {
    setpostcreateModal(true);
  };

  const TicketModal = () => {
    setPostticketModal(true);
  };
  const postOkModal = () => {
    setpostcreateModal(false);
  };

  const ticketOkModal = () => {
    setPostticketModal(false);
  };
  const clickEditModal = () => {
    setpostEditModal(true);
  };


  const projectEditOkModal = () => {
    setpostEditModal(false);
  };
  const {
    error: postError,
    loading: postLoading,
    data: dataPost,
    refetch: refetchPost,
  } = useQuery(GET_POST, {
    variables: {
    }
  });
  const {
    error: getpostngo,
    loading: getpostngoload,
    data: getPostNgo,
    refetch: refetchgetpost,
  } = useQuery(GET_POST_BY_NGOID, {
    variables: {
      ngo_id: ngoPost?.toString()
    },
  });
  const {
    error: ngoError,
    loading: ngoLoading,
    data: ngoData,
    refetch: refetchngo,
  } = useQuery(NGO_USER, {
    variables: {
      id: user?.id
    },
  });
  useEffect(() => {
    const roles = user?.roles
    if (user?.defaultRole === 'admin' && dataPost) {
      setPostTab(dataPost.mst_posts);
    } else if (user?.defaultRole === 'ngo' && dataPost) {
      const ngoId = ngoData?.mst__ngos.map((data) => {
        return data?.id
      });
      setNgoPost(ngoId);
      let filterPost = getPostNgo?.mst_posts;
      if (filterPost?.length > 0) {
        setPostTab(filterPost);
      }
    }
  }, [getPostNgo, dataPost, ngoData])



  const setPostTab = (filteredPost: any) => {

    let filterProject = filteredPost?.filter(
      (data) => data.is_active === true
    );


    setPost(filterProject);
    setFullProjectData(filterProject);

    let ongoingProject = filteredPost?.filter((data) => {
      return moment().isBefore(data?.mst__project?.close_date, "day") && data.is_active;
    });
    setOngoingProjectData(ongoingProject);

    let completedProject = filteredPost?.filter((data) => {
      return moment().isAfter(data?.mst__project?.close_date, "day") && data.is_active;
    });
    setCompletedProjectData(completedProject);

    let archivedProject = filteredPost?.filter((data) => {
      return data.is_active === false;
    });
    setArchiveProjectData(archivedProject);
    setTabdata('ALL')
  }
  useEffect(() => {
    if (fullPostData) {
      setPost(fullPostData);
    }
  }, [fullPostData]);


  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
  }

  useEffect(() => {
    if (tabdata === "ONGOING") {
      setPost(ongoingProjectData);
    } else if (tabdata === "COMPLETED") {
      setPost(compltedProjectData);
    } else if (tabdata === "ARCHIVE") {
      setPost(archivedProjectData);
    } else {
      setPost(fullPostData);
    }
  }, [tabdata]);

  const [editPost, { loading: loading, error: error, data: dataAddress }] =
    useMutation(EDIT_POST, {
      errorPolicy: "all",
    });



  const content = (
    <div className={opened ? "popover_display" : ""}>
      <div className="More_list">
        <span><Image loader={sanityIoImageLoader} alt="image" src={edit} /></span>
        <h5 onClick={() => setOpened("edit")}>Edit this post</h5>
      </div>
      {tabdata === "ALL" ? (<>
        <div className="More_list">
          <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={eyeslash} /></span>
          <h5
            onClick={hideArchiveModal}
          >Hide this post</h5>
        </div>
      </>) : (<></>)}

      {tabdata === "ONGOING" ? (<>
        <div className="More_list">
          <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={eyeslash} /></span>
          <h5
            onClick={hideArchiveModal}
          >Hide this post</h5>
        </div>
      </>) : (<></>)}

      {tabdata === "ARCHIVE" ? (<>
        <div className="More_list">
          <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={eyeslash} /></span>
          <h5
            onClick={unhideArchiveModal}
          >Unhide this post</h5>
        </div>
      </>) : (<></>)}
      {user?.defaultRole === "admin" ? (<></>) : (
        <div className="More_list">
          <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={ticket} /></span>
          <h5 onClick={() => setOpened("raiseticket")}>Raise a ticket</h5>
        </div>

      )}


    </div>
  );

  const archiveThePost = () => {
    let postObject = JSON.parse(JSON.stringify(selectedPost));
    const ngoId = ngoData?.mst__ngos.map((data) => {
      return data?.id
    })
    postObject.is_active = false;
    postObject.ngo_id = ngoId?.toString()
    postObject.amount_received = 10;
    postObject.amount_targeted = 10;
    postObject.project_id = postObject?.mst__project?.id
    editPost({
      variables: postObject,

    }).then((response) => {
      if (response.errors) {
        sethideArchiveModal(false);
      } else {
        sethideArchiveModal(false);
        refetchPost();
        refetchgetpost();

      }
    });
  }

  const unarchiveThePost = () => {
    let postObject = JSON.parse(JSON.stringify(selectedPost));

    const ngoId = ngoData?.mst__ngos.map((data) => {
      return data?.id
    })
    postObject.is_active = true;
    postObject.ngo_id = ngoId?.toString()
    postObject.amount_received = 10;
    postObject.amount_targeted = 10;
    postObject.project_id = postObject?.mst__project?.id

    editPost({
      variables: postObject,

    }).then((response) => {
      if (response.errors) {
        setUnhideArchiveModal(false);
      } else {
        setUnhideArchiveModal(false);
        refetchPost();
        refetchgetpost();
        setTabdata("ARCHIVE")
      }
    });
  }
  const handelLike = (postLike: any) => {
    setOpened("postlike");
    setPostLikedata(postLike);
  }
  const handleComment = (postComment: any) => {
    setOpened("comment");
    setPostCommentId(postComment);

  }
  const handleRepost = (postrepost: any) => {
    setOpened("repost");
    setRepost(postrepost);

  }
  const closeModal = (status) => {
    setOpened(status)
  }

  return (
    <>
      {postLoading ?
        <ProductCardLoader /> :
        <div className='post_align'>

          <div className="post_table_head">
            <h2>Post</h2>
            <>
              <Drawer
                open={opened?.length > 1 ? true : false}
                onClose={() => setOpened(null)}
                className="post_create_drawer"
                width={opened === "comment" ? (550) : (650) && opened === "postlike" ? (500) : (650)}
                placement="right"
                closable={false}
                title={<div className='create_post_sec'>
                  <Image loader={sanityIoImageLoader} alt="image" src={arrow} width="25"
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpened(null)}
                  />
                  {opened === "create" ? (<h2>Create Post</h2>) : (<></>)}
                  {opened === "edit" ? (<h2>Edit Post</h2>) : (<></>)}
                  {opened === "raiseticket" ? (<h2>Ticket details</h2>) : (<></>)}
                  {opened === "preview" ? (<h2>Preview</h2>) : (<></>)}
                  {opened === "comment" ? (<h2>Comments</h2>) : (<></>)}
                  {opened === "postlike" ? (<h2>Likes</h2>) : (<></>)}
                  {opened === "repost" ? (<h2>Repost</h2>) : (<></>)}


                </div>}
              >
                {opened === "create" ? (
                  <>
                    <Createpost postdata={null} closeModal={closeModal}
                      clickModal={clickModal}
                    />
                  </>
                ) : (<></>)}

                {opened === "edit" ? (
                  <>
                    <Createpost postdata={selectedPost} closeModal={closeModal}
                      clickEditModal={clickEditModal} />
                  </>
                ) : (<></>)}

                {opened === "raiseticket" ? (
                  <Raiseticket postdata={selectedPost}
                    closeModal={closeModal}
                    TicketModal={TicketModal}
                  />
                ) : (<></>)}


                {opened === "comment" ? (
                  <>
                    <Commentpost postCommentId={postCommentId} />
                  </>
                ) : (<></>)}

                {opened === "postlike" ? (<>
                  <PostLike postLike={postLikedata} />
                </>) : (<></>)}

                {opened === "repost" ? (<>
                  <Repost postrepost={repost} />
                </>) : (<></>)}
              </Drawer>
            </>
            <div>
              <Modal open={hideArchive} footer={false}>
                <div className="hideArchivemodal">
                  <h4>Confirmation</h4>
                  <p>Are you sure you want to archive this post ?</p>
                  <p>
                    To learn more about archive post , please
                    <span>visit the help center.</span>
                  </p>
                  <div className="hideArchivemodal_btn">
                    <Button
                      onClick={hideArchiveCancel}
                      className="hideArchivemodal_btn_cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => archiveThePost()}
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
                      onClick={() => unarchiveThePost()}
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
              <Modal open={postticketModal} footer={false} width="400px">
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
            <div className="post_select">
              <div className='filter_select'>
                <Form.Item
                  name="user"

                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    className="form_list"
                    placeholder="Filter post by"
                  >
                    <Select.Option value="Top post">Top post
                    </Select.Option>
                    <Select.Option value="New post">New post
                    </Select.Option>
                    <Select.Option value="High Coments">High Coments
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>


              {user?.defaultRole === 'admin' ? (<></>) : (
                <Button className="add_post" onClick={() => setOpened("create")}>
                  <Image loader={sanityIoImageLoader} alt="image" src={Add} />
                  Create new post</Button>
              )}

            </div>


          </div>


          <div className="tabs_header">
            <ul className="tab_header_content">
              <li
                className={tabdata === "ALL" ? "active" : ""}
                onClick={() => setTabdata("ALL")}
              >
                All{" "}
                <span
                  className={tabdata === "ALL" ? "active" : "tab_count"}
                >
                  {fullPostData?.length}
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
          <div className='Postcard_data'>

            {post?.length > 0 ? post?.map((postdata) => {
              let Postdate = moment(postdata?.post_date).format('D-MM-YYYY');
              let postimage = postdata?.image.split(/[,]/)

              return <div className='card_post_width'>

                <Card  >
                  <div className="post_image" >
                    <Carousel autoplay={false} arrows nextArrow={<RightOutlined />

                    }
                      prevArrow={

                        <LeftOutlined />
                      }
                    >
                      {postimage?.map((postImage) => {
                        return <Image src={postImage} className="Post_slider" alt='postimage' width={500} height={250} loader={sanityIoImageLoader} />



                      })}


                    </Carousel>
                  </div>
                  <div className='total_card_content'>

                    <div className='card_heading'>
                      <div>
                        {user?.defaultRole === 'admin' ? (<>
                          <p className='cardPara'>

                            Created by: {postdata?.mst__ngo?.name} <br />
                            <span className='cardparaTwo'>Posted on: {Postdate}</span>
                          </p>
                        </>) : (<>
                          <p className='cardPara'>

                            {postdata.title} <br />
                            <span className='cardparaTwo'>Posted on: {Postdate}</span>
                          </p>
                        </>)}

                      </div>
                      <div className="post_more_icon">
                        <Popover
                          placement="bottomRight"
                          content={content}
                          trigger="click"
                        >
                          <MoreOutlined onClick={() => setSelectedPost(postdata)} />
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <p className='cardPara_title'>{postdata?.mst__project?.name} </p>
                      <p className='cardBody'>{postdata.description}</p>
                    </div>
                    <div className='like_bttn'>


                      <Image loader={sanityIoImageLoader} alt="image" src={LIKE} width="20" className='like_align'
                      //  onClick={() => handleLike(postdata.id)} 
                      />
                      <span onClick={() => handelLike(postdata)} className="Like_count">
                        {postdata?.mst_post_likes.length}
                      </span>

                      <Image loader={sanityIoImageLoader} alt="image" src={Message} width="20" className='like_align' />

                      <span onClick={() => handleComment(postdata)} key={postdata?.id} className="Like_count">
                        {postdata?.mnt__comments.length}
                      </span>
                      <Image loader={sanityIoImageLoader} alt="image" src={Repeat} width="20" className='like_align' />
                      <span onClick={() => handleRepost(postdata)} className="Like_count"> {postdata?.mst_post_reports?.length}</span>

                    </div>
                  </div>

                </Card>
              </div>
            }) : <div className="centered"><Empty /></div>}

          </div>

        </div>}
    </>
  )
}

export default authProtected(Post);
