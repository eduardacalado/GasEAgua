import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderCard } from "@components/order-card";
import { FlatList } from "react-native";
import { OrderStatusProps } from "src/types/orders";
import * as S from "./styles";

export const OrdersList = () => {
  const mockOrders = [
    {
      id: 1,
      user_id: 101,
      status: "PENDENTE" as OrderStatusProps,
      gasAmount: 2,
      waterAmount: 5,
      created_at: new Date("2025-03-10T10:00:00Z"),
      updated_at: new Date("2025-03-11T12:00:00Z"),
      total: 150,
      address: {
        id: 1,
        street: "Rua E, 654",
        city: "Porto Alegre",
        reference: "RS",
        local: "Jaqueira",
      },
      user: {
        username: "joaosilva",
        telephone: "11987654321",
      },
    },
    {
      id: 2,
      user_id: 102,
      status: "PENDENTE" as OrderStatusProps,
      gasAmount: 1,
      waterAmount: 3,
      created_at: new Date("2025-03-09T09:30:00Z"),
      updated_at: new Date("2025-03-09T11:00:00Z"),
      total: 90,
      address: {
        id: 1,
        street: "Rua E, 654",
        city: "Porto Alegre",
        reference: "RS",
        local: "Jaqueira",
      },
      user: {
        username: "mariacunha",
        telephone: "21987651234",
      },
    },
    {
      id: 3,
      user_id: 103,
      status: "PENDENTE" as OrderStatusProps,
      gasAmount: 0,
      waterAmount: 4,
      created_at: new Date("2025-03-08T14:45:00Z"),
      updated_at: new Date("2025-03-08T16:00:00Z"),
      total: 60,
      address: {
        id: 1,
        street: "Rua E, 654",
        city: "Porto Alegre",
        reference: "RS",
        local: "Jaqueira",
      },
      user: {
        username: "carlosmelo",
        telephone: "31981234567",
      },
    },
    {
      id: 4,
      user_id: 104,
      status: "PENDENTE" as OrderStatusProps,
      gasAmount: 3,
      waterAmount: 2,
      created_at: new Date("2025-03-07T08:15:00Z"),
      updated_at: new Date("2025-03-07T10:00:00Z"),
      total: 120,
      address: {
        id: 1,
        street: "Rua E, 654",
        city: "Porto Alegre",
        reference: "RS",
        local: "Jaqueira",
      },
      user: {
        username: "anapereira",
        telephone: "41982345678",
      },
    },
    {
      id: 5,
      user_id: 105,
      status: "PENDENTE" as OrderStatusProps,
      gasAmount: 2,
      waterAmount: 1,
      created_at: new Date("2025-03-06T15:00:00Z"),
      updated_at: new Date("2025-03-06T16:30:00Z"),
      total: 80,
      address: {
        id: 1,
        street: "Rua E, 654",
        city: "Porto Alegre",
        reference: "RS",
        local: "Jaqueira",
      },
      user: {
        username: "pedroramos",
        telephone: "51983456789",
      },
    },
  ];

  return (
    <LinearGradientBackground>
      <S.Container>
        <FlatList
          data={mockOrders}
          ListHeaderComponent={S.HeaderSpacing}
          renderItem={({ item }) => {
            return <OrderCard {...item} />;
          }}
          ItemSeparatorComponent={() => <S.Divider />}
        />
      </S.Container>
    </LinearGradientBackground>
  );
};
