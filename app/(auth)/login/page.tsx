"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { loginWithEmailAndPasswordAPI } from "@/functions";
import { schoolAdminStore, setCurrentUser } from "@/store/schoolAdminSlice";
import { useEffect } from "react";

interface LoginForm {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector(schoolAdminStore);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (userInfo.token) {
      router.push("/");
    }
  }, [userInfo.token, router]);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const result = await loginWithEmailAndPasswordAPI(
        data.email,
        data.password
      );
      return result;
    },
    onSuccess: (user) => {
      console.log("user", user);
      const userData = user?.data?.user;
      const userToken = user?.data?.token;
      messageApi.success("Login successful");
      // set values to redux store
      dispatch(
        setCurrentUser({
          ...userData,
          token: userToken,
        })
      );
      // route to home page
      router.push("/");
    },
    onError: (error: any) => {
      messageApi.error(error.message || "Login failed");
    },
  });

  const handleSubmit = (values: LoginForm) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {contextHolder}
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            School Vaccination Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage vaccination drives
          </p>
        </div>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
