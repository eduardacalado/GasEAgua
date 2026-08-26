import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  DEFAULT_CITY,
  DEFAULT_ENGENHO,
  ENGENHO_OPTIONS,
} from "src/constants/localOptions";
import { OrderDeliveryAddress } from "src/services/order/types";
import * as S from "./styles";

type DeliveryAddressFormProps = {
  control: Control<OrderDeliveryAddress>;
  errors: FieldErrors<OrderDeliveryAddress>;
  mainLocal: string;
  selectedEngenho: string;
  onMainLocalChange: (selectedMainLocal: string) => void;
  onEngenhoChange: (selectedEngenhoName: string) => void;
};

export function DeliveryAddressForm({
  control,
  errors,
  mainLocal,
  selectedEngenho,
  onMainLocalChange,
  onEngenhoChange,
}: DeliveryAddressFormProps) {
  return (
    <S.DeliveryAddressFormStack>
      <S.InputArea>
        <S.SelectInput
          selectedValue={mainLocal}
          onValueChange={onMainLocalChange}
        >
          <S.SelectInput.Item label={DEFAULT_CITY} value={DEFAULT_CITY} />
          <S.SelectInput.Item label={DEFAULT_ENGENHO} value={DEFAULT_ENGENHO} />
        </S.SelectInput>
      </S.InputArea>

      {mainLocal === DEFAULT_ENGENHO && (
        <>
          <S.InputArea>
            <S.SelectInput
              selectedValue={selectedEngenho}
              onValueChange={onEngenhoChange}
            >
              <S.SelectInput.Item label="Selecione o engenho" value="" />
              {ENGENHO_OPTIONS.map((engenhoOption) => (
                <S.SelectInput.Item
                  key={engenhoOption}
                  label={engenhoOption}
                  value={engenhoOption}
                />
              ))}
            </S.SelectInput>
          </S.InputArea>
          {errors.local && (
            <S.LabelError>{errors.local.message}</S.LabelError>
          )}
        </>
      )}

      {mainLocal !== DEFAULT_ENGENHO && (
        <>
          <S.StreetNumberInputContainer>
            <Controller
              control={control}
              name="street"
              render={({ field: { onChange, value } }) => (
                <S.CompactInputArea>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color="#7e7e7e"
                  />
                  <S.Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Rua"
                  />
                </S.CompactInputArea>
              )}
            />
            <Controller
              control={control}
              name="number"
              render={({ field: { onChange, value } }) => (
                <S.CompactInputArea>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color="#7e7e7e"
                  />
                  <S.Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Número"
                  />
                </S.CompactInputArea>
              )}
            />
          </S.StreetNumberInputContainer>
          {errors.street && (
            <S.LabelError>{errors.street.message}</S.LabelError>
          )}
          {errors.number && (
            <S.LabelError>{errors.number.message}</S.LabelError>
          )}
        </>
      )}

      <Controller
        control={control}
        name="reference"
        render={({ field: { onChange, value } }) => (
          <S.InputArea>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color="#7e7e7e"
            />
            <S.Input
              placeholder="Referência"
              onChangeText={onChange}
              value={value}
            />
          </S.InputArea>
        )}
      />
      {errors.reference && (
        <S.LabelError>{errors.reference.message}</S.LabelError>
      )}
    </S.DeliveryAddressFormStack>
  );
}
