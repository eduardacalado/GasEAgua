import styled from "styled-components/native";
import theme from "src/styles/theme";

export const Container = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
    gap: 16,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
  margin-top: ${theme.size.m6};
  margin-bottom: ${theme.size.m2};
`;

export const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.9);
  font-size: ${theme.font.size.m3};
  margin-bottom: ${theme.size.m2};
`;

export const SectionCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m6};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
  margin-bottom: ${theme.size.m4};
`;

export const IconBadge = styled.View<{ backgroundColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const SectionTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
  flex: 1;
`;

export const ContactName = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
`;

export const PhoneNumber = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
  margin-top: ${theme.size.m1};
  margin-bottom: ${theme.size.m4};
`;

export const ContactActionsRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
`;

export const ContactActionButton = styled.TouchableOpacity<{
  backgroundColor: string;
}>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m2};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${theme.size.m3};
  padding: ${theme.size.m3};
`;

export const ContactActionLabel = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.bold};
`;

export const HoursText = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
`;

export const GuideStep = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${theme.size.m3};
`;

export const StepNumberBadge = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${theme.colors.ORANGE_50};
  align-items: center;
  justify-content: center;
`;

export const StepNumber = styled.Text`
  color: ${theme.colors.ORANGE_200};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.bold};
`;

export const StepTextGroup = styled.View`
  flex: 1;
`;

export const StepTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
`;

export const StepDescription = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  margin-top: 2px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.GRAY_200};
  margin: ${theme.size.m4} 0;
`;

export const FaqQuestion = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
`;

export const FaqAnswer = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  margin-top: ${theme.size.m1};
`;
