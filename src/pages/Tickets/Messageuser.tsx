import { Form, Input,Button } from "antd";

export const Messageuser: React.FC = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const messageFinish = (val) => {
    console.log(val, "message");
  };
  return (
    <div className="total_messageuser">
      <Form layout="vertical" onFinish={messageFinish} form={form}>
        <Form.Item label="To" name="to" className="messageuser">
          <Input placeholder="Ex:Jhon" />
        </Form.Item>
        <Form.Item label="Registered mail id" className="messageuser">
          <Input placeholder="Ex:Jhon@gmail.com" />
        </Form.Item>
        <Form.Item label="Message" name="message" className="messageuser">
          <TextArea placeholder="Type here" rows={5} />
        </Form.Item>
        <Form.Item className="message_send_btn">
            <Button>Send</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Messageuser;
