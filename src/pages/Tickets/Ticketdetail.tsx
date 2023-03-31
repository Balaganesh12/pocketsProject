import { Form, Input, Row, Col, DatePicker, Button } from "antd";
import { useEffect, useState } from "react";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { GET_PROJECT, UPDATE_REPORT } from "../../helpers/queries";
import { useQuery, useMutation } from "@apollo/client";

export const Ticketdetail: React.FC<any> = ({ ReportDatas }) => {
  console.log(ReportDatas, "ReportDatas");

  const [form] = Form.useForm();
  const [raisedon, setRaisedon] = useState(null);
  const { TextArea } = Input;

 
  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });
  console.log(dataProject, "dataProject");

  const [UpdateReport, { loading: loading, error: error, data: dataAddress }] =
    useMutation(UPDATE_REPORT, {
      errorPolicy: "all",
    });

 const ticketFinish = () => {
    let ReportUpdateObject = JSON.parse(JSON.stringify(ReportDatas));
    ReportUpdateObject.id = ReportUpdateObject.id;
    ReportUpdateObject.status = ReportUpdateObject.status;
    
    UpdateReport({
      variables: ReportUpdateObject,
    }).then((response)=>{
      if(response.errors){
        console.log(response.errors);
      }else{
        refetchProject()
      }
    })
    
  };
  let filterticket = ReportDatas?.mst__project?.id;
  console.log(filterticket, "filterticket");

  // useEffect(() => {

  // }, [ReportDatas]);
  const onChangeRaisedon: DatePickerProps["onChange"] = (dateString) => {
    setRaisedon(dateString.format("YYYY-MM-D"));
  };
  useEffect(() => {
    if (ReportDatas) {
      let reportObject = JSON.parse(JSON.stringify(ReportDatas));
      console.log(reportObject, "reportObject");

      reportObject.name = reportObject.user.metadata.name;

      let projectId = dataProject?.mst__projects;
      console.log(projectId, "projectId");

      let filterProjectName = projectId?.filter(
        (data) => data.id === filterticket
      );
      let filterName = filterProjectName?.map((projname) => {
        return projname?.name;
      });
      reportObject.projectname = filterName?.toString();
      reportObject.created_at = dayjs(reportObject.mst_ngo.created_at);
      reportObject.option_name = reportObject.mst_report_options.option_name;
      form.setFieldsValue(reportObject);
    }
  }, [ReportDatas]);
  return (
    <div className="total_ticketuser">
      <Form layout="vertical" onFinish={ticketFinish} form={form}>
        <Row gutter={12}>
          <Col md={12}>
            <Form.Item
              label="Raised by"
              name="name"
              className="ticketuser_list"
            >
              <Input placeholder="John" disabled />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label="Raised on"
              name="created_at"
              className="ticketuser_list"
            >
              <DatePicker
                onChange={onChangeRaisedon}
                placeholder="Select date"
                disabled
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Report type"
          name="option_name"
          className="ticketuser_list"
        >
          <Input placeholder="Report" disabled />
        </Form.Item>

        <Form.Item
          label="Reported project"
          name="projectname"
          className="ticketuser_list"
        >
          <Input placeholder="Report project" disabled />
        </Form.Item>

        <Form.Item label="Message" name="message" className="ticketuser_list">
          <TextArea rows={5} disabled />
        </Form.Item>

        <Form.Item className="message_ticket_section">
          <Button className="message_chat_btn">Chat with user</Button>
          <Button className="message_complete_btn" htmlType="submit">
            Completed
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Ticketdetail;
