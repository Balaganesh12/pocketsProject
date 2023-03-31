import { GET_PROJECT, GET_PROJECT_CATEGORIES } from "../../helpers/queries";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Carousel, Tag } from "antd";
import moment from "moment";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
};

export const Previewproject: React.FC<any> = ({ previewProjectData }) => {
  console.log(previewProjectData, "previewProjectDatapreviewProjectData");
  const [projectdata, setProjectdata] = useState([]);
  const [projectname, setProjectname] = useState([]);
  const [projectimage, setProjectimage] = useState([]);
  const [projectphotos, setProjectphotos] = useState([]);

  console.log(projectimage, "setProjectimage");
  const {
    error: projectError,
    loading: projectLoading,
    data: dataProject,
    refetch: refetchProject,
  } = useQuery(GET_PROJECT, {
    variables: {},
  });
  const {
    error: Error,
    loading: Loading,
    data: dataProjectCategories,
    refetch: refetchProjectCategories,
  } = useQuery(GET_PROJECT_CATEGORIES, {
    variables: {},
  });

  console.log(dataProjectCategories, "dataProjectCategories");

  useEffect(() => {
    if (dataProject) {
        setProjectdata(dataProjectCategories?.mst__projects);
    }
  }, [dataProjectCategories]);

  useEffect(() => {
    let filterData = dataProjectCategories?.project_categories?.find(
      (val) => val?.id === previewProjectData?.project_categories_id
    );
    console.log(filterData, "filterDataproject");
    let Projectname = filterData?.name;
    setProjectname(Projectname);
    setProjectimage(previewProjectData?.image.split(/[,]/));
    setProjectphotos(previewProjectData?.photos.split(/[,]/));

  }, [previewProjectData]);

  let startDate = moment(previewProjectData?.start_date).format("YYYY-MM-D");
  return (
    <>
      <div className="total_preview_project">
        <div className="total_preview_project_header">
        <h2>Preview details</h2>
        </div>
        
        <div>
          <Carousel
            autoplay
            arrows
            nextArrow={<RightOutlined />}
            prevArrow={<LeftOutlined />}
          >
            {projectimage.map((projectImage) => {
              return (
                <Image
                  src={projectImage}
                  alt="projectimage"
                  width={500}
                  height={200}
                  loader={sanityIoImageLoader}
                />
              );
            })}
          </Carousel>
        </div>
        <div className="project_preview_name">
          <h2>{previewProjectData?.name}</h2>
          <h6>Posted on: {startDate}</h6>
        </div>
        <div className="project_preview_tag">
          <Tag>{projectname}</Tag>
          <Tag>{previewProjectData?.charity_type}</Tag>
          <Tag>{previewProjectData?.donation_type}</Tag>
          <Tag>Lisence:{previewProjectData?.license_no}</Tag>
        </div>
        <p className="project_preview_description">{previewProjectData?.description}</p>
        <div className="project_preview_amnt">
          <h3>Total amount</h3>
          <h6>£{previewProjectData?.amount_target}</h6>
         
        </div>
        <div className="project_preview_date">
            <h3>End date</h3>
            <h6>{previewProjectData?.close_date}</h6>
        </div>

        <div>
          <Carousel
            autoplay
            arrows
            nextArrow={<RightOutlined />}
            prevArrow={<LeftOutlined />}
          >
            {projectphotos.map((projectImage) => {
              return (
                <Image
                  src={projectImage}
                  alt="projectimage"
                  width={500}
                  height={200}
                  loader={sanityIoImageLoader}
                />
              );
            })}
          </Carousel>
        </div>
        <div className="project_preview_detail">
            <p>{previewProjectData?.details}</p>
        </div>
      </div>
    </>
  );
};

export default Previewproject;
