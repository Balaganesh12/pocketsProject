import { Table, Pagination, Popover, Drawer, Select, Form } from 'antd'
import Link from 'next/link'
import type { PaginationProps } from 'antd';
import { useQuery } from "@apollo/client";
import { USER_DETAILS } from '../../helpers';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import cards from "../../assets/images/cards.png";
import graph from "../../assets/images/graph.png";
import directbox from "../../assets/images/directbox-default.png";
import { MoreOutlined } from "@ant-design/icons";
import ProductCardLoader from '../../components/loader';
import { authProtected } from '../../components/protected-route';
import document from "../../assets/images/document-filter.svg";
import Userdetails from './userDetails';
import arrow from '../../assets/images/postImage/arrow-left.svg'
import Userstatics from './userStatics';
import MessageUser from './messageUser';
import Ellipse from "../../assets/images/postImage/Ellipse 5156.svg"

// const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
//     if (type === 'prev') {
//         return <a>Prev</a>;
//     }
//     if (type === 'next') {
//         return <a>Next</a>;
//     }
//     return originalElement;
// };

export const UserDetails: React.FC = () => {
    const [userdetails, setUserdetails] = useState<any>([]);
console.log(userdetails,"usedetails from index")
    const [opened, setOpened] = useState('');
    const [userdata, setUserdata] = useState<any>([]);
    const [userclick, setUserclick] = useState<any>([]);

    const sanityIoImageLoader = ({ src, width, quality }) => {
        return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
    }
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
    const {
        error: ngoError,
        loading: userLoading,
        data: dataUser,
        refetch: refetchNgo,
    } = useQuery(USER_DETAILS, {
        variables: {
        }
    });
    console.log(dataUser,"datauser")
    useEffect(() => {
        if (dataUser) {
            let Userdata = dataUser?.users
            // let filterdata = Userdata?.map((data) => {
            //     return data?.roles

            // });
            // let roles = filterdata?.find((role) => role.role != "admin")
            setUserdetails(Userdata)
        }
    }, [dataUser]);

    const handleUser = (value) => {
        setOpened('user');
        setUserdata(value);
    }
    const handleClick = (value) => {
        setOpened('user');
        setUserdata(value);
    }
    const handleStatics = (value) => {
        setOpened('statics');
        setUserdata(value);
    }
    const handlemessage = (value) => {
        setOpened('message');
        setUserdata(value);
    }
    const content = (
        <div>

            <div className="More_list">
                <span><Image loader={sanityIoImageLoader} alt="image" src={cards} /></span>
                <h5 onClick={() => handleClick(userclick)} >User details</h5>
            </div>
            <div className="More_list">
                <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={graph} /></span>
                <h5
                    onClick={() => handleStatics(userclick)}
                >User statics</h5>
            </div>
            <div className="More_list">
                <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={directbox} /></span>
                <h5 onClick={() => handlemessage(userclick)}>Message user</h5>
            </div>

        </div>
    );
    const columns = [
        {
            title: "S.no",

            render: (text, object, index) => { return index + 1 },
            innerWidth: "20%",
        },
        {
            title: "Profile pic",
            render: (value) =>

                <>

                    <div className='table_image'>

                        <Image src={value?.avatarUrl} width={42} height={42} alt="Profile" /></div></>,
        },
        {
            title: "User name",
            render: (value) => <><p className='userName' onClick={() => handleUser(value)} >{value?.displayName}</p></>,

        },
        {
            title: "Mail id",
            render: (value) => <><p className='useremail' onClick={() => handleUser(value)} >{value?.email}</p></>,

        },
        {
            title: "Mobile.no",
            render: (value) => <><p className='userphone' onClick={() => handleUser(value)} >{value?.phoneNumber}</p></>,
        },
        {
            render: (value) => <>
                <Popover
                    placement="bottomRight"
                    content={content}
                    trigger="click"

                >
                    <span className='user_action' onClick={() => setUserclick(value)}>...</span>
                </Popover>
            </>,
            filterIcon: filtered => <Image src={document} alt="search" />,

            filters: [
                {
                    text: 'S.no',
                    value: 'S.no',
                },
                {
                    text: 'Profile pic',
                    value: 'Profile pic',
                },
                {
                    text: 'User name',
                    value: 'User name',
                },
                {
                    text: 'Mail id',
                    value: 'Mail id',
                },
                {
                    text: 'Mobile.no',
                    value: 'Mobile.no',
                },
                {
                    text: 'Total donation',
                    value: 'Total donation',
                },
                {
                    text: 'Total recurring donation',
                    value: 'Total recurring donation',
                },
                {
                    text: 'App fee',
                    value: 'App fee',
                },
                {
                    text: 'Gift-aid',
                    value: 'Gift-aid',
                },
            ],
        }
    ];




    return (
        <>
            {userLoading ? <ProductCardLoader /> :
                <div className='userDetails'>
                    <div className='user_table'>
                        <div className='user_table_head'>
                            <h2 className='user_head'>Users</h2>
                            <div className='filter_selectuser'>
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
                                    // suffixIcon={<DownCircleTwoTone />}
                                    >
                                        <Select.Option value="S.no">S.no
                                        </Select.Option>
                                        <Select.Option value="Profile pic">Profile pic
                                        </Select.Option>
                                        <Select.Option value="User name">User name
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="userDetail_table">
                            <div className='user_table_align'>
                                <Table dataSource={userdetails} columns={columns}
                                    pagination={{
                                        pageSize: 10,
                                        itemRender: itemRender
                                    }}></Table>
                                <h6 className="charity_data">Show of 1 to 11 of 43 rows</h6>

                            </div>
                            <div className="user_show">
                                {/* <Pagination className="charity_pagination" total={100} itemRender={itemRender} /> */}
                            </div>
                        </div>
                    </div>
                </div>}

            <>
                <Drawer
                    open={opened?.length > 1 ? true : false}
                    onClose={() => setOpened(null)}
                    className="post_create_drawer"
                    width={650}
                    placement="right"
                    closable={false}
                    title={<div className='create_post_sec'>
                        <Image loader={sanityIoImageLoader} alt="image" src={arrow} width="25"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpened(null)}
                        />
                        {opened === 'user' ? (
                            <h2>{userdata?.displayName}</h2>) : (<></>)}
                        {opened === 'statics' ? (
                            <h2>{userdata?.displayName}</h2>) : (<></>)}
                        {opened === 'message' ? (
                            <h2>Message user</h2>) : (<></>)}
                    </div>}
                >
                    {opened === 'user' ? (
                        <Userdetails userdata={userdata} />
                    ) : (<></>)}
                    {opened === 'statics' ? (
                        <Userstatics />
                    ) : (<></>)}
                    {opened === 'message' ? (
                        <MessageUser userdata={userdata} />
                    ) : (<></>)}
                </Drawer>
            </>
        </>

    )
}

export default authProtected(UserDetails);
