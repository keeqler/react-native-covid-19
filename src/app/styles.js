import styled from 'styled-components/native';

import { confirmedText, confirmedBackground, text, background } from '~/colors';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background: ${confirmedBackground};
`;

export const Upper = styled.View`
  width: 100%;
  height: 160px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ConfirmedCases = styled.Text`
  font-size: 56px;
  font-weight: 700;
  color: ${confirmedText};
`;

export const Location = styled.Text`
  margin-right: 6px;
  font-size: 20px;
  font-weight: 700;
  color: ${text};
`;

export const Lower = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  background: ${background};
`;

export const CasesContainer = styled.View`
  width: 260px;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Cases = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const CasesNumber = styled.Text`
  font-size: 28px;
  font-weight: 700;
`;

export const CasesName = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${text};
`;

export const PickerWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const PickerText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${text};
`;
