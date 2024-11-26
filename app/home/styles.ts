import styled from "styled-components/native";

export const SafeAreaViewContainer = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    flex: 1;
    background-color: white;
`;

export const Container = styled.View`
    background-color: white;
    width: 325px;
    height: 400px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    gap: 15px;
    elevation: 5;
`;

export const GasButton = styled.Image`
    width: 162px;
    height: 158px;
    position: absolute;
    bottom: -30px;
    right: 15px;
    border: 8px solid #e1e1e1;
    border-radius: 80px;
`;

export const GasButtonText = styled.Text`
  color: white;
  background-color: #ED4200;
  font-weight: bold;
  padding: 8px;
  border-radius: 10px;
  font-size: 20px;
  position: absolute;
  right: 43px;
`;

export const WaterButton = styled.Image`
    width: 160px;
    height: 160px;
    position: absolute;
    bottom: -30px;
    left: 15px;
    border: 8px solid #e1e1e1;;
    border-radius: 80px;
`;

export const WaterButtonText = styled.Text`
  color: white;
  background-color: #ED4200;
  font-weight: bold;
  padding: 8px;
  border-radius: 10px;
  font-size: 20px;
  position: absolute;
  left: 37px;
`;

export const Title = styled.Text`
  color: #DB1A00;
  text-align: center;
  position: absolute;
  bottom: 250px;
  left: 30px;
  font-size: 40px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  color: #DB1A00;
  text-align: center;
  position: absolute;
  bottom: 220px;
  left: 30px;
  font-size: 25px;
`;