import React from "react";
import { TextInput } from "../input";
import { Col, Row } from "antd";

export default function AddNewStudentForm({
  values,
  handleChange,
  errors,
  touched,
}: any) {
  return (
    <Row gutter={[16, 16]} justify="space-between">
      <Col xs={24} md={12}>
        <TextInput
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          errors={errors}
          touched={touched}
          fullWidth
        />
      </Col>
      <Col xs={24} md={12}>
        <TextInput
          label="Mobile Number"
          name="mobile_number"
          value={values.mobile_number}
          onChange={(e) => {
            // Only allow numbers
            const value = e.target.value.replace(/[^0-9]/g, "");
            if (value.length <= 10) {
              handleChange({
                target: {
                  name: "mobile_number",
                  value: value,
                },
              });
            }
          }}
          errors={errors}
          touched={touched}
          fullWidth
        />
      </Col>
      <Col xs={24} md={12}>
        <TextInput
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          errors={errors}
          touched={touched}
          fullWidth
        />
      </Col>
      <Col xs={24} md={12}>
        <TextInput
          label="Class"
          name="class"
          value={values.class}
          onChange={handleChange}
          errors={errors}
          touched={touched}
          fullWidth
        />
      </Col>
    </Row>
  );
}
