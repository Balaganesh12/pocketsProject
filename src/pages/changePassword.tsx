import { useState } from "react";
import { Input, Form, Row, Col, Button, Modal } from "antd";
import Image from "next/image";
// import login from "../assets/images/Statistics-pana 1.png";
import logo from "../assets/images/pocket_logo_login.svg";
import Danger from "../assets/images/Danger.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useChangePassword } from "@nhost/react";
import { useRouter } from "next/router";
import loginpage from "../assets/images/loginpage1.svg";
import tickcircle from "../assets/images/tick-circle.svg";
import errorpopup from "../assets/images/errorpopup.svg";

export const changepassword: React.FC = () => {
  const [form] = Form.useForm();
  const { changePassword, isSuccess, isError, error } = useChangePassword();
  const router = useRouter();
  const [changePasswordModal, setchangePasswordModal] = useState(false);
  const [changePasswordErrorModal, setchangePasswordErrorModal] =
    useState(false);

  const changePasswordOkModal = () => {
    setchangePasswordModal(false);
  };

  const changePasswordErrorOkModal = () => {
    setchangePasswordErrorModal(false);
  };
  const onFinish = async (value) => {
    console.log(value, "value");

    let password = await changePassword(value?.password).then(
      (response: any) => {
        console.log(response, "response");

        if (response?.isSuccess == true) {
          setchangePasswordModal(true);
          router.replace("/dashboard");
        } else {
          setchangePasswordErrorModal(true);
        }
      }
    );
  };
  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <ToastContainer />
      <div className="total_changepassword">
        <Row>
          <Col md={12}>
            <div className="changePassword_left_part">
              <Image
                loader={sanityIoImageLoader}
                alt="image"
                className="login_background"
                src={loginpage}
              ></Image>
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
                <h2 className="changepswrd_header">Enter New Password</h2>
                <p className="changepswrd_para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>
              <div className="changepswrd_form">
                <Form
                  name="basic"
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <div className="changepswrd_warning_alert">
                    <Image
                      loader={sanityIoImageLoader}
                      alt="image"
                      src={Danger}
                    />
                    <p>
                      password must contains 8 characters length , 1 uppercase.
                    </p>
                  </div>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmpassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <div className="changepswrd_warning_alert">
                    <Image
                      loader={sanityIoImageLoader}
                      alt="image"
                      src={Danger}
                    />
                    <p>
                      Note the above password & confirm password shoud be same.
                    </p>
                  </div>

                  <Form.Item>
                    <Button
                      type="primary"
                      className="changepswrd_button"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>

                {/* <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    label="Email ID"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please input your Email ID!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your email"
                      className="login_input"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter your password"
                      // className="pockets_input"
                      className="login_password_input"
                    />
                  </Form.Item>

                  <Button className="login_button">
                    Log In
                  </Button>
                </Form>
  */}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Modal open={changePasswordModal} footer={false} width="400px">
          <div className="modal_project_success">
            <div className="message_image">
              <Image
                loader={sanityIoImageLoader}
                src={tickcircle}
                alt="tickcircle"
              />
            </div>
            <h4>Reset password!</h4>
            <p>Password has been sent to your mail id.</p>
            <div className="modal_project_success_btn">
              <Button onClick={changePasswordOkModal}>Done</Button>
            </div>
          </div>
        </Modal>
      </div>

      <div>
        <Modal open={changePasswordErrorModal} footer={false} width="400px">
          <div className="modal_project_success">
            <div className="message_image">
              <Image
                loader={sanityIoImageLoader}
                src={errorpopup}
                alt="errorpopup"
              />
            </div>
            <h4>Oops!</h4>
            <p>Reset password Error!</p>
            <div className="modal_project_success_btn">
              <Button onClick={changePasswordErrorOkModal}>Try again</Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default changepassword;
