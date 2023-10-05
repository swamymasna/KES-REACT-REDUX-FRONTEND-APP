import {
  SerializedError,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { IOrganization } from "../../modules/organizations/models/IOrganization";
import * as organizationActions from "../../redux/organizations/organizations.actions";
import { ToastUtil } from "../../util/ToastUtil";

export const organizationFeatureKey = "organizationFeature";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  organizations: IOrganization[];
  organization: IOrganization;
}

const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  organizations: [] as IOrganization[],
  organization: {} as IOrganization,
};

export const organizationSlice = createSlice({
  name: "organizationSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * getAllOrganizations
     */
    builder
      .addCase(
        organizationActions.getAllOrganizationsAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        organizationActions.getAllOrganizationsAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.organizations = action.payload;
        }
      )
      .addCase(
        organizationActions.getAllOrganizationsAction.rejected,
        (state, action) => {
          ToastUtil.displayErrorToast(
            "Unable to Fetch Organizations from the Server"
          );
          state.loading = false;
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      )

      /**
       * getOrganizationById
       */
      .addCase(
        organizationActions.getOrganizationByIdAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        organizationActions.getOrganizationByIdAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.organization = action.payload;
        }
      )
      .addCase(
        organizationActions.getOrganizationByIdAction.rejected,
        (state, action) => {
          ToastUtil.displayErrorToast(
            "Unable to Fetch Organization from the Server"
          );
          state.loading = false;
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      )

      /**
       * deleteOrganization
       */
      .addCase(
        organizationActions.deleteOrganizationAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        organizationActions.deleteOrganizationAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayInfoToast("Organization is Deleted");
        }
      )
      .addCase(
        organizationActions.deleteOrganizationAction.rejected,
        (state, action) => {
          ToastUtil.displayErrorToast("Unable to Delete Organization");
          state.loading = false;
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      )
      /**
       * saveOrganization
       */
      .addCase(
        organizationActions.saveOrganizationAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        organizationActions.saveOrganizationAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Organization is Created");
        }
      )
      .addCase(
        organizationActions.saveOrganizationAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Save Organization into the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      )
      /**
       * updateOrganization
       */
      .addCase(
        organizationActions.updateOrganizationAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        organizationActions.updateOrganizationAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Organization is Updated");
        }
      )
      .addCase(
        organizationActions.updateOrganizationAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast(
            "Unable to Update Organization into the Server"
          );
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.error;
          }
        }
      );
  },
});
