import Link from 'next/link'

import { Container, Title } from '@mantine/core'
import Image from 'next/image'
import user_pic from "../../assets/images/user_pic.svg";
import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';


export const Userdetails: React.FC<any> = ({ userdata }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (userdata) {
            form.setFieldsValue(userdata);
        }
    }, [userdata])
    return (
        <>
            <div className='user_details_page'>
                <div className='user_detaile'>
                    <h2 className='user_name'>User Details</h2>
                    <div className='user_profile'>
                        <Image src={user_pic} alt="user" />
                    </div>
                </div>
                <div className='user_details_form'>
                    <Form layout="vertical" form={form}>
                        <Form.Item
                            className='user_form_item'
                            label={<p className='user_form_title'>Name</p>}
                            name="displayName">
                            <Input className="input_height" />
                        </Form.Item>

                        <Form.Item
                            className='user_form_item'
                            label={<p className='user_form_title'>Date of birth</p>}
                            name="title">
                            <Input className="input_height" />
                        </Form.Item>
                        <Form.Item
                            className='user_form_item'
                            label={<p className='user_form_title'>Mail id</p>}
                            name="email">
                            <Input className="input_height" />
                        </Form.Item>
                        <Form.Item
                            className='user_form_item'
                            label={<p className='user_form_title'>Mobile number</p>}
                            name="phoneNumber">
                            <Input className="input_height" />
                        </Form.Item>
                        <Form.Item
                            className='user_form_item'
                            label={<p className='user_form_title'>Address</p>}

                            name="locale">
                            <Input className="input_height" />
                        </Form.Item>
                    </Form>
                </div>
                <div className='bank_details'>
                    <h2 className='bank_head'>User Bank Details</h2>
                    <div className='user_bank_details'>
                        <div className='gray_back'>
                            <div className='account_details'>
                                <h2 className='user_account'>2343 5612 0754</h2>
                                <h2 className='user_bank'>HDFC credit card</h2>
                            </div>
                            <h2 className='user_bank'>VISA</h2>
                        </div>
                        <div className='gray_back'>
                            <div className='account_details'>
                                <h2 className='user_account'>2343 5612 0754</h2>
                                <h2 className='user_bank'>HDFC credit card</h2>
                            </div>
                            <h2 className='user_bank'>VISA</h2>
                        </div>
                        <div className='gray_back'>
                            <div className='account_details'>
                                <h2 className='user_account'>2343 5612 0754</h2>
                                <h2 className='user_bank'>HDFC credit card</h2>
                            </div>
                            <h2 className='user_bank'>VISA</h2>
                        </div>
                        <div className='gray_back'>
                            <div className='account_details'>
                                <h2 className='user_account'>2343 5612 0754</h2>
                                <h2 className='user_bank'>HDFC credit card</h2>
                            </div>
                            <h2 className='user_bank'>VISA</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userdetails
