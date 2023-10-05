import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IDepartment } from "../../models/IDepartment";
import { useNavigate, useParams } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";
import * as departmentActions from "../../../../redux/departments/departments.actions";
import * as departmentReducer from "../../../../redux/departments/departments.slice";
import {
  RootState,
  AppDispatch,
  useAppDispatch,
} from "../../../../redux/store";
import { useSelector } from "react-redux";

const UpdateDepartment: React.FC = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  const dispatch: AppDispatch = useAppDispatch();

  const departmentState: departmentReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[departmentReducer.departmentFeatureKey];
    }
  );

  const [department, setDepartment] = useState<IDepartment>({
    departmentName: "",
    departmentCode: "",
    departmentDescription: "",
  });

  const fetchDepartmentById = () => {
    dispatch(departmentActions.getDepartmentByIdAction({ id: id }));
  };

  useEffect(() => {
    fetchDepartmentById();
  }, [id]);

  useEffect(() => {
    setDepartment({
      ...department,
      departmentName: departmentState.department.departmentName,
      departmentCode: departmentState.department.departmentCode,
      departmentDescription: departmentState.department.departmentDescription,
    });
  }, [departmentState]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement | any>) => {
    setDepartment({
      ...department,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();
    dispatch(
      departmentActions.updateDepartmentAction({
        id: id,
        department: department,
      })
    ).then((response: any) => {
      if (response) {
        navigate("/departments");
      }
    });
  };

  const { departmentName, departmentCode, departmentDescription } = department;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-success text-white text-center">
                <h2>Update Department</h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={departmentName}
                      name="departmentName"
                      onChange={onInputChange}
                      placeholder="Enter Department Name"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={departmentCode}
                      name="departmentCode"
                      onChange={onInputChange}
                      placeholder="Enter Department Code"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={departmentDescription}
                      name="departmentDescription"
                      onChange={onInputChange}
                      placeholder="Enter Department Description"
                      className="form-control"
                    />
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

export default UpdateDepartment;
