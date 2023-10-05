import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NoRecordFound from "../../components/NoRecordFound";
import SpinnerUI from "../../../employees/components/SpinnerUI";

import * as organizationActions from "../../../../redux/organizations/organizations.actions";
import * as organizationReducer from "../../../../redux/organizations/organizations.slice";
import {
  RootState,
  AppDispatch,
  useAppDispatch,
} from "../../../../redux/store";
import { useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";

const ViewOrganization: React.FC = () => {
  const { id } = useParams();

  const dispatch: AppDispatch = useAppDispatch();

  const organizationState: organizationReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[organizationReducer.organizationFeatureKey];
    }
  );

  const fetchOrganizationById = () => {
    dispatch(organizationActions.getOrganizationByIdAction({ id: id }));
  };

  useEffect(() => {
    fetchOrganizationById();
  }, [id]);

  let { loading, errorMessage, organization } = organizationState;

  return (
    <>
      {loading && <SpinnerUI />}
      {Object.keys(errorMessage).length > 0 && (
        <ErrorMessage message={JSON.stringify(errorMessage)} />
      )}
      {Object.keys(organization).length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-5 m-auto">
              <div className="card shadow-lg">
                <div className="card-header bg-danger text-white text-center">
                  <h2>Organization Data</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover tableData">
                    <tbody>
                      <tr>
                        <th>ORG-ID</th>
                        <td>{organization.organizationId}</td>
                      </tr>

                      <tr>
                        <th>ORG-NAME</th>
                        <td>{organization.organizationName}</td>
                      </tr>

                      <tr>
                        <th>ORG-CODE</th>
                        <td>{organization.organizationCode}</td>
                      </tr>

                      <tr>
                        <th>ORG-DESC</th>
                        <td>{organization.organizationDescription}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to={"/"} className="btn btn-primary">
                    <i className="bi bi-arrow-left-square"></i> Go Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};

export default ViewOrganization;
