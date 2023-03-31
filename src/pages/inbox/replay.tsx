import React from 'react'
import { Form, Input, Button } from "antd";

export const replay: React.FC<any> = () => {
  
    const [form] = Form.useForm();
    const { TextArea } = Input
    return (
      <>
        <div className="total_project_drawer">
          <Form layout="vertical" form={form}>
            <Form.Item required={false} label={<p className='create_inbox_table'>To</p>}
              name="name" className='charity_input'>
              <Input className="input_height" ></Input>
            </Form.Item>

            <Form.Item required={false} label={<p className='create_inbox_table'>Registered mail id</p>}
              name="name" className='charity_input'>
              <Input className="input_height" ></Input>
            </Form.Item>

            <Form.Item required={false} label={<p className='create_inbox_table'>Reply message</p>}
              name="name" className='charity_input'>
              <TextArea className="input_height" ></TextArea>
            </Form.Item>
           
            <Form.Item>
              <Button type="ghost" htmlType="submit" className='create_inbox_btn'>Reply</Button>
              <Button type="ghost" htmlType="submit" className='create_inbox_reply_btn'>Save to Draft</Button>
            </Form.Item>
  
          </Form>
        </div>
      </>
    );
  };
  
  export default replay
