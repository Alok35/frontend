import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be a positive number")
      .integer("Age must be an integer"),
    gender: Yup.string().required("Gender is required"),
  });

  return (
    <div className="card mx-auto" style={{ width: "100%", maxWidth: "800px" }}>
      <div className="card-header bg-primary text-white text-center">
        <h5 className="mb-0">
          {initialValues.userId ? "Edit User" : "Add User"}
        </h5>
      </div>
      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <Field
                  type="number"
                  id="age"
                  name="age"
                  className="form-control"
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <div className="form-check">
                  <Field
                    type="radio"
                    name="gender"
                    value="Male"
                    className="form-check-input"
                    id="genderMale"
                  />
                  <label htmlFor="genderMale" className="form-check-label">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    type="radio"
                    name="gender"
                    value="Female"
                    className="form-check-input"
                    id="genderFemale"
                  />
                  <label htmlFor="genderFemale" className="form-check-label">
                    Female
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    type="radio"
                    name="gender"
                    value="Other"
                    className="form-check-input"
                    id="genderOther"
                  />
                  <label htmlFor="genderOther" className="form-check-label">
                    Other
                  </label>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {initialValues.userId ? "Update" : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserForm;
