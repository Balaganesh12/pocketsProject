import {
  Container,
  TextInput,
  Button,
  Card,
  Grid,
  Select,
  Table,
  Image,
  Notification,
} from "@mantine/core";
// import { Calendar } from '@mantine/dates';
import { url } from "inspector";
import projectnotify from "../assets/images/projectnotify.png";
import { useState } from "react";
import { Indicator } from "@mantine/core";

import { Calendar, Col, Radio, Row, Typography, theme } from "antd";

// import { NotificationBar } from '../pages/NotificationBar/NotificationBar'
// import CreateAcc from '../pages/Help/CreateAcc'
const elements = [
  {
    sno: "01",
    startdate: "05 June 2022",
    enddate: "13 Aug 2023",
    name: "Child in need",
    status: "Processing",
    amnt: "£1298",
  },
  {
    sno: "02",
    startdate: "05 June 2022",
    enddate: "13 Aug 2023",
    name: "Child in need",
    status: "Completed",
    amnt: "£1298",
  },
  {
    sno: "03",
    startdate: "05 June 2022",
    enddate: "13 Aug 2023",
    name: "Child in need",
    status: "Processing",
    amnt: "£1298",
  },
  {
    sno: "04",
    startdate: "05 June 2022",
    enddate: "13 Aug 2023",
    name: "Child in need",
    status: "Completed",
    amnt: "£1298",
  },
  {
    sno: "05",
    startdate: "05 June 2022",
    enddate: "13 Aug 2023",
    name: "Child in need",
    status: "Processing",
    amnt: "£1298",
  },
  {
    sno: "06",
    startdate: "05 June 2022",
    enddate: "13 Aug 2023",
    name: "Child in need",
    status: "Processing",
    amnt: "£1298",
  },
  {
    sno: "07",
    startdate: "05 June 2022",
    enddate: "13 Aug 2023",
    name: "Child in need",
    status: "Processing",
    amnt: "£1298",
  },
  {
    sno: "08",
    startdate: "05 June 2022",
    enddate: "13 Aug 2023",
    name: "Child in need",
    status: "Completed",
    amnt: "£1298",
  },
  {
    sno: "09",
    startdate: "05 June 2022",
    enddate: "13 Aug 2023",
    name: "Child in need",
    status: "Processing",
    amnt: "£1298",
  },
];

const notifydata = [
  {
    url: "/projectnotify.png",
    heading: "Janie, soni & 2 others commented in your post “Food Distribution",
    time: " (2hr ago)",
  },
  {
   url: "/projectnotify.png",
    heading: "Janie, soni & 2 others commented in your post “Food Distribution",
    time: " (2hr ago)",
  },
  {
   url: "/projectnotify.png",
    heading: "Janie, soni & 2 others commented in your post “Food Distribution",
    time: " (2hr ago)",
  },
  {
   url: "/projectnotify.png",
    heading: "Janie, soni & 2 others commented in your post “Food Distribution",
    time: " (2hr ago)",
  },
];


export const projectwise: React.FC = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);

  const { token } = theme.useToken();


  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <>
      
        <div>
          <Grid>
            <Grid.Col span={9}>
              <div className="project_table_head">
                <h2>Project wise collection</h2>
                <div className="project_select">
                  <Select
                    placeholder="Filter by"
                    data={[
                      { value: "react", label: "React" },
                      { value: "ng", label: "Angular" },
                      { value: "svelte", label: "Svelte" },
                      { value: "vue", label: "Vue" },
                    ]}
                  />
                </div>
              </div>
              <div className="project_table">
                <Table>
                  <thead>
                    <tr className="project_table_">
                      <th>S.No</th>
                      <th>Charity name</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Status</th>
                      <th>Amount collected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {elements.map((element) => (
                      <tr
                        key={element.name}
                        className="project_table_data"
                        style={{ marginBottom: "5px", marginTop: "5px" }}
                      >
                        <td>{element.sno}</td>
                        <td>{element.name}</td>
                        <td>{element.startdate}</td>
                        <td>{element.enddate}</td>
                        <td>{element.status}</td>
                        <td>{element.amnt}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Grid.Col>
            <Grid.Col span={3}>
              <h1>Notifications</h1>
            
            </Grid.Col>
          </Grid>
        </div>
      
    </>
  );
};

export default projectwise;
