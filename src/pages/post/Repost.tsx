import Link from 'next/link'

import { Container, Title } from '@mantine/core'
import moment from "moment";
import Image from "next/image";
import Ellipse from "../../assets/images/postImage/Ellipse 5156.svg"
import { Popover } from "antd";
import trash from "../../assets/images/postImage/trash.svg";
import { MoreOutlined } from "@ant-design/icons";

const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}
export const Repost: React.FC<any> = ({ postrepost }) => {

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
            {postrepost?.mst_post_reports?.length === 0 ? (<p>No Reposts</p>) : (<>
                {postrepost?.mst_post_reports.map((postLikedata) => {
                    let date = postLikedata?.user?.created_at
                    var now = moment(date).fromNow();

                    return <div className="total_like">
                        <div className="user_details">
                            <Image loader={sanityIoImageLoader} alt="image" src={Ellipse} className="User_like_image" width={50} height={50} />
                            <h3>{postLikedata?.user?.displayName}</h3>
                            <h4>{now}</h4>
                        </div>
                        <div className="Like_remove">
                            <Popover
                                placement="bottomRight"
                                content={content}
                                trigger="click"
                            >
                                <MoreOutlined />
                            </Popover>
                        </div>
                    </div>
                })}</>)}
        </>
    )
}

export default Repost
