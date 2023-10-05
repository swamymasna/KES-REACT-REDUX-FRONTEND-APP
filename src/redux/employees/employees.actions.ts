import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEmployee } from "../../modules/employees/models/IEmployee";
import { EmployeeService } from "../../modules/employees/services/EmployeeService";

/**
 * getAllEmployees
 */
export const getAllEmployeesAction: any = createAsyncThunk(
  "employees/getAllEmployeesAction",
  async (payload: {}, { rejectWithValue }): Promise<IEmployee[] | any> => {
    try {
      let response = await EmployeeService.getAllEmployees();
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
 * deleteEmployee
 */
export const deleteEmployeeAction: any = createAsyncThunk(
  "employees/deleteEmployeeAction",
  async (payload: { id: any }, { rejectWithValue, dispatch }): Promise<any> => {
    try {
      let { id } = payload;
      let response = await EmployeeService.deleteEmployee(id);

      if (response && response.data) {
        dispatch(getAllEmployeesAction());
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
 * getEmployeeById
 */
export const getEmployeeByIdAction: any = createAsyncThunk(
  "employees/getEmployeeByIdAction",
  async (
    payload: { id: any },
    { rejectWithValue }
  ): Promise<IEmployee | any> => {
    try {
      let { id } = payload;
      let response = await EmployeeService.getEmployeeById(id);
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
 * createEmployee
 */
export const createEmployeeAction: any = createAsyncThunk(
  "employees/createEmployeeAction",
  async (
    payload: { employee: IEmployee },
    { rejectWithValue }
  ): Promise<IEmployee | any> => {
    try {
      let { employee } = payload;
      let response = await EmployeeService.saveEmployee(employee);
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
 * updateEmployee
 */
export const updateEmployeeAction: any = createAsyncThunk(
  "employees/updateEmployeeAction",
  async (
    payload: { id: any; employee: IEmployee },
    { rejectWithValue }
  ): Promise<IEmployee | any> => {
    try {
      let { id, employee } = payload;
      let response = await EmployeeService.updateEmployee(id, employee);
      return response;
    } catch (error: any) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
