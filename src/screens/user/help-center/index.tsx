import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import {
  HELP_CENTER_BUSINESS_HOURS,
  HELP_CENTER_CONTACT,
  HELP_CENTER_FAQ_ITEMS,
  HELP_CENTER_GUIDE_STEPS,
} from "src/constants/help-center";
import theme from "src/styles/theme";
import * as S from "./styles";
import { useHelpCenter } from "./use-help-center";

export function HelpCenterScreen() {
  const { handleCallAdmin, handleOpenWhatsApp, handleCopyPhoneNumber } =
    useHelpCenter();

  return (
    <LinearGradientBackground>
      <S.Container>
        <StatusBar style="light" />
        <CustomHeader showHelpButton={false} />

        <S.ScrollContainer>
          <S.Title>Central de Ajuda</S.Title>
          <S.Subtitle>
            Tire dúvidas sobre o app ou fale com o administrador.
          </S.Subtitle>

          <S.SectionCard>
            <S.SectionHeader>
              <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                <Feather
                  name="phone"
                  size={18}
                  color={theme.colors.ORANGE_200}
                />
              </S.IconBadge>
              <S.SectionTitle>Falar com o administrador</S.SectionTitle>
            </S.SectionHeader>

            <S.ContactName>{HELP_CENTER_CONTACT.adminName}</S.ContactName>
            <S.PhoneNumber>{HELP_CENTER_CONTACT.phoneDisplay}</S.PhoneNumber>

            <S.ContactActionsRow>
              <S.ContactActionButton
                backgroundColor={theme.colors.ORANGE_200}
                onPress={handleCallAdmin}
                activeOpacity={0.8}
              >
                <Feather name="phone" size={16} color={theme.colors.WHITE} />
                <S.ContactActionLabel>Ligar</S.ContactActionLabel>
              </S.ContactActionButton>

              <S.ContactActionButton
                backgroundColor={theme.colors.GREEN}
                onPress={handleOpenWhatsApp}
                activeOpacity={0.8}
              >
                <Feather
                  name="message-circle"
                  size={16}
                  color={theme.colors.WHITE}
                />
                <S.ContactActionLabel>WhatsApp</S.ContactActionLabel>
              </S.ContactActionButton>

              <S.ContactActionButton
                backgroundColor={theme.colors.BLUE}
                onPress={handleCopyPhoneNumber}
                activeOpacity={0.8}
              >
                <Feather name="copy" size={16} color={theme.colors.WHITE} />
                <S.ContactActionLabel>Copiar</S.ContactActionLabel>
              </S.ContactActionButton>
            </S.ContactActionsRow>
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionHeader>
              <S.IconBadge backgroundColor="rgba(66, 153, 225, 0.15)">
                <Feather name="clock" size={18} color={theme.colors.BLUE} />
              </S.IconBadge>
              <S.SectionTitle>Horário de atendimento</S.SectionTitle>
            </S.SectionHeader>
            <S.HoursText>{HELP_CENTER_BUSINESS_HOURS}</S.HoursText>
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionHeader>
              <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                <Feather
                  name="book-open"
                  size={18}
                  color={theme.colors.ORANGE_200}
                />
              </S.IconBadge>
              <S.SectionTitle>Como usar o app</S.SectionTitle>
            </S.SectionHeader>

            {HELP_CENTER_GUIDE_STEPS.map((guideStep, index) => {
              const isLastStep = index === HELP_CENTER_GUIDE_STEPS.length - 1;

              return (
                <Fragment key={guideStep.stepNumber}>
                  <S.GuideStep>
                    <S.StepNumberBadge>
                      <S.StepNumber>{guideStep.stepNumber}</S.StepNumber>
                    </S.StepNumberBadge>
                    <S.StepTextGroup>
                      <S.StepTitle>{guideStep.title}</S.StepTitle>
                      <S.StepDescription>
                        {guideStep.description}
                      </S.StepDescription>
                    </S.StepTextGroup>
                  </S.GuideStep>
                  {!isLastStep && <S.Divider />}
                </Fragment>
              );
            })}
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionHeader>
              <S.IconBadge backgroundColor="rgba(104, 211, 145, 0.2)">
                <Feather
                  name="help-circle"
                  size={18}
                  color={theme.colors.GREEN}
                />
              </S.IconBadge>
              <S.SectionTitle>Perguntas frequentes</S.SectionTitle>
            </S.SectionHeader>

            {HELP_CENTER_FAQ_ITEMS.map((faqItem, index) => {
              const isLastFaqItem =
                index === HELP_CENTER_FAQ_ITEMS.length - 1;

              return (
                <Fragment key={faqItem.id}>
                  <S.FaqQuestion>{faqItem.question}</S.FaqQuestion>
                  <S.FaqAnswer>{faqItem.answer}</S.FaqAnswer>
                  {!isLastFaqItem && <S.Divider />}
                </Fragment>
              );
            })}
          </S.SectionCard>
        </S.ScrollContainer>
      </S.Container>
    </LinearGradientBackground>
  );
}
