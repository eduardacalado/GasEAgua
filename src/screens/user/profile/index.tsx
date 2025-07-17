import { CustomHeader } from "@components/custom-header";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { useNavigation } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { authActions } from "@store/modules/auth/slice";
import { safetyString } from "@utils/safety-string";
import { isAxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { DEFAULT_CITY, ENGENHO_OPTIONS } from "src/constants/localOptions";
import { postUpdateUser } from "src/services/user";
import theme from "src/styles/theme";
import * as S from "./styles";

export function UserProfile() {
  const [isInputDisabled, setIsInputDisabled] = useState(true);
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

  const defaultLocal = address?.local === DEFAULT_CITY ? DEFAULT_CITY : "Engenho";

  const [mainLocal, setMainLocal] = useState(defaultLocal);

  const defaultEngenho = address?.local && address?.local !== DEFAULT_CITY ? address.local : ENGENHO_OPTIONS[0]

  const [selectedEngenho, setSelectedEngenho] = useState(defaultEngenho);

  function handleEditProfile() {
    setIsInputDisabled(false);
  }

  async function handleUpdateUserData() {
    setIsLoading(true);
    try {
      const localToSend =
        mainLocal === DEFAULT_CITY ? DEFAULT_CITY : selectedEngenho;

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
      setIsInputDisabled(true);
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
            {!isInputDisabled && (
              <S.TitleInfoContainer>
                <S.InfoTitle>Local</S.InfoTitle>
                <S.InfoInputContainer>
                  <S.SelectInput
                    selectedValue={mainLocal}
                    onValueChange={(value: string) => setMainLocal(value)}
                  >
                    <S.SelectInput.Item label={DEFAULT_CITY} value={DEFAULT_CITY} />
                    <S.SelectInput.Item label="Engenho" value="Engenho" />
                  </S.SelectInput>
                </S.InfoInputContainer>
              </S.TitleInfoContainer>
            )}
            {mainLocal === "Engenho" && (
              <S.TitleInfoContainer>
                <S.InfoTitle>Engenho</S.InfoTitle>
                <S.InfoInputContainer>
                  <S.SelectInput
                    selectedValue={selectedEngenho}
                    onValueChange={(value: string) => setSelectedEngenho(value)}
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
              </S.TitleInfoContainer>
            )}
            {mainLocal === DEFAULT_CITY && (
              <S.StreetNumberInputContainer>
                <S.TitleInfoContainer>
                  <S.InfoTitle>Rua</S.InfoTitle>
                  <S.InfoInputContainer>
                    <S.InfoInput
                      editable={!isInputDisabled}
                      value={addressFields.street}
                      onChangeText={(text: string) =>
                        setAddressFields({ ...addressFields, street: text })
                      }
                    />
                  </S.InfoInputContainer>
                </S.TitleInfoContainer>
                <S.TitleInfoContainer>
                  <S.InfoTitle>Número</S.InfoTitle>
                  <S.InfoInputContainer>
                    <S.InfoInput
                      editable={!isInputDisabled}
                      value={addressFields.number}
                      onChangeText={(text: string) =>
                        setAddressFields({ ...addressFields, number: text })
                      }
                    />
                  </S.InfoInputContainer>
                </S.TitleInfoContainer>
              </S.StreetNumberInputContainer>
            )}
            <S.TitleInfoContainer>
              <S.InfoTitle>Referência</S.InfoTitle>
              <S.InfoInputContainer>
                <S.InfoInput
                  editable={!isInputDisabled}
                  value={addressFields.reference}
                  onChangeText={(text: string) =>
                    setAddressFields({ ...addressFields, reference: text })
                  }
                />
              </S.InfoInputContainer>
            </S.TitleInfoContainer>
          </S.InfoContainer>

          <S.ButtonsContainer>
            <TouchableOpacity
              onPress={
                isInputDisabled ? handleEditProfile : handleUpdateUserData
              }
              disabled={isLoading}
            >
              <S.AlterInfoButton
                colors={["#1F7F75", "#34958C", "#5FC3B9"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >
                <S.ButtonText>
                  {isInputDisabled ? "Editar perfil" : "Salvar"}
                </S.ButtonText>
              </S.AlterInfoButton>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              disabled={!isInputDisabled}
            >
              <S.LogoutButton
                colors={
                  isInputDisabled
                    ? ["#DB1A00", "#ED4200", "#FF6A00"]
                    : ["#929292", "#c5c0c0", "#EEEEEE"]
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
