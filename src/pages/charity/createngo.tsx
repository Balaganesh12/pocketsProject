import React, { useState, useEffect } from 'react'
import { CREATE_NGO, EDIT_NGO, GET_NGO, GET_COUNTRY } from '../../helpers/queries'
import { Button, Select, Input, Form, message, Modal } from "antd";
import 'antd-notifications-messages/lib/styles/style.css';
import { useMutation, useQuery } from "@apollo/client";
import { gql } from '@apollo/client';
import { nhost } from "../../utility";
import cryptojs from "crypto-js"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Image from "next/image";
import info from '../../assets/images/info.png'
import downarrow from "../../assets/images/downarrow.svg";
import { authProtected } from '../../components/protected-route';
import { useResetPassword } from "@nhost/nextjs";

export const secreteKey = "pockets"

const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
};
export const createngo: React.FC<any> = ({ ngodata, data, closeModal, clickModal }) => {
  const [Hpassword, setPassword] = useState("");
  const [countrydata, setCountrydata] = useState([]);
  var hash = cryptojs.HmacSHA256(Hpassword, secreteKey).toString()
  const { resetPassword, isLoading, isSent, isError } = useResetPassword()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateid = Math.floor(Math.random() * 100000);

  const [form] = Form.useForm();

  useEffect(() => {
    if (ngodata) {
      form.setFieldsValue(ngodata);
    }
  }, [ngodata]);

  const [createNgo, { loading: contactloading, error: contacterror, data: contactdataAddress }] =
    useMutation(CREATE_NGO, {
      errorPolicy: "all",
    });


  const [editNgo, { loading: loading, error: error, data: dataAddress }] =
    useMutation(EDIT_NGO, {
      errorPolicy: "all",
    });

  const {
    error: ngoError,
    loading: ngoLoading,
    data: dataNgo,
    refetch: refetchNgo,
  } = useQuery(GET_NGO, {
    variables: {
    }
  });

  const {
    error: countryError,
    loading: countryLoading,
    data: dataCountry,
    refetch: refetchCountry,
  } = useQuery(GET_COUNTRY, {
    variables: {
    }
  });

  const CountryData = dataCountry?.mst__countrys
  console.log(CountryData, "CountryData");




  const Ngoonfinish = (NgoFormData: any) => {
    console.log(NgoFormData, "NgoFormData");
    if (ngodata) {
      NgoFormData.id = ngodata.id;
      editNgo({
        variables: NgoFormData,
      }).then((response) => {
        console.log(response,"response");
        if (response.errors) {
          toast.error("Server Error")
        } else {
          toast.success("Charity Update Sucessfully")
          refetchNgo();
          closeModal(null);
          clickModal(true);
        }
      });
    } else {
      NgoFormData.passwordHash = hash;
      NgoFormData.charity_id = generateid;
      createNgo({
        variables: NgoFormData
      }).then((response) => {
        console.log(response, "responsengo")
        if (response.errors) {
          toast.error("Charity created failed")
        } else {
          toast.success("Charity create successfully")
          reset(NgoFormData.email)
          refetchNgo();
          closeModal(null);
          clickModal(true);
        }
      });
    }
  }

  const reset = async (mail) => {
    let reset = await resetPassword(mail, {
      redirectTo: `/changePassword`
    })
  }

  return (
    <>
      <ToastContainer />
      <div className="total_project_drawer">
        <Form layout="vertical" onFinish={Ngoonfinish} form={form}>
          <h3 className='charity_header'>Charity details</h3>
          <Form.Item required={false} label={<p className='create_charity_table'>Charity Name</p>}
            name="name" className='charity_input' rules={[{ required: true, message: "Please enter your Charity Name!" }]}>
            <Input className="input_height" placeholder="Ex.Child" ></Input>
          </Form.Item>
          <Form.Item required={false} label={<p className='create_charity_table'>Charity Type</p>} name="charity_type" className='charity_input' rules={[{ required: true, message: "Please enter your Charity Type!" }]}>
            <Select placeholder="Select charity type"
              suffixIcon={
                <div className="select_arrow">
                  <Image src={downarrow} alt="downarrow" />
                </div>
              }
              options={[{ value: 'Donation', label: 'Donation' }, { value: 'Fund', label: 'Fund' }]} className='charity_select' />
          </Form.Item>
          <Form.Item required={false} label={<p className='create_charity_table'>Country</p>} name="country" className='charity_input' >
            <Select placeholder="United kingdom"
              suffixIcon={
                <div className="select_arrow">
                  <Image src={downarrow} alt="downarrow" />
                </div>
              } className='charity_select'>
              {CountryData?.map((country) =>
              (
                <Select.Option key={country?.id} value={country?.id}>
                  {country.name}
                </Select.Option>)
              )}
            </Select>
          </Form.Item>
          <Form.Item required={false} label={<p className='create_charity_table'>Email id</p>} name="email_id" className='charity_input' rules={[{ type: "email", required: true, message: "Please enter your Email!" }]}>
            <Input placeholder="Ex.charityqwq@mail.com" className="input_height" type='email'/>
          </Form.Item>
          <Form.Item required={false} label={<p className='create_charity_table'>Phone No</p>} name="phone_number" className='charity_input' rules={[{ required: true, message: "Please enter your Phone Number!" }]}>
            <Input placeholder="Ex. 909 9090 909" className="input_height" type='number' />
          </Form.Item>
          <Form.Item required={false} label={<p className='create_charity_table'>Location</p>} name="location" className='charity_input' rules={[{ required: true, message: "Please enter your Location!" }]}>
            <Input placeholder="Enter location" className="input_height"/>
          </Form.Item>
          <Form.Item required={false} label={<p className='create_charity_table'>Preferred Currency</p>} name="preferred_currency" className='charity_input' rules={[{ required: true, message: "Please enter your Preferred Currency!" }]} >
            <Select placeholder="Select currency type" className='charity_select'
              suffixIcon={
                <div className="select_arrow">
                  <Image src={downarrow} alt="downarrow" />
                </div>
              }
            options={[
              { value: 'USD', label: 'USD' },
              { value: 'INR', label: 'INR' },
              { value: 'EURO', label: 'EURO' },
              { value: 'GBP', label: 'GBP' },
            ]}
            />
          </Form.Item>

          {data === "edit" ?
            <>
            </> : <>
              <h3 className='Credentials_h2'>Credentials details</h3>

              <Form.Item required={false} label={<p className='create_charity_table'>Email</p>}
                name="email"
                className='charity_input'
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Ex.charity123@gmail.com" className="input_height" type='email' />
              </Form.Item>
              {/* <Form.Item required={false}
                label="Password"
                name="passwordHash"
                className='charity_input'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <div className='pasword_generate' style={{ display: "flex" }}> <Button className='generate_button'>Generate Password</Button> <Input.Password placeholder="********************" className="input_height" /></div>
              </Form.Item> */}
              {/* <div className='info_inst'> <Image loader={sanityIoImageLoader} className='info_img' alt="image" src={info} width={30} height={30} />
                <p>Once you click generate button the password will automatically generated & the credentials will share to the entered mail id.</p>
              </div> */}
            </>
          }
          <Form.Item>
            <Button type="ghost" htmlType="submit" className='create_project_btn'>{ngodata ? (<>Update</>) : (<>Create</>)}</Button>
          </Form.Item>


        </Form>
      </div>
    </>
  );
};

export default createngo