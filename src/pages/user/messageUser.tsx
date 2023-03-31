import Link from 'next/link'

import { Container, Title } from '@mantine/core'
import { Button, Form, Input } from 'antd'
import { useEffect } from 'react';

const { TextArea } = Input;

export const MessageUser: React.FC<any> = ({ userdata }) => {
    console.log(userdata, "userdata")
    const [form] = Form.useForm();
    useEffect(() => {
        if (userdata) {
            form.setFieldsValue(userdata);
        }
    }, [userdata]);
    return (
        <>
            <div className='message_form'>
                <Form layout="vertical" form={form}>
                    <Form.Item
                        className='user_form_item'
                        label={<p className='user_form_title'>To</p>}
                        name="displayName">
                        <Input className="input_height" />
                    </Form.Item>

                    <Form.Item
                        className='user_form_item'
                        label={<p className='user_form_title'>Registered mail id</p>}
                        name="email">
                        <Input className="input_height" />
                    </Form.Item>
                    <Form.Item
                        className='user_form_item'
                        required={false} rules={[{ required: true, message: "Please enter your Description" }]}
                        label={<p className='create_post_lable'>Message</p>}
                        name="message">
                        <TextArea rows={6} placeholder="Type here" className="textarea_height" />
                    </Form.Item>
                    <Form.Item className='send_bttn'>
                        <Button type="primary" htmlType="submit" className='create_bttn'>Send</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default MessageUser
