import {
  SerializedError,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { IEmployee } from "../../modules/employees/models/IEmployee";
import * as employeeActions from "../../redux/employees/employees.actions";
import { ToastUtil } from "../../util/ToastUtil";

export const employeeFeatureKey = "employeeFeature";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  employees: IEmployee[];
  employee: IEmployee;
}

const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  employees: [] as IEmployee[],
  employee: {} as IEmployee,
};

export const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * getAllEmployees
     */
    builder
      .addCase(
        employeeActions.getAllEmployeesAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeeActions.getAllEmployeesAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.employees = action.payload;
        }
      )
      .addCase(
        employeeActions.getAllEmployeesAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Fetch Employees From the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      );

    /**
     *deleteEmployee
     */
    builder
      .addCase(
        employeeActions.deleteEmployeeAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeeActions.deleteEmployeeAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayInfoToast("Employee is Deleted");
        }
      )
      .addCase(
        employeeActions.deleteEmployeeAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Delete Employee From the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      );

    /**
     *getEmployeeById
     */
    builder
      .addCase(
        employeeActions.getEmployeeByIdAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeeActions.getEmployeeByIdAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.employee = action.payload;
        }
      )
      .addCase(
        employeeActions.getEmployeeByIdAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Fetch Employee From the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      );

    /**
     *saveEmployee
     */
    builder
      .addCase(
        employeeActions.createEmployeeAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeeActions.createEmployeeAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Employee is Created");
        }
      )
      .addCase(
        employeeActions.createEmployeeAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Save Employee into the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      );

    /**
     *updateEmployee
     */
    builder
      .addCase(
        employeeActions.updateEmployeeAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeeActions.updateEmployeeAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Employee is Updated");
        }
      )
      .addCase(
        employeeActions.updateEmployeeAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Update Employee into the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      );
  },
});
