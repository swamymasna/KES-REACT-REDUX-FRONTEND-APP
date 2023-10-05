import { createAsyncThunk } from "@reduxjs/toolkit";
import { DepartmentService } from "../../modules/departments/services/DepartmentService";
import { IDepartment } from "../../modules/departments/models/IDepartment";

/**
 * getAllDepartments
 */
export const getAllDepartmentsAction: any = createAsyncThunk(
  "departments/getAllDepartmentsAction",
  async (payload: {}, { rejectWithValue }): Promise<IDepartment[] | any> => {
    try {
      let response = await DepartmentService.getAllDepartments();
      return response.data;
    } catch (error: any) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
/**
 * deleteDepartment
 */
export const deletDepartmentAction: any = createAsyncThunk(
  "departments/deletDepartmentAction",
  async (payload: { id: any }, { rejectWithValue, dispatch }): Promise<any> => {
    try {
      let { id } = payload;
      let response = await DepartmentService.deleteDepartment(id);
      if (response && response.data) {
        dispatch(getAllDepartmentsAction());
      }
      return response.data;
    } catch (error: any) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * getDepartmentById
 */
export const getDepartmentByIdAction: any = createAsyncThunk(
  "departments/getDepartmentByIdAction",
  async (
    payload: { id: any },
    { rejectWithValue }
  ): Promise<IDepartment[] | any> => {
    try {
      let { id } = payload;
      let response = await DepartmentService.getDepartmentById(id);
      return response.data;
    } catch (error: any) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * saveDepartment
 */
export const saveDepartmentAction: any = createAsyncThunk(
  "departments/saveDepartmentAction",
  async (
    payload: { department: IDepartment },
    { rejectWithValue }
  ): Promise<IDepartment[] | any> => {
    try {
      let { department } = payload;
      let response = await DepartmentService.saveDepartment(department);
      return response;
    } catch (error: any) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * updateDepartment
 */
export const updateDepartmentAction: any = createAsyncThunk(
  "departments/updateDepartmentAction",
  async (
    payload: { id: any; department: IDepartment },
    { rejectWithValue }
  ): Promise<IDepartment[] | any> => {
    try {
      let { id, department } = payload;
      let response = await DepartmentService.updateDepartment(id, department);
      return response;
    } catch (error: any) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
