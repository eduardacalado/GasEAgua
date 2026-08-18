import { CustomHeader } from "@components/custom-header";
import { Feather } from "@expo/vector-icons";
import { useAppSelector } from "@hooks/useAppSelector";
import { useNavigation } from "@react-navigation/native";
import { useUpdateProfile } from "@screens/user/profile/use-update-profile";
import { StatusBar } from "expo-status-bar";
import { Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import {
  DEFAULT_CITY,
  DEFAULT_ENGENHO,
  ENGENHO_OPTIONS,
} from "src/constants/localOptions";
import { getAuthenticatedHomeTabRoute } from "src/helpers/authenticated-home-route";
import theme from "src/styles/theme";
import * as S from "./styles";

export function UserProfile() {
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
  } = useUpdateProfile();
  const { navigate } = useNavigation();
  const {
    user: { role },
  } = useAppSelector((state) => state.user);

  const avatarInitial = username?.trim()?.charAt(0)?.toUpperCase() || "?";
  const homeTabRoute = getAuthenticatedHomeTabRoute(role);

  const handleBackToHome = () => {
    navigate(homeTabRoute as never);
  };

  return (
    <S.SafeAreaViewContainer>
      <StatusBar style="dark" />
      <S.ScrollViewBackground>
        <S.MapBanner>
          <S.MapImage
            source={require("../../../../assets/images/map.jpg")}
            placeholder={{ blurhash }}
            contentFit="cover"
          />
          <S.MapHeaderOverlay>
            <CustomHeader
              color={theme.colors.ORANGE_300}
              handleBack={handleBackToHome}
            />
          </S.MapHeaderOverlay>
        </S.MapBanner>
        <S.Container>
          <S.ProfileHeader>
            <S.AvatarBadge>
              <S.AvatarInitial>{avatarInitial}</S.AvatarInitial>
            </S.AvatarBadge>
            <S.Name>{username}</S.Name>
            <S.Email>{email}</S.Email>
          </S.ProfileHeader>

          <S.FormCard>
            <S.InfoContainer>
              <S.TitleInfoContainer>
                <S.FieldLabelRow>
                  <S.FieldIconBadge>
                    <Feather
                      name="map-pin"
                      size={14}
                      color={theme.colors.ORANGE_200}
                    />
                  </S.FieldIconBadge>
                  <S.InfoTitle>Local</S.InfoTitle>
                </S.FieldLabelRow>
                <Controller
                  control={control}
                  name="mainLocal"
                  render={({ field: { onChange } }) => (
                    <S.InfoInputContainer isEditing={isEditing}>
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
                  <S.FieldLabelRow>
                    <S.FieldIconBadge>
                      <Feather
                        name="home"
                        size={14}
                        color={theme.colors.ORANGE_200}
                      />
                    </S.FieldIconBadge>
                    <S.InfoTitle>Engenho</S.InfoTitle>
                  </S.FieldLabelRow>
                  <Controller
                    control={control}
                    name="engenho"
                    render={() => (
                      <S.InfoInputContainer isEditing={isEditing}>
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
                    <S.FieldLabelRow>
                      <S.FieldIconBadge>
                        <Feather
                          name="navigation"
                          size={14}
                          color={theme.colors.ORANGE_200}
                        />
                      </S.FieldIconBadge>
                      <S.InfoTitle>Rua</S.InfoTitle>
                    </S.FieldLabelRow>
                    <Controller
                      control={control}
                      name="street"
                      render={({ field: { onChange, value } }) => (
                        <S.InfoInputContainer isEditing={isEditing}>
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
                    <S.FieldLabelRow>
                      <S.FieldIconBadge>
                        <Feather
                          name="hash"
                          size={14}
                          color={theme.colors.ORANGE_200}
                        />
                      </S.FieldIconBadge>
                      <S.InfoTitle>Número</S.InfoTitle>
                    </S.FieldLabelRow>
                    <Controller
                      control={control}
                      name="number"
                      render={({ field: { onChange, value } }) => (
                        <S.InfoInputContainer isEditing={isEditing}>
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
                <S.FieldLabelRow>
                  <S.FieldIconBadge>
                    <Feather
                      name="bookmark"
                      size={14}
                      color={theme.colors.ORANGE_200}
                    />
                  </S.FieldIconBadge>
                  <S.InfoTitle>Referência</S.InfoTitle>
                </S.FieldLabelRow>
                <Controller
                  control={control}
                  name="reference"
                  render={({ field: { onChange, value } }) => (
                    <S.InfoInputContainer isEditing={isEditing}>
                      <S.InfoInput
                        editable={isEditing}
                        value={value}
                        onChangeText={(text: string) => {
                          onChange(text);
                          setAddressFields({
                            ...addressFields,
                            reference: text,
                          });
                        }}
                      />
                    </S.InfoInputContainer>
                  )}
                />
              </S.TitleInfoContainer>
            </S.InfoContainer>
          </S.FormCard>

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
                    ? ["#C5C5C5", "#C5C5C5", "#C5C5C5"]
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
