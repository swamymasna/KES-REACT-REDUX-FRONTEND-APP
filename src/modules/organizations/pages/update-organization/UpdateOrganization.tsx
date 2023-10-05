import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IOrganization } from "../../models/IOrganization";
import { OrganizationService } from "../../services/OrganizationService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";

import * as organizationActions from "../../../../redux/organizations/organizations.actions";
import * as organizationReducer from "../../../../redux/organizations/organizations.slice";
import {
  RootState,
  AppDispatch,
  useAppDispatch,
} from "../../../../redux/store";
import { useSelector } from "react-redux";

const UpdateOrganization: React.FC = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  let dispatch: AppDispatch = useAppDispatch();

  const organizationState: organizationReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[organizationReducer.organizationFeatureKey];
    }
  );

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
      organizationActions.updateOrganizationAction({
        id: id,
        organization: organization,
      })
    ).then((response: any) => {
      if (response) {
        navigate("/organizations");
      }
    });
  };

  useEffect(() => {
    dispatch(organizationActions.getOrganizationByIdAction({ id: id }));
  }, [id]);

  useEffect(() => {
    setOrganization({
      ...organization,
      organizationName: organizationState.organization.organizationName,
      organizationCode: organizationState.organization.organizationCode,
      organizationDescription:
        organizationState.organization.organizationDescription,
    });
  }, [organizationState]);

  let { organizationName, organizationCode, organizationDescription } =
    organization;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card">
              <div className="card-header bg-info text-center">
                <h2>Update Organization</h2>
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
                    value={"Update"}
                    className="btn btn-info form-control mt-2"
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

export default UpdateOrganization;
