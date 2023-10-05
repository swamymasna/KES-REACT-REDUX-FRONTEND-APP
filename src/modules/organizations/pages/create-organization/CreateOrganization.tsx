import React, { ChangeEvent, FormEvent, useState } from "react";
import { IOrganization } from "../../models/IOrganization";
import { useNavigate } from "react-router-dom";
import * as organizationActions from "../../../../redux/organizations/organizations.actions";
import { AppDispatch, useAppDispatch } from "../../../../redux/store";

const CreateOrganization: React.FC = () => {
  let navigate = useNavigate();

  const dispatch: AppDispatch = useAppDispatch();

  let [organization, setOrganization] = useState<IOrganization>({
    organizationName: "",
    organizationCode: "",
    organizationDescription: "",
  });

  const onInputChange = (event: ChangeEvent<HTMLInputElement | any>) => {
    setOrganization({
      ...organization,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();

    dispatch(
      organizationActions.saveOrganizationAction({ organization: organization })
    ).then((response: any) => {
      if (response) {
        navigate("/organizations");
      }
    });
  };

  let { organizationName, organizationCode, organizationDescription } =
    organization;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card">
              <div className="card-header bg-success text-white text-center">
                <h2>Register Organization</h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={organizationName}
                      name="organizationName"
                      onChange={onInputChange}
                      placeholder="Enter Organization Name"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={organizationCode}
                      name="organizationCode"
                      onChange={onInputChange}
                      placeholder="Enter Organization Code"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={organizationDescription}
                      name="organizationDescription"
                      onChange={onInputChange}
                      placeholder="Enter Organization Description"
                      className="form-control"
                    />
                  </div>

                  <input
                    type="submit"
                    value={"Register"}
                    className="btn btn-success form-control mt-2"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrganization;
