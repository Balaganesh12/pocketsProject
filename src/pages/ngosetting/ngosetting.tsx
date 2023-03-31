import React, { useState } from "react";
import { Button, Drawer, Switch, Form, Input, Modal } from "antd";
import Image from "next/image";
import ngopayment from "../../assets/images/ngopayment.svg";
import trash_red from "../../assets/images/trash.svg";
import arrow from "../../assets/images/arrow-left.png";
import { authProtected } from "../../components/protected-route";

export const ngosetting: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAcc, setdeleteAccount] = useState(false);
  const [deactivate, setdeactivate] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDelete = () => {
    setdeleteAccount(true);
  };

  const handleDeleteOk = () => {
    setdeleteAccount(false);
  };

  const handleDeleteCancel = () => {
    setdeleteAccount(false);
  };

  const showDeactivate = () => {
    setdeactivate(true);
  };

  const handleDeactiveOk = () => {
    setdeactivate(false);
  };

  const handleDeactivateCancel = () => {
    setdeactivate(false);
  };

  const [form] = Form.useForm();
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  function validateUrl(value: string) {
    return /^(.{8,16})$/.test(value);
  }
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
    },
  };

  return (
    <>
      <div className="total_ngosetting_page">
        <div className="ngosetting_headers">
          <h1>Settings</h1>
          <h6>Security</h6>
        </div>

        <div className="ngosetting_sec1">
          <div className="ngosetting_sec1_header">
            <h6>Password</h6>
            <p>Last change 11 January, 2020</p>
          </div>
          <div className="change_password_ngosetting_btn">
            <Button className="change_password_ngosetting" onClick={showDrawer}>
              Change
            </Button>
          </div>
        </div>
        <h6 className="ngosetting_sec2_header">Payment Method</h6>

        <div className="ngosetting_sec2">
          <div className="ngosetting_sec2_list">
            <div className="payment_detail">
              <div className="ngosetting_sec2_img">
                <Image src={ngopayment} alt="ngopayment" />
              </div>
              <div className="ngosetting_sec2_content">
                <h5>HSBC Holdings.</h5>
                <h6>Bank **************5421</h6>
                <p className="switch_btn">
                  <span className="switch_btn_span">
                    <Switch defaultChecked onChange={onChange} />
                  </span>
                  Make this account as primary
                </p>
              </div>
            </div>

            <div className="trash_ngo_setting">
              <Image src={trash_red} alt="trash_red" onClick={showModal} />
            </div>
          </div>
          <div className="ngosetting_sec2_list">
            <div className="payment_detail">
              <div className="ngosetting_sec2_img">
                <Image src={ngopayment} alt="ngopayment" />
              </div>
              <div className="ngosetting_sec2_content">
                <h5>HSBC Holdings.</h5>
                <h6>Bank **************5421</h6>
                <p className="switch_btn">
                  <span className="switch_btn_span">
                    <Switch defaultChecked onChange={onChange} />
                  </span>
                  Make this account as primary
                </p>
              </div>
            </div>

            <div className="trash_ngo_setting">
              <Image src={trash_red} alt="trash_red" onClick={showModal} />
            </div>
          </div>
        </div>

        <div className="ngosetting_sec3">
          <h6 className="ngosetting_sec3_header">Notifications</h6>
          <div className="ngosetting_sec3_content">
            <ul className="ngosetting_sec3_list">
              <li>Pockets Notification</li>
              <li>
                <Switch defaultChecked onChange={onChange} />
              </li>
            </ul>
            <ul className="ngosetting_sec3_list">
              <li>Security Alerts</li>
              <li>
                <Switch defaultChecked onChange={onChange} />
              </li>
            </ul>
          </div>
        </div>

        <div className="ngosetting_sec4">
          <h5>Delete / Deactivate Account</h5>
          <p>
            Are you sure you want to deactivate your account? Deactivating means
            no will see your account. You can come back at any time.
          </p>
          <div className="ngosetting_sec4_btns">
            <Button
              className="ngosetting_sec4_btns_delete"
              onClick={showDelete}
            >
              Delete Account
            </Button>
            <Button
              className="ngosetting_sec4_btns_deactivate"
              onClick={showDeactivate}
            >
              Deactivate Account
            </Button>
          </div>
        </div>
        <div>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={open}
            width={700}
            title={
              <div className="ngosetting_drawn_header">
                <Image
                  loader={sanityIoImageLoader}
                  alt="image"
                  src={arrow}
                  width="25"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(false)}
                />
                <h2>Change password</h2>
              </div>
            }
          >
            <div className="password_total_form">
              <Form
                form={form}
                onFinish={onFinish}
                {...layout}
                layout="vertical"
              >
                <Form.Item
                  name="oldpassword"
                  label="Old Password"
                  className="password_inputs"
                  rules={[
                    {
                      required: true,
                      message: "Please input your old password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter old password"
                    type="password"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  className="password_inputs"
                  rules={[
                    { required: true, message: "Please provide Password" },
                    {
                      validator: async (_, value) => {
                        if (!value) return;

                        if (validateUrl(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(`Password Must be 8 characters`)
                        );
                      },
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter new password"
                    type="password"
                    maxLength={8}
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  className="password_inputs"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Enter confirm password"
                    maxLength={8}
                    type="password"
                    name="ConfirmPassword"
                  />
                </Form.Item>
                <Form.Item className="change_password">
                  <Button htmlType="submit" className="change_password_setting">
                    Change
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Drawer>
        </div>
        <div>
          <Modal open={isModalOpen} footer={null}>
            <div className="account_delete">
              <h5>Confirmation</h5>
              <p>Are you sure you want to remove your bank account?</p>
              <div className="account_delete_btns">
                <Button
                  className="account_delete_btns_cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="account_delete_btns_remove"
                  onClick={handleOk}
                >
                  Remove Account
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="total_sec_delete">
          <Modal open={deleteAcc} footer={null} className="modal_content">
            <div className="delete_account_total">
              <h5>Confirmation</h5>
              <p>
                Are you sure you want to delete your account? Delete means will
                remove all of your account information from our database. This
                cannot be undone
              </p>
              <p>
                To learn more about account deactivation, please
                <span className="highlight"> visit the help center.</span>
              </p>
              <div className="delete_account_total_btns">
                <Button
                  className="delete_account_btn_cancel"
                  onClick={handleDeleteCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="delete_account_btn_delete"
                  onClick={handleDeleteOk}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="total_sec_delete">
          <Modal open={deactivate} footer={null} className="modal_content">
            <div className="delete_account_total">
              <h5>Confirmation</h5>
              <p>
                Are you sure you want to deactivate your account? Deactivating
                means no will see your account. You can come back at any time.
              </p>
              <p>
                To learn more about account deactivation, please
                <span className="highlight">visit the help center.</span>
              </p>
              <div className="delete_account_total_btns">
                <Button
                  className="delete_account_btn_cancel"
                  onClick={handleDeactivateCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="delete_account_btn_delete"
                  onClick={handleDeactiveOk}
                >
                  Deactivate
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default authProtected(ngosetting);
