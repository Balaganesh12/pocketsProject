import { Input, Form, Row, Col, Button } from "antd";
import Image from "next/image";
// import login from "../assets/images/Statistics-pana 1.png";
import logo from "../assets/images/pocket_logo.png";
import Danger from "../assets/images/Danger.png";
import { toast } from 'react-toastify'
import { useChangePassword } from '@nhost/react';
export const changepasswordsuccess: React.FC = () => {
  const [form] = Form.useForm();
  const { changePassword, isSuccess, isError, error } = useChangePassword()

  const onFinish = async (value) => {
    console.log(value, 'value');

    let password = await changePassword(value?.password).then((response: any) => {
      console.log(response, "response");

      if (response?.isSuccess == true) {
        toast.success("User password is updated successfully");
      }
      else {
        toast.error("User password is not updated")
      }
    })

  };
  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="total_changepassword">
        <Row>
          <Col md={12}>
            <div className="changepswrd_bg">
              <div className="changepswrd_empty">
                {/* <Image loader={sanityIoImageLoader} alt="image" className="login_background" src={login_bg} style={{ width: "100%" }}></Image> */}
              </div>
              <div className="changepswrd_image">
                {/* <Image
                  loader={sanityIoImageLoader}
                  alt="image"
                  src={login}
                  style={{ width: "100%" }}
                ></Image> */}
              </div>
            </div>
          </Col>

          <Col md={12}>
            <div className="changepswrd_header_main">
              <div className="changepswrd_logo_img">
                <Image
                  loader={sanityIoImageLoader}
                  alt="image"
                  className="logo_of_changepswrd"
                  src={logo}
                ></Image>
              </div>
              <div>
                <h2 className="changepswrd_header">Verification Email sent to you email ID</h2>
                <p className="changepswrd_para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
                <a href="https://mail.google.com/mail" target="blank" className="login_button_back">Open Mail</a>
              </div> 
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default changepasswordsuccess;
