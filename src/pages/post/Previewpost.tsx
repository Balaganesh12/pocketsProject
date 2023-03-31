
import Image from 'next/image'
import Message from '../../assets/images/postImage/message-svg.svg'
import Repeat from '../../assets/images/postImage/repeat.svg'
import Trend from '../../assets/images/postImage/trend-up-svg.svg'
import LIKE from '../../assets/images/postImage/wishlist-svg.svg'
import React, { useEffect, useState } from 'react';
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import { GET_PROJECT } from '../../helpers/queries';
import { useQuery } from "@apollo/client";
import { Carousel } from 'antd'
const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}

export const Previewpost: React.FC<any> = ({ previewData }) => {
    const [projectdata, setProjectdata] = useState([]);
    const [projectname, setProjectname] = useState([]);
    const [postimage, setPostimage] = useState([]);



    const {
        error: projectError,
        loading: projectLoading,
        data: dataProject,
        refetch: refetchProject,
    } = useQuery(GET_PROJECT, {
        variables: {},
    });
    useEffect(() => {
        if (dataProject) {
            setProjectdata(dataProject?.mst__projects);
        }
    }, [dataProject]);
    useEffect(() => {
        let filterdata = projectdata?.find((val) => val?.id === previewData?.project_id);
        let Projectname = filterdata?.name
        setProjectname(Projectname);
        setPostimage(previewData?.image.split(/[,]/))
    }, [previewData])

    return (
        <>
            <div className='total_preview_sec'>
                <h2>Preview details</h2>
                <div className="preview_post">

                    <Carousel autoplay arrows nextArrow={<RightOutlined />

                    }
                        prevArrow={

                            <LeftOutlined />
                        }
                    >
                        {postimage.map((postImage) => {
                            return <Image src={postImage} alt='postimage' width={500} height={200} loader={sanityIoImageLoader} />
                        })}


                    </Carousel>

                </div>
                <div className='like_preview'>
                    <Image loader={sanityIoImageLoader} alt="image" src={LIKE} width="20" />
                    <Image loader={sanityIoImageLoader} alt="image" src={Message} width="20" style={{ cursor: "pointer" }} />

                    <Image loader={sanityIoImageLoader} alt="image" src={Trend} width="20" />

                    <Image loader={sanityIoImageLoader} alt="image" src={Repeat} width="20" />

                </div>
                <div className='preview_head'>
                    <h3>{projectname}</h3>
                    <span>Posted on: {previewData?.post_date}</span>
                    <h2>{previewData?.title}</h2>
                    <p>{previewData?.description}</p>

                </div>
                <div className='priview_sec_bttn'>
                    <button className='upload_bttn'>Update post</button>
                </div>
            </div>
        </>
    )
}

export default Previewpost
