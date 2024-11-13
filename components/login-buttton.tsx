import * as S from '../app/login/styles'
import { LinearGradientProps } from 'expo-linear-gradient';

type CustomLinearGradientProps = Omit<LinearGradientProps, 'colors'>;

export const LoginButton = ({children}: CustomLinearGradientProps) => {
 return (
    <S.LoginButton
    colors={['#DB1A00', '#ED4200', '#FF6A00']}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 0 }}
    >
    {children}
    </S.LoginButton>
)
}