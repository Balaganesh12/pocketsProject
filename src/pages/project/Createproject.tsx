import Link from "next/link";
import { Form, Upload, message, DatePicker, Row, Col, Drawer } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Input, Button, Card, Grid, Select, Modal } from "antd";
import { useEffect, useState } from "react";
import type { UploadProps } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GET_PROJECT,
  CREATE_PROJECT,
  CREATE_PROJECT_DONATION,
  EDIT_PROJECT,
  GET_PROJECT_CATEGORIES,
  NGO_USER,
} from "../../helpers/queries";
import uploadimage from "../../assets/images/uploadimage.png";
import Image from "next/image";
import moment from "moment";
import Danger from "../../assets/images/Danger.png";
import ProductCardLoader from "../../components/loader";
import { useUserData } from "@nhost/nextjs";
import arrow from "../../assets/images/postImage/arrow-left.svg";
import Previewproject from "./Previewproject";
import tickcircle from "../../assets/images/tick-circle.svg";
import type { DatePickerProps } from "antd";

export const Createproject: React.FC<any> = ({
  createdata,
  clickDrawn,
  clickModal,
  clickEditModal,
  editPage,
  charityId,
}) => {
  console.log(createdata, "createdata");
  const user = useUserData();
  const [form] = Form.useForm();
  const [urlList, setUrlList] = useState([] as any[]);
  const [photos, setPhotos] = useState([] as any[]);
  const [closedate, setClosedate] = useState(null);
  const [beneficiardob, setBeneficiarDob] = useState(null);
  const [ngoId, setNgoId] = useState<any>([]);
  const [previewProjectdata, setPreviewproject] = useState({});
  const [opened, setOpened] = useState("");
  const [beneficiar, setBeneficier] = useState("");
  const [projectcreateModal, setprojectcreateModal] = useState(false);
  const [projectEditModal, setprojectEditModal] = useState(false);

  console.log(closedate, "closedateclosedate");
  const { Dragger } = Upload;
  const {
    error: ngoError,
    loading: ngoLoading,
    data: ngoData,
    refetch: refetchngo,
  } = useQuery(NGO_USER, {
    variables: {
      id: user?.id,
    },
  });
  useEffect(() => {
    let ngoId = ngoData?.mst__ngos.map((data) => {
      return data?.id;
    });
    setNgoId(ngoId);
  }, [ngoData]);

  useEffect(() => {
    if (createdata) {
      let createObject = JSON.parse(JSON.stringify(createdata));
      console.log(createObject, "createObject");
      createObject.project_categories_id = createObject?.project_category?.id;
      setUrlList(createdata.image.split(","));
      // createObject.image = createdata.image;
      createObject.close_date = dayjs(createdata.close_date);
      createObject.start_date = dayjs(createdata.start_date);
      form.setFieldsValue(createObject);
    }
  }, [createdata]);

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

  const categorieData = dataProjectCategories?.project_categories;
  console.log(dataProjectCategories, "dataProjectCategories");

  const ImageUploaderProp: any = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const uploadImages = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "e64lfyvm");
        data.append("cloud_name", "hysas-techology");
        fetch(" https://api.cloudinary.com/v1_1/hysas-techology/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            setUrlList((urlList) => [...urlList, data.url]);
          })
          .catch((err) => console.log(err));
        onSuccess("Ok");
      }
    } catch (err) {
      onError({ err });
    }
  };

  const { TextArea } = Input;

  const onChangedate: DatePickerProps["onChange"] = (dateString) => {
    setClosedate(dateString?.format("YYYY-MM-D"));
    console.log(dateString, "dateString");
  };

  const onChangeDOB: DatePickerProps["onChange"] = (dateString) => {
    setBeneficiarDob(dateString.format("YYYY-MM-D"));
  };

  console.log(dataProject, "dataProject");
  const projetdata = dataProject?.mst__projects;

  console.log(projetdata, "projetdataaa");

  let categorydata = projetdata?.map((project) => {
    console.log(project, "projectqwer");
    return project?.project_category?.name;
  });

  console.log(categorydata, "categorydataqwertyui");

  const uploadPhotos = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "e64lfyvm");
        data.append("cloud_name", "hysas-techology");
        fetch(" https://api.cloudinary.com/v1_1/hysas-techology/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            setPhotos((Photos) => [...Photos, data.url]);
          })
          .catch((err) => console.log(err));
        onSuccess("Ok");
      }
    } catch (err) {
      onError({ err });
    }
  };

  const [
    createProject,
    { loading: contactloading, error: contacterror, data: contactdataAddress },
  ] = useMutation(CREATE_PROJECT, {
    errorPolicy: "all",
  });

  const [
    createProjectDonation,
    {
      loading: donationloading,
      error: donationerror,
      data: donationdataAddress,
    },
  ] = useMutation(CREATE_PROJECT_DONATION, {
    errorPolicy: "all",
  });

  const [editProject, { loading: loading, error: error, data: dataAddress }] =
    useMutation(EDIT_PROJECT, {
      errorPolicy: "all",
    });

  const Createfinish = (ProjectFormData: any) => {
    console.log(ProjectFormData, "ProjectFormData");
    if (createdata) {
      console.log(createdata, "createdataval");
      ProjectFormData.id = createdata.id;
      ProjectFormData.image = urlList.toString();
      ProjectFormData.is_active = createdata.is_active;
      ProjectFormData.ngo_id = ngoId.toString();
      editProject({
        variables: ProjectFormData,
      }).then((response) => {
        if (response?.errors) {
          console.log(response?.errors);
        } else {
          refetchProject();
          clickDrawn(null);
          clickEditModal(true);
          editPage(true);
        }
      });
    } else {
      ProjectFormData.image = urlList.toString();
      ProjectFormData.photos = photos.toString();
      ProjectFormData.start_date = moment();
      ProjectFormData.close_date = closedate;
      ProjectFormData.sponsorship_dob = dayjs(beneficiardob);
      ProjectFormData.is_active = true;
      ProjectFormData.ngo_id = charityId ? charityId : ngoId.toString();

      createProject({
        variables: ProjectFormData,
      }).then((response) => {
        console.log(response, "responseproject");
        if (response.errors) {
          console.log(response.errors);
        } else {
          refetchProject();
          clickDrawn(null);
          clickModal(true);
        }
      });
    }
  };

  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };

  const PreviewprojectClick = () => {
    let closedate = moment().format("YYYY-MM-D");
    let formValue = form.getFieldsValue();
    formValue.image = urlList.toString();
    formValue.photos = photos.toString();
    formValue.start_date = moment();
    formValue.close_date = closedate;

    setPreviewproject(formValue);
    setOpened("previewproject");
  };

  return (
    <>
      {loading || contactloading ? (
        <ProductCardLoader />
      ) : (
        <>
          <div className="create_project_page">
            <div className="primary_project">
              <h5>Primary Project details</h5>
              <p>Clear all</p>
            </div>
            <Form layout="vertical" onFinish={Createfinish} form={form}>
              <Form.Item
                label="Title"
                name="name"
                className="label_font"
                required={false}
                rules={[{ required: true, message: "Please enter your Title" }]}
              >
                <Input
                  placeholder="Title of your project"
                  className="input_height title_project"
                />
              </Form.Item>
              <Row gutter={12}>
                <Col md={10}>
                  <Form.Item
                    label="Charity type"
                    name="charity_type"
                    className="label_font"
                    required={false}
                    rules={[
                      { required: true, message: "Please select Charity type" },
                    ]}
                  >
                    <Select
                      className="input_height select_type_hover"
                      placeholder="Select Charity type"
                      autoFocus={false}
                      options={[
                        { value: "Medical", label: "Medical" },
                        { value: "Education", label: "Education" },
                        { value: "Building", label: "Building" },
                        { value: "Fund", label: "Fund" },
                        { value: "Other", label: "Other" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Donation Type"
                    name="donation_type"
                    className="label_font"
                    required={false}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Donation Type",
                      },
                    ]}
                  >
                    <Select
                      className="input_height select_type_hover"
                      placeholder="Select type"
                      options={[
                        { value: "Donation", label: "Donation" },
                        { value: "Sponsorship", label: "Sponsorship" },
                      ]}
                      onChange={(e: any) => setBeneficier(e)}
                    />
                  </Form.Item>
                </Col>
                <Col md={10}>
                  <Form.Item
                    label="Category"
                    name="project_categories_id"
                    className="label_font"
                    required={false}
                    rules={[
                      { required: true, message: "Please select Category" },
                    ]}
                  >
                    <Select
                      className="input_height select_type_hover"
                      placeholder="Select Category"
                    >
                      {categorieData?.map((a) => (
                        <Select.Option key={a?.id} value={a?.id}>
                          {a?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="License No."
                    name="license_no"
                    className="label_font license_no"
                    required={false}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your License No",
                      },
                    ]}
                  >
                    <Input placeholder="Ex.25697456210" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Upload thumbnail photo"
                name="image"
                className="label_font"
                // required={false} rules={[{ required: true, message: "Please  Upload your thumbnail photo" }]}
              >
                <Dragger
                  {...ImageUploaderProp}
                  name="file"
                  customRequest={uploadImages}
                  className="dragger_image"
                >
                  <p className="ant-upload-drag-icon">
                    <Image
                      loader={sanityIoImageLoader}
                      alt="image"
                      src={uploadimage}
                    />
                  </p>
                  <p>
                    Drag & drop or <span className="browse_upload">Browse</span>
                  </p>
                  <p className="ant-upload-text">
                    <span className="upload_content">
                      Photo formates: JPEG, PNG, (maximum image size 2 mb).
                    </span>
                  </p>
                </Dragger>
                <div className="danger_alert">
                  <Image
                    loader={sanityIoImageLoader}
                    alt="image"
                    src={Danger}
                  />
                  <p>Upload a photo for thumbnail.</p>
                </div>
              </Form.Item>

              <div>
                {urlList.map((images) => {
                  return (
                    <Image
                      loader={sanityIoImageLoader}
                      alt="image"
                      width="100"
                      height="100"
                      src={images}
                    />
                  );
                })}
              </div>

              <Form.Item
                label="Description"
                name="description"
                className="label_font"
                required={false}
                rules={[
                  { required: true, message: "Please enter your Description" },
                ]}
              >
                <TextArea placeholder="Description of your project" rows={5} />
              </Form.Item>
              {beneficiar === "Sponsorship" ? (
                <>
                  <h3>Beneficiary details</h3>
                  <Row gutter={12}>
                    <Col md={8}>
                      <Form.Item
                        label="Name"
                        name="sponsorship_name"
                        className="label_font beneficiary"
                      >
                        <Input placeholder="Ex.Jhon" />
                      </Form.Item>
                    </Col>
                    <Col md={8}>
                      <Form.Item
                        label="D.O.B"
                        name="sponsorship_dob"
                        className="label_font beneficiary"
                      >
                        <DatePicker
                          onChange={onChangeDOB}
                          placeholder="Select date"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={8}>
                      <Form.Item
                        label="Age"
                        name="sponsorship_age"
                        className="label_font beneficiary"
                      >
                        <Input placeholder="16" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Story" name="story" className="label_font ">
                    <TextArea rows={3} />
                  </Form.Item>
                </>
              ) : (
                <></>
              )}

              <h3>Other Project details</h3>
              <Row gutter={12}>
                <Col>
                  <Form.Item
                    label="Total Amount"
                    name="amount_target"
                    className="label_font total_amount"
                    required={false}
                    rules={[
                      { required: true, message: "Please enter Total Amount" },
                    ]}
                  >
                    <Input placeholder="Ex. £ 2000" className="input_height" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="End Date"
                    name="close_date"
                    className="label_font date_picker"
                    required={false}
                    rules={[
                      { required: true, message: "Please enter End Date" },
                    ]}
                  >
                    <DatePicker
                      onChange={onChangedate}
                      defaultValue={dayjs("2015/01/01", "YYYY/MM/DD")}
                      className="datepicker_inside"
                      disabledDate={(current) => {
                        let customDate = moment().format("YYYY-MM-DD");
                        return (
                          current && current < moment(customDate, "YYYY-MM-DD")
                        );
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Upload Photos / videos for gallery"
                name="photos"
                className="label_font"
                // required={false} rules={[{ required: true, message: "Please Upload your Photos or videos" }]}
              >
                <Dragger
                  {...ImageUploaderProp}
                  name="file"
                  customRequest={uploadPhotos}
                  className="dragger_image"
                >
                  <p className="ant-upload-drag-icon">
                    <Image
                      loader={sanityIoImageLoader}
                      alt="image"
                      src={uploadimage}
                    />
                  </p>
                  <p>
                    Drag & drop or <span className="browse_upload">Browse</span>
                  </p>
                  <p className="ant-upload-text">
                    <span className="upload_content">
                      Photo formates: JPEG, PNG, (maximum image size 2 mb).
                    </span>
                  </p>
                  <p className="ant-upload-hint">
                    <span className="upload_content">
                      Video formates: mp4, (maximum video size 2 mb, duration
                      within 20 mins).
                    </span>
                  </p>
                </Dragger>
                <div className="danger_alert">
                  <Image
                    loader={sanityIoImageLoader}
                    alt="image"
                    src={Danger}
                  />
                  <p>maximum 10 slides</p>
                </div>
              </Form.Item>

              <div>
                {photos.map((images) => {
                  return (
                    <Image
                      loader={sanityIoImageLoader}
                      alt="image"
                      width="100"
                      height="100"
                      src={images}
                    />
                  );
                })}
              </div>

              <Form.Item
                label="Details"
                name="details"
                className="label_font"
                required={false}
                rules={[
                  { required: true, message: "Please enter your Details" },
                ]}
              >
                <TextArea placeholder="Details of your project" rows={3} />
              </Form.Item>
              <>
                <Drawer
                  open={opened?.length > 1 ? true : false}
                  onClose={() => setOpened(null)}
                  width={650}
                  placement="right"
                  closable={false}
                  title={
                    <div className="create_proj_preview">
                      <Image
                        loader={sanityIoImageLoader}
                        alt="projectpreview"
                        src={arrow}
                        width="25"
                        onClick={() => setOpened(null)}
                      />
                      <h2>Preview</h2>
                    </div>
                  }
                >
                  {opened === "previewproject" ? (
                    <Previewproject previewProjectData={previewProjectdata} />
                  ) : (
                    <></>
                  )}
                </Drawer>
              </>
              <div className="project_create_btn">
                <Button
                  className="preview_btn"
                  onClick={() => PreviewprojectClick()}
                >
                  Preview
                </Button>
                <Form.Item>
                  <Button
                    className="create_project_btn_project"
                    type="primary"
                    htmlType="submit"
                  >
                    {createdata ? "Update Project" : "Create Project"}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default Createproject;
