
import { Button, Card, Carousel, Drawer, Form, Input, Popover, Select } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import commentsearch from "../../assets/images/commentsearch.png"
import search_empty from "../../assets/images/search_empty.png"
import edit from "../../assets/images/edit.png";
import eyeslash from "../../assets/images/eye-slash.png";
import ticket from "../../assets/images/dot_ticket.svg";
import child from "../../assets/images/child.png";
import { MoreOutlined } from "@ant-design/icons";
import Message from '../../assets/images/message.png'
import Repeat from '../../assets/images/repeat.png'
import Trend from '../../assets/images/trend-up.png'
import LIKE from '../../assets/images/Wishlist-two-tone.png'
import Sliderleft from "../../assets/images/arrow-circle-left.png"
import Sliderright from "../../assets/images/arrow-circle-right.png"
import search_green from "../../assets/images/search_green.png";
import arrow from '../../assets/images/arrow-left.png'
import Raiseticket from './raiseticket';
import { SEARCH_PROJECT } from '../../helpers';
import { useMutation, useQuery } from "@apollo/client";
import { authProtected } from '../../components/protected-route';

const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}

export const Search: React.FC = () => {
    const [opened, setOpened] = useState('');
    const [searchproject, setSearchproject] = useState('');
    const [searchdata, setSearchdata] = useState([]);
    const [searchresult, setSearchresult] = useState('')

    const {
        error: postError,
        loading: postLoading,
        data: searchData,
    } = useQuery(SEARCH_PROJECT, {
        variables: {
            name: searchresult
        }
    });
    console.log(searchData)
    useEffect(() => {
        if (searchData) {
            setSearchdata(searchData?.mst__projects);
        }
    }, [searchData]);
    const handleSearch = () => {
        console.log(searchproject, "searchproject")
        setSearchresult(searchproject)
    };
    const content = (
        <div>

            <div className="More_list">
                <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={eyeslash} /></span>
                <h5
                >Hide this post</h5>
            </div>
            <div className="More_list">
                <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={ticket} /></span>
                <Drawer
                    open={opened?.length > 1 ? true : false}
                    onClose={() => setOpened(null)}
                    width={opened === "comment" ? (550) : (650)}
                    placement="right"
                    closable={false}
                    title={<div className='create_post_sec'>
                        <Image loader={sanityIoImageLoader} alt="image" src={arrow} width="25"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpened(null)}
                        />
                        <h2>Ticket details</h2>

                    </div>}
                >
                    <Raiseticket />
                </Drawer>
                <h5 onClick={() => setOpened("raiseticket")}>Raise a ticket</h5>
            </div>

        </div>
    );
    return (
        <div className='container'>

            <div className='search_page'>
                <div className='search_top'>
                    <h2 className='search_title'>Search</h2>
                    <div className='search_bar'>
                        <div className='search_sec'>
                            <Input
                                className="input_height_search"
                                placeholder="Type here to search"
                                onChange={(e: any) => setSearchproject("%" + e.target.value + "%")}
                            />
                            <Image loader={sanityIoImageLoader} alt="image" src={commentsearch}
                                onClick={() => handleSearch()}
                            />
                        </div>
                        <div className='filter_search'>

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
                                    placeholder="Filter searchby"
                                >
                                    <Select.Option value="Recently uploaded">Recently uploaded
                                    </Select.Option>
                                    <Select.Option value="Highly Reached">Highly Reached
                                    </Select.Option>
                                    <Select.Option value="Top 10">Top 10
                                    </Select.Option>
                                    <Select.Option value="High Coments">High Coments
                                    </Select.Option>
                                    <Select.Option value="Lorem ipsum ">Lorem ipsum
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>




                    <div className='search_result_bttn'>
                        <Button>Recently uploaded</Button>
                        <Button>Highly Reached</Button>
                        <Button>Top 10</Button>
                    </div>

                </div>
                {searchdata.length === 0 ? (<div className='search_result_empty'>
                    <Image src={search_empty} alt="search_empty" loader={sanityIoImageLoader} />
                </div>) : (
                    <>
                        <div className='search_count'>We’ve found {searchdata?.length} projects!</div>

                        <div className='search_card_sec'>

                            {searchdata?.map((searchResult) => {
                                let searchimage = searchResult?.image.split(/[,]/)

                                return <div className='search_card'>
                                    <Card  >
                                        <div className="card_image" >
                                            <Carousel autoplay arrows nextArrow={
                                                <Image src={Sliderright} alt="sliderleft"
                                                    loader={sanityIoImageLoader}
                                                    className="Prevearrow"

                                                />
                                            }
                                                prevArrow={
                                                    <Image src={Sliderleft} alt="sliderright"
                                                        loader={sanityIoImageLoader}
                                                        className="Prevearrow"

                                                    />

                                                }
                                            >

                                                {searchimage?.map((searchImage) => {
                                                    return <Image src={searchImage} alt='postimage' width={500} height={300} loader={sanityIoImageLoader} />


                                                })}




                                            </Carousel>
                                        </div>
                                        <div className='total_card_content'>

                                            <div className='card_heading'>
                                                <div>
                                                    <p className='cardPara'>{searchResult?.name} <br />
                                                        <span className='cardparaTwo'>Created on: {searchResult?.start_date}</span>
                                                    </p>
                                                </div>
                                                <div className="post_more_icon">
                                                    <Popover
                                                        placement="bottomRight"
                                                        content={content}
                                                        trigger="click"

                                                    >
                                                        <MoreOutlined />
                                                    </Popover>
                                                </div>
                                            </div>
                                            <div>
                                                <p className='cardBody'>{searchResult?.description}</p>
                                            </div>
                                            <div>
                                                <Image src={search_green} alt="search_green" loader={sanityIoImageLoader} />
                                            </div>
                                            <div className='like_bttn'>

                                                <Image loader={sanityIoImageLoader} alt="image" src={Trend} width="20" className='like_align' />
                                                <span style={{ color: "#50CD89" }}> +458923</span>
                                                <Image loader={sanityIoImageLoader} alt="image" src={LIKE} width="20" className='like_align' />
                                                <span> +458</span>

                                                <Image loader={sanityIoImageLoader} alt="image" src={Message} width="20" className='like_align' />

                                                <span> +458</span>
                                                <Image loader={sanityIoImageLoader} alt="image" src={Repeat} width="20" className='like_align' />
                                                <span> +4589</span>

                                            </div>
                                        </div>

                                    </Card>
                                </div>
                            })}





                        </div>
                    </>)}



            </div>
        </div>

    )
}

export default authProtected(Search)
