import React, { useEffect, useState } from 'react';

import { Avatar, Badge, Button, Drawer, Form, Input, InputNumber, Modal, Popover, Select, Space } from "antd"
import { AntDesignOutlined } from '@ant-design/icons';
const { TextArea } = Input
import editprofile from "../../assets/images/edit_pencil.svg"
import donors from "../../assets/images/donors.png"
import token from "../../assets/images/token.png"
import charityprofile from "../../assets/images/charityprofile.png"
import edit from "../../assets/images/edit.png";
import upload from "../../assets/images/upload.png";
import arrow from '../../assets/images/arrow-left.png'
import Adminlogo from "../../assets/images/admin logo.svg";
import tickcircle from "../../assets/images/tick-circle.svg";
import downarrow from "../../assets/images/downarrow.svg";

import { useUserData } from '@nhost/nextjs'

import Image from "next/image";
import Uploadimage from "./Uploadimage";
import { authProtected } from '../../components/protected-route';
import { GET_BYID_NGO, NGO_USER, GET_COUNTRY, NGO_PROFILE_FIELD_UPDATE } from '../../helpers';
import { useMutation, useQuery } from "@apollo/client";

export const UpdateProfile: React.FC = () => {
    const user = useUserData();
    console.log(user, "userdata")
    const [ngoId, setNgoId] = useState<any>([]);

    const [ngouser, setNgouser] = useState<any>([]);
    const [opened, setOpened] = useState('');
    const [form] = Form.useForm();
    const [postcreateModal, setpostcreateModal] = useState(false);
    const [posteditModal, setposteditModal] = useState(false);

    const [agree, setAgree] = useState(false);
    const [editagree, setEditAgree] = useState(false);

    const [admindata, setAdmindata] = useState<any>([]);
    const closeModal = (status) => {
        setOpened(status)
    }


    const clickModal = () => {
        setpostcreateModal(true);
    };
    const clickEditModal = () => {
        setposteditModal(true);


    };
    const postOkModal = () => {
        setpostcreateModal(false);
        setposteditModal(false);
        if (!agree) {
            setAgree(agree);
        } else {
            setAgree(!agree);

        }
        if (!editagree) {
            setEditAgree(editagree);
        } else {
            setEditAgree(!editagree);

        }
    };

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
        let ngoId = ngoData?.mst__ngos.map((data) => {
            return data?.id
        });
        setNgoId(ngoId);
        if (user) {
            setAdmindata(user);
        }
    }, [ngoData]);
    const sanityIoImageLoader = ({ src, width, quality }) => {
        return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
    }

    const {
        error: editError,
        loading: editLoading,
        data: dataedit,
        refetch: refetchedit,
    } = useQuery(GET_BYID_NGO, {
        variables: {
            id: ngoId?.toString()
        },
    });
    useEffect(() => {
        if (dataedit) {
            let Ngodata = dataedit?.mst__ngos
            setNgouser(Ngodata);
            Ngodata?.map((data) => {
                return form.setFieldsValue(data);
            })

        }
    }, [refetchedit(), dataedit])
    const [editNgoFileds, { loading: loading, error: error, data: dataAddress }] =
        useMutation(NGO_PROFILE_FIELD_UPDATE, {
            errorPolicy: "all",
        });

    const handleFinish = (fieldvalues) => {
        fieldvalues.id = ngoId?.toString();
        editNgoFileds({
            variables:
                fieldvalues
            ,
        }).then((response) => {
            if (response.errors) {
            } else {
                refetchedit();
                clickEditModal();
            }
        });
    }

    const checkboxHandler = () => {
        // if agree === true, it will be set to false
        // if agree === false, it will be set to true
        setAgree(!agree);
        // Don't miss the exclamation mark
    }
    const editHandler = () => {
        // if agree === true, it will be set to false
        // if agree === false, it will be set to true
        setEditAgree(!editagree);
        // Don't miss the exclamation mark
    }

    const {
        error: countryError,
        loading: countryLoading,
        data: dataCountry,
        refetch: refetchCountry,
    } = useQuery(GET_COUNTRY, {
        variables: {
        }
    });

    const CountryData = dataCountry?.mst__countrys
    const content = (
        <div className={opened ? "popover_display" : ""}>
            <div className="More_list">
                <span><Image loader={sanityIoImageLoader} alt="image" src={edit} /></span>
                <h5 >Edit photo</h5>
            </div>
            <div className="More_list">
                <span><Image loader={sanityIoImageLoader} alt="image" className="items_list_logo" src={upload} /></span>
                <h5 onClick={() => setOpened("upload")}
                >Upload photo</h5>
            </div>


        </div>
    );
    return (
        <>

            <div className='Update_profile'>
                <h1 className="profile_head">Profile</h1>
                <div className="profile_update">
                    <div className="upload_image">
                        <div className="profile">
                            {ngouser?.map((data) => {
                                let profileImage = data?.logo
                                return <>
                                    {profileImage ? (
                                        <Image
                                            loader={sanityIoImageLoader}
                                            src={profileImage}
                                            width={180} height={180}
                                            alt="janifer"
                                        />
                                    ) :
                                        (
                                            <><p className='empty_profile'>No Profile</p></>


                                        )}
                                </>
                            })}

                        </div>

                        <div className="edit_profile" >
                            <Popover
                                placement="bottomRight"
                                content={content}
                                trigger="click"
                            >
                                <Image src={editprofile} width={40} height={40} loader={sanityIoImageLoader} alt="editprofile" />
                            </Popover>
                            <>
                                <Drawer
                                    open={opened?.length > 1 ? true : false}
                                    onClose={() => setOpened(null)}

                                    width={600}
                                    placement="right"
                                    closable={false}
                                    title={<div className='create_post_sec'>
                                        <Image loader={sanityIoImageLoader} alt="image" src={arrow} width="25"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setOpened(null)}
                                        />
                                        <h2>Upload photo</h2>

                                    </div>}
                                >
                                    {opened === "upload" ? (
                                        <>
                                            <Uploadimage closeModal={closeModal} clickModal={clickModal} />
                                        </>
                                    ) : (<></>)}



                                </Drawer>
                            </>
                        </div>


                    </div>
                    {admindata ? (<>
                        <div className="follower_details">
                            <h1>{admindata?.displayName}</h1>
                            <div className="followes">
                                <Image src={donors} loader={sanityIoImageLoader} alt="donors" />
                                <span className='font_follower'>30 <p className='follower_text'>followers</p></span>
                                <Image src={token} loader={sanityIoImageLoader} alt="token" />
                                <span className='font_follower'><p className='follower_text'>projects</p></span>
                            </div>
                        </div>
                    </>) : (<>
                        {ngouser?.map((data) => {
                            return <div className="follower_details">
                                <h1>Children In Need</h1>
                                <div className="followes">
                                    <Image src={donors} loader={sanityIoImageLoader} alt="donors" />
                                    <span className='font_follower'>30 <p className='follower_text'>followers</p></span>
                                    <Image src={token} loader={sanityIoImageLoader} alt="token" />
                                    <span className='font_follower'>{data?.mst__projects?.length} <p className='follower_text'>projects</p></span>
                                </div>
                            </div>
                        })}

                    </>)}

                </div>
                <div className="Account_sec">
                    <div className="accout_edit">
                        <h2 className='account_font'>Account Information</h2>
                        <Button className="edit_bttn" onClick={editHandler}>Edit</Button>
                    </div>
                    <div className="Account_form">
                        <Form disabled={!editagree} layout="vertical" className="form_align" form={form} onFinish={handleFinish}>
                            <Space direction="horizontal" className="form_space" size="middle" >

                                <Form.Item name="name" label={<p className='form_lable'>First Name</p>} >
                                    <Input size="large" className="account_inputbox" placeholder="Child" />
                                </Form.Item>
                                <Form.Item label={<p className='form_lable'>Last Name</p>} className="form_sec_two">
                                    <Input className="account_inputbox" size="large" placeholder="In Need" />
                                </Form.Item>
                            </Space>
                            <Space direction="horizontal" size="middle" className="form_space">

                                <Form.Item name="phone_number" label={<p className='form_lable'>Phone Number</p>}>
                                    <InputNumber size="large" className="account_inputbox" placeholder="+12 (2332) (2342)" />
                                </Form.Item>
                                <Form.Item name="email_id" label={<p className='form_lable'>Email</p>} className="form_sec_two">
                                    <Input className="account_inputbox" size="large" placeholder="childinneed342@gmail.com" />
                                </Form.Item>
                            </Space>
                            <Space direction="horizontal" size="middle" className="form_space">

                                <Form.Item name="country" label={<p className='form_lable'>Country</p>}>
                                    <Select placeholder="United kingdom"
                                        suffixIcon={
                                            <div className="select_arrow">
                                                <Image src={downarrow} alt="downarrow" />
                                            </div>
                                        } className="account_inputbox" >
                                        {CountryData?.map((country) =>
                                        (
                                            <Select.Option key={country?.id} value={country?.id}>
                                                {country.name}
                                            </Select.Option>)
                                        )}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="state" label={<p className='form_lable'>State</p>} className="form_sec_two">
                                    <Input className="account_inputbox" size="large" placeholder="England" />
                                </Form.Item>
                            </Space>
                            <Space direction="horizontal" size="middle" className="form_space">

                                <Form.Item name="postal_code" label={<p className='form_lable'>Zipcode</p>}>
                                    <Input className="account_inputbox" size="large" placeholder="MK77" />
                                </Form.Item>
                                <Form.Item name="preferred_currency" label={<p className='form_lable'>Preferred Currency</p>} className="form_sec_two">
                                    <Input className="account_inputbox" size="large" placeholder="Euro" />
                                    {/* <Select
                                        className="account_inputbox" size="large" placeholder="Euro"
                                        defaultValue="€ Euro"
                                        options={[
                                            { value: '€ Euro', label: '€ Euro' },
                                            { value: '$ USD', label: '$ USD' },
                                            { value: '₹ INR', label: '₹ INR' },
                                            { value: '£ POUND', label: '£ POUND', },
                                            { value: '$ AUD', label: '$ AUD', },

                                        ]}
                                    /> */}

                                </Form.Item>
                            </Space>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className='save_bttn'>Save</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                {user?.defaultRole === 'admin' ? (<></>) : (
                    <div className="about_sec">
                        <div className="accout_edit">
                            <h2 className='account_font'>About Us</h2>
                            <Button className="edit_bttn" onClick={checkboxHandler}>Edit</Button>
                        </div>
                        <div className="Account_form">
                            <Form disabled={!agree} layout="vertical" className="form_align" form={form} onFinish={handleFinish}>
                                <Form.Item name="our_story" label={<p className='form_lable'>Our Story</p>} >
                                    <TextArea size="large" className="account_inputbox" placeholder="Child" rows={6} />
                                </Form.Item>
                                <Form.Item name="our_mission" label={<p className='form_lable'>Our Vision</p>} >
                                    <TextArea size="large" className="account_inputbox" placeholder="Child" rows={6} />
                                </Form.Item>
                                <Form.Item>
                                    <Button disabled={!agree} type="primary" htmlType="submit" className='save_bttn'>Save</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>

                )}

            </div>
            <div>
                <Modal open={postcreateModal} footer={false} width="400px">
                    <div className="modal_project_success">
                        <Image
                            loader={sanityIoImageLoader}
                            src={tickcircle}
                            alt="tickcircle"
                        />
                        <h4>Success!</h4>
                        <p>Your photo has been uploaded.</p>
                        <div className="modal_project_success_btn">
                            <Button onClick={postOkModal}>Done</Button>
                        </div>
                    </div>
                </Modal>
            </div>
            <div>
                <Modal open={posteditModal} footer={false} width="400px">
                    <div className="modal_project_success">
                        <Image
                            loader={sanityIoImageLoader}
                            src={tickcircle}
                            alt="tickcircle"
                        />
                        <h4>Success!</h4>
                        <p>Your profile has been edited.</p>
                        <div className="modal_project_success_btn">
                            <Button onClick={postOkModal}>Done</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default authProtected(UpdateProfile)
