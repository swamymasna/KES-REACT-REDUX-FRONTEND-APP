import React, { FormEvent, useEffect, useState } from "react";
import { EmployeeService } from "../../services/EmployeeService";
import { Link } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";
import NoRecordFound from "../../../organizations/components/NoRecordFound";
import SpinnerUI from "../../components/SpinnerUI";
import * as employeeActions from "../../../../redux/employees/employees.actions";
import * as employeeReducer from "../../../../redux/employees/employees.slice";
import {
  RootState,
  AppDispatch,
  useAppDispatch,
} from "../../../../redux/store";
import { useSelector } from "react-redux";
import ErrorMessage from "../../../organizations/components/ErrorMessage";

const ListEmployees: React.FC = () => {
  const [search, setSearch] = useState("");
  const dispatch: AppDispatch = useAppDispatch();

  const employeeState: employeeReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[employeeReducer.employeeFeatureKey];
    }
  );

  const fetchAllEmployees = () => {
    dispatch(employeeActions.getAllEmployeesAction());
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const deleteEmployee = (id: any) => {
    dispatch(employeeActions.deleteEmployeeAction({ id: id }));
  };

  let { loading, errorMessage, employees } = employeeState;

  return (
    <>
      {loading && <SpinnerUI />}
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-3">
            <form className="d-flex ">
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                className="form-control bg-info "
                placeholder="Search Here "
              />
            </form>
          </div>
        </div>
      </div>
      {loading && <SpinnerUI />}
      {Object.keys(errorMessage).length > 0 && (
        <ErrorMessage message={errorMessage} />
      )}
      {employees.length > 0 ? (
        <div className="container mt-1">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header bg-success text-white text-center">
                  <h2>Employees Details</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover tableData">
                    <thead>
                      <tr>
                        <th>EMP-ID</th>
                        <th>EMP-NAME</th>
                        <th>EMP-SAL</th>
                        <th>EMP-ADDR</th>
                        {/* <th>EMAIL</th> */}
                        <th>DEPT-CODE</th>
                        <th>ORG-CODE</th>
                        <th className="text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees
                        .filter((emp: any) =>
                          emp.employeeName
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map((employee: any) => {
                          return (
                            <tr key={employee.employeeId}>
                              <td>{employee.employeeId}</td>
                              <td>{employee.employeeName}</td>
                              <td>{employee.employeeSalary}</td>
                              <td>{employee.employeeAddress}</td>
                              {/* <td>{employee.email}</td> */}
                              <td>{employee.departmentCode}</td>
                              <td>{employee.organizationCode}</td>
                              <td className="text-center">
                                <button
                                  onClick={() =>
                                    deleteEmployee(employee.employeeId)
                                  }
                                  className="btn btn-danger ms-2"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                                <Link
                                  to={`/update-employee/${employee.employeeId}`}
                                  className="btn btn-info ms-2"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                                <Link
                                  to={`/view-employee/${employee.employeeId}`}
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

export default ListEmployees;
