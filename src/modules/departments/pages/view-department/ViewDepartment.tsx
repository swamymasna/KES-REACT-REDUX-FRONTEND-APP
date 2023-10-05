import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import NoRecordFound from "../../../organizations/components/NoRecordFound";
import SpinnerUI from "../../../employees/components/SpinnerUI";
import * as departmentActions from "../../../../redux/departments/departments.actions";
import * as departmentReducer from "../../../../redux/departments/departments.slice";
import {
  RootState,
  AppDispatch,
  useAppDispatch,
} from "../../../../redux/store";
import { useSelector } from "react-redux";
import ErrorMessage from "../../../organizations/components/ErrorMessage";

const ViewDepartment: React.FC = () => {
  let { id } = useParams();

  let dispatch: AppDispatch = useAppDispatch();

  const departmentState: departmentReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[departmentReducer.departmentFeatureKey];
    }
  );

  const fetchDepartmentById = () => {
    dispatch(departmentActions.getDepartmentByIdAction({ id: id }));
  };

  useEffect(() => {
    fetchDepartmentById();
  }, [id]);

  let { loading, errorMessage, department } = departmentState;

  return (
    <>
      {loading && <SpinnerUI />}
      {Object.keys(errorMessage).length > 0 && (
        <ErrorMessage message={errorMessage} />
      )}
      {Object.keys(department).length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-5 m-auto">
              <div className="card">
                <div className="card-header bg-info text-center">
                  <h2>Department Data</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover tableData">
                    <tbody>
                      <tr>
                        <th>DEPT-ID</th>
                        <td>{department.departmentId}</td>
                      </tr>

                      <tr>
                        <th>DEPT-NAME</th>
                        <td>{department.departmentName}</td>
                      </tr>

                      <tr>
                        <th>DEPT-CODE</th>
                        <td>{department.departmentCode}</td>
                      </tr>

                      <tr>
                        <th>DEPT-DESC</th>
                        <td>{department.departmentDescription}</td>
                      </tr>
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

export default ViewDepartment;
