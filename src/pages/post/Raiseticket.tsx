
import { Form, Input, Button, Select } from 'antd'

const { TextArea } = Input;
import { useMutation, useQuery } from "@apollo/client";
import { REPORT_OPTIONS, POST_REPORT_TICKETS, NGO_USER } from '../../helpers';
import { useEffect, useState } from 'react';
import { useUserData } from '@nhost/nextjs'

export const Raiseticket: React.FC<any> = ({ postdata, TicketModal, closeModal }) => {
    const user = useUserData();
    const [reportOptions, setReportOptions] = useState<any>([]);



    const {
        error: getpostngo,
        loading: getpostngoload,
        data: getreport,
        refetch: refetchgetpost,
    } = useQuery(REPORT_OPTIONS, {
        variables: {
        },
    });

    const [Postreport, { loading: contactloading, error: contacterror, data: contactdataAddress }] =
        useMutation(POST_REPORT_TICKETS, {
            errorPolicy: "all",
        });
    useEffect(() => {
        if (getreport) {
            let ReportOption = getreport?.mst_post_report?.map((data) => {
                return data?.mst_report_options
            });
            var uniq = {};
            var arrFiltered = ReportOption.filter(obj => !uniq[obj?.option_name] && (uniq[obj?.option_name] = true));
            let filteroption_name = arrFiltered?.filter((data) => {
                return data
            })
            setReportOptions(filteroption_name);
        }
    }, [getreport])
    const handleFinish = (PostFormData) => {
        PostFormData.post_id = postdata?.id;
        PostFormData.user_id = user?.id;
        PostFormData.ngo_id = postdata?.ngo_id;
        PostFormData.project_id = postdata?.mst__project?.id;
        PostFormData.status = "INPROGRASS";

        Postreport({
            variables: PostFormData

        }).then((response) => {
            if (response.errors) {
            } else {
                TicketModal(true);
                closeModal(null);

            }
        });
    }

    return (
        <>
            <div className='total_raise_ticket'>
                <Form layout="vertical" className="forgot_username" onFinish={handleFinish}>


                    <Form.Item label="Select reason" name="option_name">

                        <Select
                            className="input_height"
                            placeholder="Select type"
                        >
                            {reportOptions?.map((project) => (
                                <Select.Option key={project?.option_name} value={project?.option_name}>
                                    {project?.option_name}
                                </Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Discription">

                        <TextArea
                            placeholder="Enter briefly"
                            className="textarea_height"
                            rows={5}
                        />
                    </Form.Item>
                    <div className='priview_sec'>
                        <Button className='priview_bttn'>Cancel</Button>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='create_bttn'>Raise request</Button>
                        </Form.Item>
                    </div>
                </Form>


            </div>
        </>
    )
}

export default Raiseticket
