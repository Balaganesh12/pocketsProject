import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { showNotification } from "@mantine/notifications";
import { useResetPassword, useSignInEmailPassword } from "@nhost/nextjs";

import { Input, Form, Row, Col, Button } from "antd";
import { log } from "console";
import Image from "next/image";
import login from "../assets/images/Statistics-pana.svg";
import logo from "../assets/images/pocket_logo_login.svg";
import pocket from "../assets/images/pocket.png";
import { notification } from "antd-notifications-messages";
import "antd-notifications-messages/lib/styles/style.css";
import { nhost } from "../utility";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import loginpage from "../assets/images/loginpage1.svg";

// import login_bg from "../assets/images/login_bg.png";

export const Login: NextPage = () => {
  const [form] = Form.useForm();

  const router = useRouter();
  const { signInEmailPassword } = useSignInEmailPassword();
  const { resetPassword, isLoading, isSent, isError, error } =
    useResetPassword();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordtab, setPasswordTab] = useState("");

  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };
  const onFinish = async (values) => {
    const result = await signInEmailPassword(values?.email, values?.password);
    console.log(result, "resultlogin");
    localStorage.setItem("auth", JSON.stringify(result.accessToken));
    if (result.isError) {
      toast.error("Incorrect email or password");
      // notification({
      //   type: "error",
      //   title: "Error",
      //   message: result.error.message,
      //   // message: "Incorrect email or password"
      // });
    } else if (result.needsEmailVerification) {
      toast.warning("User does not exist");
      // notification({
      //   type: "warning",
      //   title: "Error",
      //   message:
      //     "You need to verify your email first. Please check your mailbox and follow the confirmation link to complete the registration.",
      // });
    } else {
      toast.success("Login sucessfully");
      router.replace("/dashboard");
    }
  };

  const onFinishForgotPass = async (value) => {
    console.log("in", value);
    let reset = await nhost.auth.resetPassword({
      email: value.email,
      options: {
        redirectTo: `/changePassword`,
      },
    });
    console.log(reset, "reset");
    if (reset.error === null) {
      // router.replace("/changepasswordsuccess")
    } else {
      notification({
        type: "error",
        title: "Error",
        message: reset.error.message,
        // message: "Incorrect email or password"
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="total_login">
        <Row>
          <Col md={12}>
            <div className="login_left_part">
              <Image
                loader={sanityIoImageLoader}
                src={loginpage}
                alt="loginpage"
              />
            </div>
            {/* <div className="login_bg">
              <div className="login_empty">
                <Image loader={sanityIoImageLoader} alt="image" className="login_background" src={login_bg} style={{ width: "100%" }}></Image>
              </div>
              <div className="login_image">
                <Image
                  loader={sanityIoImageLoader}
                  alt="image"
                  src={login}
                  style={{ width: "100%" }}
                ></Image>
              </div>
            </div> */}
          </Col>
          {passwordtab === "Forgotpswrd" ? (
            <>
              <Col md={12}>
                <div className="pocket_main_header">
                  <div className="login_logo_img">
                    <Image
                      loader={sanityIoImageLoader}
                      alt="image"
                      className="logo_of_login"
                      src={logo}
                    ></Image>
                  </div>
                  <div>
                    <h2 className="pockets_header">Forgot Password ?</h2>
                    <p className="pockets_para">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc vulputate libero et velit interdum, ac aliquet odio
                      mattis.
                    </p>
                  </div>
                  <div className="login_form">
                    <Form
                      form={form}
                      onFinish={onFinishForgotPass}
                      layout="vertical"
                      className="login_form_total"
                    >
                      <Form.Item label="Email ID" name="email">
                        <Input
                          size="large"
                          placeholder="Enter your email"
                          className="login_input"
                        />
                      </Form.Item>

                      <Button htmlType="submit" className="getotp">
                        Get OTP
                      </Button>
                    </Form>
                  </div>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col md={12}>
                <div className="pocket_main_header">
                  <div className="login_logo_img">
                    <Image
                      loader={sanityIoImageLoader}
                      alt="image"
                      className="logo_of_login"
                      src={logo}
                    ></Image>
                  </div>
                  <div>
                    <h2 className="pockets_header">Log In</h2>
                    <p className="pockets_para">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc vulputate libero et velit interdum, ac aliquet odio
                      mattis.
                    </p>
                  </div>
                  <div className="login_form">
                    <Form form={form} onFinish={onFinish} layout="vertical">
                      <Form.Item
                        label="Email ID"
                        name="email"
                        rules={[
                          {
                            type: "email",
                            required: false,
                            message: "Please input your Email ID",
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
                            required: false,
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
                      <h3 className="pockets_forgot">
                        <span onClick={() => setPasswordTab("Forgotpswrd")}>
                          Forgot Password?
                        </span>
                      </h3>
                      <Button htmlType="submit" className="login_button">
                        Log In
                      </Button>
                    </Form>
                  </div>
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default Login;
