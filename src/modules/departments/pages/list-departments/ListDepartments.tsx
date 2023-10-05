import React, { useEffect, useState } from "react";
import NoRecordFound from "../../../organizations/components/NoRecordFound";
import { Link } from "react-router-dom";
import SpinnerUI from "../../../employees/components/SpinnerUI";
import ErrorMessage from "../../../organizations/components/ErrorMessage";
import * as departmentActions from "../../../../redux/departments/departments.actions";
import * as departmentReducer from "../../../../redux/departments/departments.slice";
import {
  RootState,
  AppDispatch,
  useAppDispatch,
} from "../../../../redux/store";
import { useSelector } from "react-redux";

const ListDepartments: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const departmentState: departmentReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[departmentReducer.departmentFeatureKey];
    }
  );

  const fetchAllDepartments = () => {
    dispatch(departmentActions.getAllDepartmentsAction());
  };

  useEffect(() => {
    fetchAllDepartments();
  }, []);

  const deleteDepartment = (id: any) => {
    dispatch(departmentActions.deletDepartmentAction({ id: id }));
  };

  let { errorMessage, loading, departments } = departmentState;

  return (
    <>
      {loading && <SpinnerUI />}
      {Object.keys(errorMessage).length > 0 && (
        <ErrorMessage message={errorMessage} />
      )}
      {departments.length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <div className="card shadow-lg">
                <div className="card-header bg-success text-white text-center">
                  <h2>Departments Details</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover text-center tableData">
                    <thead>
                      <tr>
                        <th>DEPT-ID</th>
                        <th>DEPT-NAME</th>
                        <th>DEPT-CODE</th>
                        <th>DEPT-DESC</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((department) => {
                        return (
                          <tr key={department.departmentId}>
                            <td>{department.departmentId}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departmentCode}</td>
                            <td>{department.departmentDescription}</td>
                            <td>
                              <button
                                onClick={() =>
                                  deleteDepartment(department.departmentId)
                                }
                                className="btn btn-danger ms-2"
                              >
                                <i className="bi bi-trash"></i>
                              </button>

                              <Link
                                to={`/update-department/${department.departmentId}`}
                                className="btn btn-info ms-2"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>

                              <Link
                                to={`/view-department/${department.departmentId}`}
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

export default ListDepartments;
