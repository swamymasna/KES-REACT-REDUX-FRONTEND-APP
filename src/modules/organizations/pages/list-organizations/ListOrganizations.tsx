import React, { useEffect, useState } from "react";
import NoRecordFound from "../../components/NoRecordFound";
import { Link } from "react-router-dom";
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

const ListOrganizations: React.FC = () => {
  let dispatch: AppDispatch = useAppDispatch();

  const organizationState: organizationReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[organizationReducer.organizationFeatureKey];
    }
  );

  const fetchAllOrganizations = () => {
    dispatch(organizationActions.getAllOrganizationsAction());
  };

  useEffect(() => {
    fetchAllOrganizations();
  }, []);

  const deleteOrganization = (id: any) => {
    dispatch(organizationActions.deleteOrganizationAction({ id: id }));
  };

  let { loading, errorMessage, organizations } = organizationState;

  return (
    <>
      {loading && <SpinnerUI />}
      {Object.keys(errorMessage).length > 0 && (
        <ErrorMessage message={JSON.stringify(errorMessage)} />
      )}
      {organizations.length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <div className="card shadow-lg">
                <div className="card-header text-center bg-primary text-white">
                  <h2>Organizations Details</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover text-center tableData">
                    <thead>
                      <tr>
                        <th>ORG-ID</th>
                        <th>ORG-NAME</th>
                        <th>ORG-CODE</th>
                        <th>ORG-DESC</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {organizations.map((organization) => {
                        return (
                          <tr key={organization.organizationId}>
                            <td>{organization.organizationId}</td>
                            <td>{organization.organizationName}</td>
                            <td>{organization.organizationCode}</td>
                            <td>{organization.organizationDescription}</td>
                            <td>
                              <button
                                onClick={() =>
                                  deleteOrganization(
                                    organization.organizationId
                                  )
                                }
                                className="btn btn-danger ms-2"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                              <Link
                                to={`/update-organization/${organization.organizationId}`}
                                className="btn btn-info ms-2"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <Link
                                to={`/view-organization/${organization.organizationId}`}
                                className="btn btn-dark ms-2"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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

export default ListOrganizations;
