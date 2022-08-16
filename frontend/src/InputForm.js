import React, {useContext} from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Stack from "@mui/material/Stack";

import SelectionContainer from "./SelectionContainer";

import { StoreContext } from "./Store";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
});

const CourseInput = () => {
  return (
    <div  className="App">
      {/* <Credentials> </Credentials>  */}

      <h3>Enter your course details:</h3>
      <Formik
        initialValues={{ name: "", email: "" }}
        // onSubmit={async (values) => {
        //   await new Promise((resolve) => setTimeout(resolve, 500));
        //   alert(JSON.stringify(values, null, 2));
        // }}
      >
        <Form>
          <label htmlFor="firstName" style={{ padding: "4px" }}>
            Institution
          </label>
          <Field name="name" type="text" placeholder="e.g UBC" />
          <p></p>
          <label htmlFor="courseCode" style={{ padding: "4px" }}>
            Course Code:
          </label>
          <Field name="courseCode" type="text" placeholder="eg. CPSC100" />
          <Field as="select" name="color">
            <option value="red">Fall Semester (1)</option>
            <option value="green">Winter Semester (2)</option>
            <option value="green">Full Year Course</option>
            <option value="blue">Summer Session 1</option>
            <option value="blue">Summer Session 2</option>
          </Field>

          {/* <button type="submit">Submit</button> */}
          <SelectionContainer></SelectionContainer>
        </Form>
      </Formik>
    </div>
  );
};

const InputForm = () => {
  let store = useContext(StoreContext)
  const formik = useFormik({
    initialValues: {
      email: "michael.green@ubc.ca",
      password: "foobar21"
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(store?.state, null, 2));
    }
  });

  return (
    <div>
      <Stack
        alignItems="center"
        direction="column"
        display="flex"
        justifyContent="center"
        minHeight="100vh"
        minWidth="100vw"
        spacing={4}
      >
        <CourseInput></CourseInput>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="iClicker Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="iClicker Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Stack>
    </div>
  );
};

export default InputForm;