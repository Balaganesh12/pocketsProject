import { useMutation, useQuery } from "@apollo/client";
import { Input, Button, Select, Form } from "antd";
import { useEffect, useState } from "react";
import { REPORT_OPTIONS, PROJECT_REPORT_TICKETS } from '../../helpers';
import { useUserData } from '@nhost/nextjs'

export const Raiseticketproject: React.FC<any> = ({ createdata, TicketModal, clickDrawn }) => {
  const { TextArea } = Input;
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
  const [Projectreport, { loading: contactloading, error: contacterror, data: contactdataAddress }] =
    useMutation(PROJECT_REPORT_TICKETS, {
      errorPolicy: "all",
    });

  useEffect(() => {
    if (getreport) {
      let ReportOption = getreport?.mst_post_report?.map((data) => {
        return data?.mst_report_options
      });
      // const ids = ReportOption.map(o => o?.option_name)
      // const filtered = ReportOption.filter(({ option_name }, index) => !ids.includes(option_name, index + 1))
      var uniq = {};
      var arrFiltered = ReportOption.filter(obj => !uniq[obj?.option_name] && (uniq[obj?.option_name] = true));
      let filteroption_name = arrFiltered?.filter((data) => {
        return data
      })
      setReportOptions(filteroption_name);
    }
  }, [getreport])

  const handleFinish = (ProjectFormData) => {

    ProjectFormData.project_id = createdata?.id;
    ProjectFormData.user_id = user?.id;
    ProjectFormData.ngo_id = createdata?.ngo_id;
    ProjectFormData.status = "INPROGRASS";

    Projectreport({
      variables: ProjectFormData

    }).then((response) => {
      if (response.errors) {
      } else {

        TicketModal(true);
        clickDrawn(null);
      }
    });
  }
  return (
    <>
      <div className="raise_ticket_page">
        <div>
          <h1>Ticket details</h1>
        </div>

        <div>
          <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item label="MultiSelect reason" name="option_name" >

              <Select
                className="input_height"
                placeholder="MultiSelect reason for raising ticket"
              >
                {reportOptions?.map((project) => (
                  <Select.Option key={project?.option_name} value={project?.option_name}>
                    {project?.option_name}
                  </Select.Option>))}
              </Select>

            </Form.Item>

            <Form.Item label="Description">
              <TextArea placeholder="Description of your project" rows={2} />
            </Form.Item>


            <div className="project_raise_bttn">
              <Button className="priview_bttn">Cancel</Button>
              <Form.Item>
                <Button type="primary" htmlType="submit" className='create_bttn'>Raise request</Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Raiseticketproject;
