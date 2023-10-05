import {
  SerializedError,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { IDepartment } from "../../modules/departments/models/IDepartment";
import * as departmentActions from "../../redux/departments/departments.actions";
import { ToastUtil } from "../../util/ToastUtil";

export const departmentFeatureKey = "departmentFeature";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  departments: IDepartment[];
  department: IDepartment;
}

const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  departments: [] as IDepartment[],
  department: {} as IDepartment,
};

export const departmentSlice = createSlice({
  name: "departmentSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * getAllDepartments
     */
    builder
      .addCase(
        departmentActions.getAllDepartmentsAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        departmentActions.getAllDepartmentsAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.departments = action.payload;
        }
      )
      .addCase(
        departmentActions.getAllDepartmentsAction.rejected,
        (state, action) => {
          state.loading = false;
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      )

      /**
       * deleteDepartment
       */
      .addCase(
        departmentActions.deletDepartmentAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        departmentActions.deletDepartmentAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayInfoToast("Department is Deleted");
        }
      )
      .addCase(
        departmentActions.deletDepartmentAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Delete Department from the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      )

      /**
       * getDepartmentById
       */
      .addCase(
        departmentActions.getDepartmentByIdAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        departmentActions.getDepartmentByIdAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.department = action.payload;
        }
      )
      .addCase(
        departmentActions.getDepartmentByIdAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Fetch Department from the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      )
      /**
       * saveDepartment
       */
      .addCase(
        departmentActions.saveDepartmentAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        departmentActions.saveDepartmentAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Department is Created");
        }
      )
      .addCase(
        departmentActions.saveDepartmentAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Create Department into the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      )
      /**
       * updateDepartment
       */
      .addCase(
        departmentActions.updateDepartmentAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        departmentActions.updateDepartmentAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Department is Updated");
        }
      )
      .addCase(
        departmentActions.updateDepartmentAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Update Department into the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      );
  },
});
