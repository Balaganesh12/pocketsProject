
import { Form, Input, message, Upload, Popover, Drawer, Button, Card, Select } from 'antd'

const { TextArea } = Input;

export const Raiseticket: React.FC = () => {
    return (
        <>
            <div className='search_raise_ticket'>
                <Form layout="vertical" className="forgot_username">


                    <Form.Item label="Select reason">

                        <Select
                            className="input_height"
                            placeholder="Select type"
                        >
                            <Select.Option value="Delete project">Delete project</Select.Option>
                            <Select.Option value="Edit project">Edit project</Select.Option>
                            <Select.Option value="Lorem ipsum ">Lorem ipsum </Select.Option>

                        </Select>
                    </Form.Item>
                    <Form.Item label="Discription">

                        <TextArea
                            placeholder="Enter briefly"
                            className="textarea_height"
                            rows={5}
                        />
                    </Form.Item>
                </Form>

                <div className='priview_sec'>
                    <Button className='priview_bttn'>Cancel</Button>
                    <Button className='create_bttn'>Raise request</Button>
                </div>
            </div>
        </>
    )
}

export default Raiseticket
