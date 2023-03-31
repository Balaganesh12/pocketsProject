import React, { useEffect, useState } from 'react';
import { Button, Form, message, Upload } from 'antd'
import Image from 'next/image'
import uploadimage from "../../assets/images/uploadimage.png"
import { NGO_PROFILE_UPDATE, NGO_USER, GET_BYID_NGO } from '../../helpers';
import { useMutation, useQuery } from "@apollo/client";
import { useUserData } from '@nhost/nextjs'


export const Uploadimage: React.FC<any> = ({ closeModal, clickModal }) => {
    const user = useUserData();
    const [ngoId, setNgoId] = useState<any>([]);

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
    useEffect(() => {
        let ngoId = ngoData?.mst__ngos.map((data) => {
            return data?.id
        });
        setNgoId(ngoId);
    }, [ngoData]);
    const sanityIoImageLoader = ({ src, width, quality }) => {
        return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
    }
    const [urlList, setUrlList] = useState([] as any[]);
    const { Dragger } = Upload;

    const [editNgoProfile, { loading: loading, error: error, data: dataAddress }] =
        useMutation(NGO_PROFILE_UPDATE, {
            errorPolicy: "all",
        });

    const ImageUploaderProp: any = {
        name: "file",
        multiple: true,
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
            }
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
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
                    .catch();
                onSuccess("Ok");
            }
        } catch (err) {
            const error = new Error("Some error");
            onError({ err });
        }
    };
    const {
        error: editError,
        loading: editLoading,
        data: dataedit,
        refetch: refetchedit,
    } = useQuery(GET_BYID_NGO, {
        variables: {
            id: ngoId?.toString()
        },
    });
    const uploaddata = () => {
        editNgoProfile({
            variables: {
                id: ngoId?.toString(),
                logo: urlList?.toString()
            },
        }).then((response) => {
            if (response.errors) {
            } else {
                refetchedit();
                closeModal(null);
                clickModal(true);


            }
        });
    }
    return (
        <div className='upload_dragger'>
            <Form layout='vertical' onFinish={uploaddata}>

                <Form.Item name="logo" label={<p className='upload_label' >Upload Photos / videos</p>} >
                    <Dragger {...ImageUploaderProp} name="file"
                        customRequest={uploadImages} className="dragger" style={{ width: "90%", border: "2px dashed #7FACD6", }}>
                        <p className="ant-upload-drag-icon">
                            <Image loader={sanityIoImageLoader} alt="image" src={uploadimage} />
                        </p>
                        <p>Drag & drop or Browse</p>
                        <p className="photo_mp">
                            Photo formates: JPEG, PNG, (maximum image size 2 mb).
                        </p>

                    </Dragger>

                </Form.Item>
                <div>
                    {
                        urlList.map((images) => {
                            return <Image loader={sanityIoImageLoader} alt="image" width="100" height="100" src={images} />
                        })
                    }
                </div>
                <div className='upload_bttn'>
                    <Button className='cancel_bttn'>Cancel</Button>

                    <Button type="primary" htmlType="submit" className='upload_bttn'>Upload</Button>
                </div>


            </Form>

        </div>
    )
}


export default Uploadimage