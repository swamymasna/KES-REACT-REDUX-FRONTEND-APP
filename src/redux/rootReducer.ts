import { combineReducers } from "@reduxjs/toolkit";

import * as organizationReducer from "../redux/organizations/organizations.slice";
import * as departmentReducer from "../redux/departments/departments.slice";
import * as employeeReducer from "../redux/employees/employees.slice";

const rootReducer = combineReducers({
  [organizationReducer.organizationFeatureKey]:
    organizationReducer.organizationSlice.reducer,

  [departmentReducer.departmentFeatureKey]:
    departmentReducer.departmentSlice.reducer,

  [employeeReducer.employeeFeatureKey]: employeeReducer.employeeSlice.reducer,
});
export default rootReducer;
