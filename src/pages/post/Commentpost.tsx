import Image from 'next/image'
import commentsearch from "../../assets/images/postImage/commentsearch.svg"
import Ellipse from "../../assets/images/postImage/Ellipse 5156.svg"
import Repeat from '../../assets/images/postImage/repeat.svg'
import LIKE from '../../assets/images/postImage/wishlist-svg.svg'
import { Input, Popover, Button } from 'antd'
import React, { useEffect, useState } from 'react';
import { MoreOutlined } from "@ant-design/icons";
import trash from "../../assets/images/postImage/trash.svg";
import moment from "moment";

const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}
export const Commentpost: React.FC<any> = ({ postCommentId }) => {
    const [postcomment, setPostComment] = useState([]);


    useEffect(() => {
        if (postCommentId?.mnt__comments) {
            let filterPost = postCommentId?.mnt__comments
            setPostComment(filterPost)
        }
    }, [postCommentId])


    const content = (
        <div>
            <div className="More_list">
                <span><Image loader={sanityIoImageLoader} alt="image" src={trash} /></span>
                <h5>Remove</h5>
            </div>


        </div>
    )
    return (
        <>

            <div className='total_comment_scroll'>

                <div className='comment_sec'>

                    <Input
                        className="input_height_comment"
                        placeholder="Type to search or @ to mention..."

                    />
                    <Image loader={sanityIoImageLoader} alt="image" src={commentsearch} />
                </div>
                <div className='filter_comment'>
                    <div>

                        <Button className='top_filter'>Top comments</Button>
                        <Button className='top_filter'>Newest first</Button>
                    </div>

                    <div className='filter_align'>
                        {/* <Select
                            className="input_height"

                            placeholder="Filter search"

                        >


                        </Select> */}
                    </div>
                </div>

                {postCommentId?.mnt__comments.length === 0 ? (<p>No one comment this post</p>) : (<>
                    {postcomment?.map((commentdata) => {
                        let date = commentdata?.users?.createdAt
                        var now = moment(date).fromNow();
                        return <div className='read_comment'>
                            <div className='total_comment'>
                                <div className='user_profile'>
                                    <Image loader={sanityIoImageLoader} alt="image" src={Ellipse} />
                                </div>
                                <div className='comment_details'>
                                    <div>
                                        <div className='comment_sec-read'>
                                            <h3>{commentdata?.users?.displayName}
                                                <span>{now}</span>

                                            </h3>
                                            <p>{commentdata?.comment}</p>
                                            <div className='like_bttn'>

                                                <Image loader={sanityIoImageLoader} alt="image" src={LIKE} width="20" />
                                                <span> +458</span>
                                                <Image loader={sanityIoImageLoader} alt="image" src={Repeat} width="20" />
                                                <span> +4589</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='remove_comment'>
                                <Popover
                                    placement="bottomRight"
                                    content={content}
                                    trigger="click"
                                >
                                    <MoreOutlined />
                                </Popover>
                            </div>
                        </div>
                    })}
                </>)}


            </div>
        </>
    )
}

export default Commentpost
