import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { OrganizationService } from "../../modules/organizations/services/OrganizationService";
import { IOrganization } from "../../modules/organizations/models/IOrganization";
import { ToastUtil } from "../../util/ToastUtil";

/**
 * getAllOrganizations
 */
export const getAllOrganizationsAction: any = createAsyncThunk(
  "organizations/getAllOrganizationsAction",
  async (payload: {}, { rejectWithValue }): Promise<IOrganization[] | any> => {
    try {
      let response = await OrganizationService.getAllOrganizations();
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
 * getOrganizationById
 */
export const getOrganizationByIdAction: any = createAsyncThunk(
  "organizations/getOrganizationByIdAction",
  async (
    payload: { id: any },
    { rejectWithValue }
  ): Promise<IOrganization | any> => {
    try {
      let { id } = payload;
      let response = await OrganizationService.getOrganizationById(id);
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
 * deleteOrganization
 */
export const deleteOrganizationAction: any = createAsyncThunk(
  "organizations/deleteOrganizationAction",
  async (payload: { id: any }, { rejectWithValue, dispatch }): Promise<any> => {
    try {
      let { id } = payload;
      let response = await OrganizationService.deleteOrganization(id);
      if (response && response.data) {
        dispatch(getAllOrganizationsAction());
      }
    } catch (error: any) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
/**
 * saveOrganization
 */
export const saveOrganizationAction: any = createAsyncThunk(
  "organizations/saveOrganizationAction",
  async (
    payload: { organization: IOrganization },
    { rejectWithValue }
  ): Promise<IOrganization | any> => {
    try {
      let { organization } = payload;
      let response = await OrganizationService.saveOrganization(organization);
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
 * updateOrganization
 */
export const updateOrganizationAction: any = createAsyncThunk(
  "organizations/updateOrganizationAction",
  async (payload: { id: any; organization: IOrganization }): Promise<any> => {
    try {
      let { id, organization } = payload;
      let response = await OrganizationService.updateOrganization(
        id,
        organization
      );
      return response;
    } catch (error: any) {
      if (!error) {
        throw error;
      }
      return isRejectedWithValue(error.response.data);
    }
  }
);
