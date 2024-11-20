import { LinearGradientContainerStyle } from './styles';
import { LinearGradientProps } from 'expo-linear-gradient';

type CustomLinearGradientProps = Omit<LinearGradientProps, 'colors'>;

export const LinearGradientContainer = ({children}: CustomLinearGradientProps) => {
 return (
    <LinearGradientContainerStyle
    colors={['#DB1A00', '#ED4200', '#FF6A00']}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 0 }}
    >
    {children}
    </LinearGradientContainerStyle>
)
}