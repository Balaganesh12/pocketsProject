import React, { useEffect, useState } from 'react';

import { Form, Input, message, Upload, Button, Card, Select, Drawer } from 'antd';
import { GET_POST, CREATE_POST, GET_PROJECT, GET_PROJECT_CATEGORIES, GET_POST_BY_NGOID, PROJECT_NGO_ID, EDIT_POST, NGO_USER } from '../../helpers/queries';
import { useUserData } from '@nhost/nextjs'
import { useMutation, useQuery } from "@apollo/client";
import uploadimage from "../../assets/images/postImage/uploadimage.svg"
import Image from 'next/image'
import Danger from "../../assets/images/postImage/Danger.svg"
import moment from "moment";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import arrow from '../../assets/images/postImage/arrow-left.svg'
// import Previewpost from "../post/Previewpost";
import ProductCardLoader from '../../components/loader';
import 'react-toastify/dist/ReactToastify.css';
import Previewpost from './Previewpost';
const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}

const { TextArea } = Input;

export const Createpost: React.FC<any> = ({ postdata, clickEditModal, closeModal, clickModal, charityId }) => {
    const user = useUserData();
    const [form] = Form.useForm();
    const [urlList, setUrlList] = useState([] as any[]);
    const [projectdata, setProjectdata] = useState([]);
    const [opened, setOpened] = useState('');
    const [previewdata, setPreviewdata] = useState({});
    const [ngoId, setNgoId] = useState<any>([]);
    const [projectID, setProjectID] = useState<any>([]);
    const { Dragger } = Upload;



    const {
        error: projectError,
        loading: projectLoading,
        data: dataProject,
        refetch: refetchProject,
    } = useQuery(PROJECT_NGO_ID, {
        variables: {
            ngo_id: ngoId.toString()
        },
    });
    const {
        error: getpostngo,
        loading: getpostngoload,
        data: getPostNgo,
        refetch: refetchgetpost,
    } = useQuery(GET_POST_BY_NGOID, {
        variables: {
            ngo_id: ngoId?.toString()
        },
    });
    const {
        error: ngoError,
        loading: ngoLoading,
        data: ngoData,
        refetch: refetchngo,
    } = useQuery(NGO_USER, {
        variables: {
            id: user?.id
        },
    });
    console.log(ngoData, "ngoData")
    useEffect(() => {
        let ngoId = ngoData?.mst__ngos.map((data) => {
            return data?.id
        });
        console.log(ngoId, "ngoId")
        setNgoId(ngoId);
    }, [ngoData]);
    useEffect(() => {
        if (dataProject) {
            let filterpostdata = dataProject?.mst__projects?.filter((data) => data.is_active === true && data.donation_type === "Donation")
            setProjectdata(filterpostdata);
        }
    }, [dataProject]);


    const {
        error: projecteditError,
        loading: projecteditLoading,
        data: dataeditProject,
        refetch: refetcheditProject,
    } = useQuery(GET_PROJECT, {
        variables: {},
    });

    useEffect(() => {
        if (user?.defaultRole === "admin") {
            const allProject = dataeditProject?.mst__projects;
            let filterpostdata = allProject?.filter((data) => data.is_active === true && data.donation_type === "Donation")
            if (charityId) {
                filterpostdata = filterpostdata?.filter((data) => data?.mst__ngo?.id === charityId)
                setProjectID(filterpostdata)
            }
            setProjectID(filterpostdata)

        }
    }, [])
    useEffect(() => {
        if (postdata) {
            let postObject = JSON.parse(JSON.stringify(postdata));
            postObject.project_id = postObject?.mst__project?.id
            setUrlList(postObject.image.split(','));
            postObject.image = postObject.image
            // const projetdata = dataeditProject?.mst__projects;

            // let Editproject = projetdata?.filter((data) => data.id === postObject?.project_id)
            // let projectname = Editproject?.map((project) => {
            //     return project?.name
            // });
            // postObject.project_id = projectname?.toString();
            form.setFieldsValue(postObject);
        }
    }, [postdata]);




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
                const data = new FormData()
                data.append("file", file);
                data.append("upload_preset", "e64lfyvm")
                data.append("cloud_name", "hysas-techology")
                fetch(" https://api.cloudinary.com/v1_1/hysas-techology/image/upload", {
                    method: "post",
                    body: data
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setUrlList(urlList => [...urlList, data.url]);
                    })
                    .catch(err => console.log(err));
                onSuccess("Ok");
            }
        } catch (err) {
            const error = new Error("Some error");
            onError({ err });
        }
    };

    const [createPost, { loading: contactloading, error: contacterror, data: contactdataAddress }] =
        useMutation(CREATE_POST, {
            errorPolicy: "all",
        });


    const [editPost, { loading: loading, error: error, data: dataAddress }] =
        useMutation(EDIT_POST, {
            errorPolicy: "all",
        });

    const {
        error: postError,
        loading: postLoading,
        data: dataPost,
        refetch: refetchPost,
    } = useQuery(GET_POST, {
        variables: {
        }
    });
    const handleSelect = (data) => {
        // props?.clickRow("Preview");
    }

    const Postonfinish = (PostFormData: any) => {
        let Postdate = moment().format('YYYY-MM-D');
        if (postdata) {
            PostFormData.id = postdata?.id;
            PostFormData.image = urlList.toString();
            PostFormData.ngo_id = ngoId.toString();
            PostFormData.amount_received = 10;
            PostFormData.amount_targeted = 10;
            PostFormData.post_date = Postdate;
            PostFormData.is_active = postdata.is_active;
            // PostFormData.project_id = PostFormData?.mst__project?.id

            editPost({
                variables: PostFormData,

            }).then((response) => {
                if (response.errors) {
                    toast.error("Server Error")
                } else {
                    toast.success("Post edit successfully")
                    refetchPost();
                    closeModal(null);
                    clickEditModal(true);
                    refetchgetpost();
                }
            });
        } else {
            PostFormData.image = urlList.toString();
            PostFormData.ngo_id = charityId ? charityId : ngoId.toString();
            PostFormData.amount_received = 10;
            PostFormData.amount_targeted = 10;
            PostFormData.post_date = Postdate;
            PostFormData.is_active = true;

            createPost({
                variables: PostFormData

            }).then((response) => {
                if (response.errors) {
                    toast.error("Server Error")
                } else {
                    toast.success("Post Created successfully")
                    refetchPost();
                    closeModal(null);
                    clickModal(true);
                    refetchgetpost();


                }
            });
        }


    }

    const previewOnClick = () => {
        let Postdate = moment().format('YYYY-MM-D');
        let formValue = form.getFieldsValue();
        formValue.image = urlList.toString();
        formValue.post_date = Postdate;

        setPreviewdata(formValue);
        setOpened("preview");
    }
    return (
        <>
            <ToastContainer />
            {loading || contactloading ? <ProductCardLoader /> :
                <div className='total_createsec'>

                    <div className='form_post'>
                        <h2>Post details</h2>
                        <Form layout="vertical" className="forgot_username" onFinish={Postonfinish} form={form}>
                            {user?.defaultRole === "admin" ? (<>
                                <Form.Item
                                    required={false} rules={[{ required: true, message: "Please select your Project Name" }]}
                                    label={<p className='create_post_lable'>Project Name</p>}
                                    name="project_id">

                                    <Select className="input_height" placeholder="Select type"  >
                                        {projectID?.map((project) => (
                                            <Select.Option key={project?.id} value={project?.id}>
                                                {project?.name}
                                            </Select.Option>))}
                                    </Select>
                                </Form.Item>
                            </>) : (<>
                                <Form.Item
                                    required={false} rules={[{ required: true, message: "Please select your Project Name" }]}
                                    label={<p className='create_post_lable'>Project Name</p>}
                                    name="project_id">

                                    <Select className="input_height" placeholder="Select type"  >
                                        {projectdata?.map((project) => (
                                            <Select.Option key={project?.id} value={project?.id}>
                                                {project?.name}
                                            </Select.Option>))}
                                    </Select>
                                </Form.Item>
                            </>)}

                            <Form.Item
                                label={<p className='create_post_lable'>Title</p>}
                                required={false} rules={[{ required: true, message: "Please enter your Title" }]}
                                name="title">
                                <Input className="input_height" placeholder="Type your title" />
                            </Form.Item>
                            <Form.Item
                                required={false} rules={[{ required: true, message: "Please enter your Description" }]}
                                label={<p className='create_post_lable'>Description</p>}
                                name="description">
                                <TextArea rows={4} placeholder="More about the post" className="textarea_height" />
                            </Form.Item>
                            <Form.Item
                                name="image"
                                // required={false} rules={[{ required: true, message: "Please Upload your Photos / videos" }]}
                                label={<p className='create_post_lable'>Upload Photos / videos</p>}
                            >
                                <Dragger {...ImageUploaderProp} name="file"
                                    customRequest={uploadImages} className="dragger" style={{ width: "90%", border: "2px dashed #7FACD6", }}>
                                    <p className="ant-upload-drag-icon">
                                        <Image loader={sanityIoImageLoader} alt="image" src={uploadimage} />
                                    </p>
                                    <p>Drag & drop or Browse</p>
                                    <p className="ant-upload-text">
                                        Photo formates: JPEG, PNG, (maximum image size 2 mb).
                                    </p>
                                    <p className="ant-upload-hint">
                                        Video formates: mp4, (maximum video size 2 mb, duration
                                        within 20 mins).
                                    </p>
                                </Dragger>
                                <div className='danger_alert'>
                                    <Image loader={sanityIoImageLoader} alt="image" src={Danger} />
                                    <p>maximum 10 slides</p>
                                </div>
                            </Form.Item>

                            <div>
                                {
                                    urlList.map((images) => {
                                        return <Image loader={sanityIoImageLoader} alt="image" width="100" height="100" src={images} />
                                    })
                                }
                            </div>

                            <div className='priview_sec'>

                                <>
                                    <Drawer
                                        open={opened?.length > 1 ? true : false}
                                        onClose={() => setOpened(null)}
                                        width={650}
                                        placement="right"
                                        closable={false}
                                        title={<div className='create_post_sec'>
                                            <Image loader={sanityIoImageLoader} alt="image" src={arrow} width="25"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setOpened(null)}
                                            />
                                            <h2>Preview</h2>

                                        </div>}
                                    >
                                        {opened === "preview" ?
                                            <Previewpost previewData={previewdata} />
                                            : <></>
                                        }
                                    </Drawer>
                                </>
                                <Button className='priview_bttn' onClick={() => previewOnClick()}>Preview</Button>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className='create_bttn'>{postdata ? (<>Update Post</>) : (<>Create Post</>)}</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>}

        </>
    )
}

export default Createpost;
