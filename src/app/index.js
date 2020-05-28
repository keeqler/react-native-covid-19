import React, { useState, useEffect } from 'react';

import { Picker } from '@react-native-community/picker';

import api from '~/services/api';

import {
  recoveredText as recoveredTextColor,
  deathsText as deathsTextColor,
} from '~/colors';

import {
  Container,
  Upper,
  ConfirmedCases,
  Location,
  Rank,
  Lower,
  CasesContainer,
  Cases,
  CasesNumber,
  CasesName,
  PickerContainer,
  PickerWrapper,
  PickerText,
} from './styles';

export default function App() {
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);

  const selectedCountryName = selectedCountryIndex
    ? countryOptions[selectedCountryIndex].name
    : null;

  async function fetchCountryData() {
    const countryData = (await api.get('countries')).data.countries;

    setCountryOptions([
      { name: 'Global', code: '' },
      ...countryData.map(({ name, iso2: code }) => ({ name, code })),
    ]);
  }

  // async function fetchConfirmedCases() {}

  // async function fetchRecoveredCases() {}

  // async function fetchFatalCases() {}

  useEffect(() => {
    fetchCountryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Upper>
        <ConfirmedCases>123,123</ConfirmedCases>
        <Location>
          Confirmed cases in {selectedCountryName || 'the world'}
        </Location>
        {selectedCountryIndex ? <Rank>Global rank: 2</Rank> : null}
      </Upper>
      <Lower>
        <CasesContainer>
          <Cases>
            <CasesNumber style={{ color: recoveredTextColor }}>
              60,512
            </CasesNumber>
            <CasesName>Recovered</CasesName>
          </Cases>
          <Cases>
            <CasesNumber style={{ color: deathsTextColor }}>10,124</CasesNumber>
            <CasesName>Deaths</CasesName>
          </Cases>
        </CasesContainer>
        <PickerContainer>
          <PickerWrapper>
            <PickerText>Select a country</PickerText>
            <Picker
              style={{ width: '100%', maxWidth: 300, height: 40 }}
              mode="dropdown"
              onValueChange={value => {
                setSelectedCountryIndex(value);
              }}
              selectedValue={selectedCountryIndex}
            >
              {countryOptions.map(({ name }, index) => (
                <Picker.Item
                  key={Math.random().toString()}
                  label={name}
                  value={index}
                />
              ))}
            </Picker>
          </PickerWrapper>
        </PickerContainer>
      </Lower>
    </Container>
  );
}
