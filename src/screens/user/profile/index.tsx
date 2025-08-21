import { CustomHeader } from "@components/custom-header";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { useNavigation } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { authActions } from "@store/modules/auth/slice";
import { safetyString } from "@utils/safety-string";
import { isAxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { DEFAULT_CITY, DEFAULT_ENGENHO, ENGENHO_OPTIONS } from "src/constants/localOptions";
import { postUpdateUser } from "src/services/user";
import theme from "src/styles/theme";
import * as yup from "yup";
import * as S from "./styles";


const schema = yup.object({
  engenho: yup.string(),
  mainLocal: yup.string(),
  street: yup.string().required("Informe a rua"),
  number: yup.string().required("Informe o número"),
  reference: yup.string().required("Informe a referência"),
});

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const dispatch = useAppDispatch();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  function handleLogout() {
    dispatch(authActions.clearAuthData());
  }

  
  const {
    user: { address, email, name: username, telephone },
  } = useAppSelector((state) => state.user);
  
  const [addressFields, setAddressFields] = useState({
    street: safetyString(address?.street),
    number: safetyString(address?.number),
    reference: safetyString(address?.reference),
    local: safetyString(address?.local, DEFAULT_CITY),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      street: addressFields.street,
      number: addressFields.number,
      reference: addressFields.reference,
    },
  });

  const defaultLocal = address?.local === DEFAULT_CITY ? DEFAULT_CITY : DEFAULT_ENGENHO;

  const [mainLocal, setMainLocal] = useState(defaultLocal);

  const defaultEngenho = address?.local && address?.local !== DEFAULT_CITY ? address.local : DEFAULT_ENGENHO

  const [selectedEngenho, setSelectedEngenho] = useState(defaultEngenho);

  function handleEditProfile() {
    setIsEditing(true);
    console.log("Editing profile");
  }

  async function handleUpdateUserData() {
    console.log("User data updated successfully");
    setIsLoading(true);
    try {
      let localToSend = mainLocal
      let addressToSend = { ...addressFields };
      
      if (mainLocal === DEFAULT_ENGENHO) {
        localToSend = selectedEngenho;
        addressToSend = {
          street: "",
          number: "",
          reference: "",
          local: localToSend,
        };
      } else if (mainLocal === DEFAULT_CITY) {
        localToSend = DEFAULT_CITY;
        addressToSend = {
          ...addressFields,
          local: localToSend,
        }
      };

      await postUpdateUser({
        username,
        telephone,
        address: {
          ...addressFields,
          local: localToSend,
        },
      });


      Toast.show({
        type: "success",
        text1: "Dados atualizados com sucesso!",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text2: error.response?.data.message,
        });
      }
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  }

  return (
    <S.SafeAreaViewContainer>
      <StatusBar style="dark" />
      <S.ScrollViewBackground>
        <S.MapImage
          source={require("../../../../assets/images/map.jpg")}
          placeholder={{ blurhash }}
          contentFit="cover"
        >
          <CustomHeader color={theme.colors.ORANGE_300} />
        </S.MapImage>
        <S.Container>
          <S.Name>{username}</S.Name>
          <S.Email>{email}</S.Email>

          <S.InfoContainer>
              <S.TitleInfoContainer>
                <S.InfoTitle>Local</S.InfoTitle>
                <Controller
                  control={control}
                  name="mainLocal"
                  render={({ field: { onChange, value } }) => (
                <S.InfoInputContainer>
                  <S.SelectInput
                    selectedValue={mainLocal}
                    onValueChange={(value: string) => {onChange(value); setMainLocal(value)}}
                    enabled={isEditing}
                  >
                    <S.SelectInput.Item label={DEFAULT_CITY} value={DEFAULT_CITY} />
                    <S.SelectInput.Item label={DEFAULT_ENGENHO} value={DEFAULT_ENGENHO} />
                  </S.SelectInput>
                </S.InfoInputContainer>
                  )}
                />
              </S.TitleInfoContainer>
            {mainLocal === DEFAULT_ENGENHO && (
              <S.TitleInfoContainer>
                <S.InfoTitle>Engenho</S.InfoTitle>
                  <Controller
                    control={control}
                    name="engenho"
                    render={({ field: { onChange, value } }) => (
                      <S.InfoInputContainer>
                  <S.SelectInput
                    selectedValue={selectedEngenho}
                    onValueChange={(value: string) => setSelectedEngenho(value)}
                    enabled={isEditing}
                  >
                    {ENGENHO_OPTIONS.map((option) => (
                      <S.SelectInput.Item
                        key={option}
                        label={option}
                        value={option}
                      />
                    ))}
                  </S.SelectInput>
                </S.InfoInputContainer>
                  )} />
              </S.TitleInfoContainer>
            )}
            {mainLocal === DEFAULT_CITY && (
              <S.StreetNumberInputContainer>
                <S.TitleInfoContainer>
                  <S.InfoTitle>Rua</S.InfoTitle>
                  <Controller
                    control={control}
                    name="street"
                    render={({ field: { onChange, value } }) => (
                  <S.InfoInputContainer>
                    <S.InfoInput
                      editable={isEditing}
                      value={value}
                      onChangeText={(text: string) => {
                        onChange(text);
                        setAddressFields({ ...addressFields, street: text });
                      }}
                    />
                  </S.InfoInputContainer>
                    )}
                  />
                </S.TitleInfoContainer>
                <S.TitleInfoContainer>
                  <S.InfoTitle>Número</S.InfoTitle>
                  <Controller
                    control={control}
                    name="number"
                    render={({ field: { onChange, value } }) => (
                  <S.InfoInputContainer>
                    <S.InfoInput
                      editable={isEditing}
                      value={value}
                      onChangeText={(text: string) => {
                        onChange(text);
                        setAddressFields({ ...addressFields, number: text });
                      }}
                    />
                  </S.InfoInputContainer>
                    )}
                  />
                </S.TitleInfoContainer>
              </S.StreetNumberInputContainer>
            )}
            <S.TitleInfoContainer>
              <S.InfoTitle>Referência</S.InfoTitle>
              <Controller
                control={control}
                name="reference"
                render={({ field: { onChange, value } }) => (
              <S.InfoInputContainer>
                <S.InfoInput
                  editable={isEditing}
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text);
                    setAddressFields({ ...addressFields, reference: text });
                  }}
                />
              </S.InfoInputContainer>
                )}
              />
            </S.TitleInfoContainer>
          </S.InfoContainer>

          <S.ButtonsContainer>
            <TouchableOpacity
              onPress={
                !isEditing ? handleEditProfile : handleSubmit(handleUpdateUserData)
              }
              disabled={isLoading}
            >
              <S.AlterInfoButton
                colors={["#1F7F75", "#34958C", "#5FC3B9"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >
                <S.ButtonText>
                  {!isEditing ? "Editar perfil" : "Salvar"}
                </S.ButtonText>
              </S.AlterInfoButton>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              disabled={isEditing}
            >
              <S.LogoutButton
                colors={
                  isEditing
                    ? ["#929292", "#c5c0c0", "#EEEEEE"]
                    : ["#DB1A00", "#ED4200", "#FF6A00"]
                }
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >
                <S.ButtonText>Deslogar</S.ButtonText>
              </S.LogoutButton>
            </TouchableOpacity>
          </S.ButtonsContainer>
        </S.Container>
      </S.ScrollViewBackground>
    </S.SafeAreaViewContainer>
  );
}
