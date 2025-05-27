export interface LoginResponse {
  status: boolean;
  code: string;
  data: Refresh;
}

export interface Refresh {
  refreshToken: string;
  refreshExpireAt: number;
}

export interface GetAccessTokenResponse {
  status: boolean;
  code: string;
  data: Access;
}

export interface Access {
  accessToken: string;
  accessExpireAt: number;
}

export interface GetMeResponse {
  status: boolean;
  code: string;
  data: Me;
}

export interface Me {
  userId: string;
  displayName: string;
  userNo: string;
  branch: Branch;
  department: Department;
}

export interface Branch {
  bankBranchId: string;
  bankBranchNo: string;
  branchTitle: string;
}

export interface Department {
  centralDepartmentId: string;
  departmentTitle: string;
  departmentNo: string;
}
