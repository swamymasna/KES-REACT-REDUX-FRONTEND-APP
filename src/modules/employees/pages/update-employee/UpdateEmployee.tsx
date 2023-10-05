import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import { IDepartment } from "../../../departments/models/IDepartment";
import { IOrganization } from "../../../organizations/models/IOrganization";
import { EmployeeService } from "../../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";

import * as employeeActions from "../../../../redux/employees/employees.actions";
import * as employeeReducer from "../../../../redux/employees/employees.slice";
import * as departmentActions from "../../../../redux/departments/departments.actions";
import * as departmentReducer from "../../../../redux/departments/departments.slice";

import * as organizationActions from "../../../../redux/organizations/organizations.actions";
import * as organizationReducer from "../../../../redux/organizations/organizations.slice";

import {
  RootState,
  AppDispatch,
  useAppDispatch,
} from "../../../../redux/store";
import { useSelector } from "react-redux";

const UpdateEmployee: React.FC = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  let dispatch: AppDispatch = useAppDispatch();

  const employeeState: employeeReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[employeeReducer.employeeFeatureKey];
    }
  );

  let departmentState: departmentReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[departmentReducer.departmentFeatureKey];
    }
  );

  let organizationState: organizationReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[organizationReducer.organizationFeatureKey];
    }
  );

  let [employee, setEmployees] = useState<IEmployee>({
    employeeName: "",
    employeeSalary: "",
    employeeAddress: "",
    email: "",
    departmentCode: "",
    organizationCode: "",
  });

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    setEmployees({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();
    dispatch(
      employeeActions.updateEmployeeAction({ id: id, employee: employee })
    ).then((response: any) => {
      if (response) {
        navigate("/employees");
      }
    });
  };

  const fetchAllDepartments = () => {
    dispatch(departmentActions.getAllDepartmentsAction());
  };

  const fetchAllOrganizations = () => {
    dispatch(organizationActions.getAllOrganizationsAction());
  };

  useEffect(() => {
    fetchAllDepartments();
    fetchAllOrganizations();
  }, []);

  const fetchEmployeeById = () => {
    dispatch(employeeActions.getEmployeeByIdAction({ id: id }));
  };

  let { departments } = departmentState;
  let { organizations } = organizationState;

  useEffect(() => {
    fetchEmployeeById();
  }, [id]);

  useEffect(() => {
    setEmployees({
      ...employee,
      employeeName: employeeState.employee.employeeName,
      employeeSalary: employeeState.employee.employeeSalary,
      employeeAddress: employeeState.employee.employeeAddress,
      email: employeeState.employee.email,
      departmentCode: employeeState.employee.departmentCode,
      organizationCode: employeeState.employee.organizationCode,
    });
  }, [employeeState]);

  let {
    employeeName,
    employeeSalary,
    employeeAddress,
    email,
    departmentCode,
    organizationCode,
  } = employee;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-success text-center text-white">
                <h2>Update Employee</h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={employeeName}
                      name="employeeName"
                      onChange={onInputChange}
                      placeholder="Enter Employee Name"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={employeeSalary}
                      name="employeeSalary"
                      onChange={onInputChange}
                      placeholder="Enter Employee Salary"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={employeeAddress}
                      name="employeeAddress"
                      onChange={onInputChange}
                      placeholder="Enter Employee Address"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={email}
                      name="email"
                      onChange={onInputChange}
                      placeholder="Enter Employee EmailId"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <select
                      value={departmentCode}
                      name="departmentCode"
                      onChange={onInputChange}
                      className="form-control"
                    >
                      <option value="">Select Department</option>

                      {departments.map((department) => {
                        return (
                          <option
                            key={department.departmentId}
                            value={department.departmentCode}
                          >
                            {department.departmentCode}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mt-2">
                    <select
                      value={organizationCode}
                      name="organizationCode"
                      onChange={onInputChange}
                      className="form-control"
                    >
                      <option value="">Select Organization</option>
                      {organizations.map((organization) => {
                        return (
                          <option
                            key={organization.organizationId}
                            value={organization.organizationCode}
                          >
                            {organization.organizationCode}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mt-2">
                    <input
                      type="submit"
                      value={"Update"}
                      className="btn btn-success form-control"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
