import React from "react";
import { useNavigate } from "react-router-dom";
import { api, useLoginMutation } from "../../services/api";
import { setToken } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { HttpResult } from "../../components/shared/HttpResult";
import { ProFormText, LoginFormPage } from "@ant-design/pro-components";
import "./LoginPage.css";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const [login, { isLoading, error }] = useLoginMutation();

  const onFinish = async (formState: any) => {
    console.log('hello');
    if (isLoading) {
      return;
    }
    const token = "foo";
    const loginOutput = await login({
      email: formState.email,
      password: formState.password,
      recaptcha_token: token,
    }).unwrap();
    dispatch(setToken(loginOutput.data));
    dispatch(api.util.resetApiState());
    navigate("/");
  };

  return (
    <div 
      style={{
        height: "100vh",
        maxWidth: "1440px"
      }}
    >
      <LoginFormPage 
        title="Welcome"
        subTitle="Sign In"
        onFinish={onFinish}
        submitter={{
          searchConfig: {
            submitText: "Login",
          },
        }}
      >
        <>
          <div style={{ paddingBottom: 16 }}>
            <HttpResult error={error} />
          </div>
          <ProFormText
            label="Email"
            name="email"
            fieldProps={{
              size: "large"
            }}
            placeholder="Email"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          />
          <ProFormText.Password
            label="Password"
            name="password"
            fieldProps={{
              size: "large"
            }}
            placeholder={"Password"}
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          />
        </>
        <div
          style={{
            marginBottom: 24,
          }}
        >
        </div>
    
      </LoginFormPage>
    </div>
  );
};
