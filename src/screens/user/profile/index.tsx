import { CustomHeader } from "@components/custom-header";
import { useNavigation } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { useUpdateProfile } from "@screens/user/profile/useUpdateProfile";
import { StatusBar } from "expo-status-bar";
import { Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import theme from "src/styles/theme";
import * as S from "./styles";

export function UserProfile() {
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const {
    isEditing,
    isLoading,
    addressFields,
    mainLocal,
    selectedEngenho,
    handleLogout,
    handleEditProfile,
    handleUpdateUserData,
    control,
    handleSubmit,
    setAddressFields,
    setMainLocal,
    setSelectedEngenho,
    username,
    email,
    DEFAULT_CITY,
    DEFAULT_ENGENHO,
    ENGENHO_OPTIONS,
  } = useUpdateProfile();

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
                      onValueChange={(value: string) => {
                        onChange(value);
                        setMainLocal(value);
                      }}
                      enabled={isEditing}
                    >
                      <S.SelectInput.Item
                        label={DEFAULT_CITY}
                        value={DEFAULT_CITY}
                      />
                      <S.SelectInput.Item
                        label={DEFAULT_ENGENHO}
                        value={DEFAULT_ENGENHO}
                      />
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
                        onValueChange={(value: string) =>
                          setSelectedEngenho(value)
                        }
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
                  )}
                />
              </S.TitleInfoContainer>
            )}
            {mainLocal !== DEFAULT_ENGENHO && (
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
                            setAddressFields({
                              ...addressFields,
                              street: text,
                            });
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
                            setAddressFields({
                              ...addressFields,
                              number: text,
                            });
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
                !isEditing
                  ? handleEditProfile
                  : handleSubmit(handleUpdateUserData)
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
            <TouchableOpacity onPress={handleLogout} disabled={isEditing}>
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
