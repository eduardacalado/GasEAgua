import { Address } from "@store/modules/user/types";
import { OrderPaymentStatus } from "src/types/orders";

export type UserPayload = {
  username: string;
  telephone?: string;
  address: {
    street: string;
    reference: string;
    number: string;
    local: string;
  };
};

export type AccountSummary = {
  openBalance: number;
  openAccountsCount: number;
  overdueAccountsCount: number;
};

export type AdminUserListItem = {
  id: number;
  username: string;
  email: string;
  role: string;
  telephone: string;
  created_at: string;
  addresses: Address[];
  accountSummary: AccountSummary;
};

export type ListUsersResponse = {
  users: AdminUserListItem[];
  total: number;
  page: number;
  totalPages: number;
};

export type GetUsersListParams = {
  page: number;
  limit: number;
  search?: string;
  sort?: "highest_debt_first" | "name_asc";
};

export type AccountSortOption =
  | "unpaid_first"
  | "date_desc"
  | "date_asc"
  | "balance_desc"
  | "balance_asc";

export type GetUserAccountsParams = {
  userId: number;
  sort?: AccountSortOption;
};

export type UserAccountTransaction = {
  id: number;
  order_id: number;
  type: "PAYMENT" | "INTEREST" | "ADJUSTMENT";
  amount: number;
  old_value: number;
  new_value: number;
  payment_method?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type UserAccountProps = {
  id: number;
  user_id: number;
  status: string;
  payment_state: OrderPaymentStatus;
  total: number;
  updated_at: string;
  created_at: string;
  interest_allowed: boolean;
  transactions?: UserAccountTransaction[];
};
