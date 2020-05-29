import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';

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
  const [casesData, setCasesData] = useState({});
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(null);

  const selectedCountry =
    selectedCountryIndex && countryOptions[selectedCountryIndex].name;
  const selectedCountryCode =
    (selectedCountryIndex && countryOptions[selectedCountryIndex].code) || '';

  async function fetchCountryData() {
    const countryData = (await api.get('countries')).data.countries;

    setCountryOptions([
      { name: 'Global', code: '' },
      ...countryData.map(({ name, iso2: code }) => ({ name, code })),
    ]);
  }

  async function fetchNumberOfCases() {
    const requestRoute =
      (selectedCountryCode && `countries/${selectedCountryCode}`) || '';
    const { confirmed, recovered, deaths } = (await api.get(requestRoute)).data;

    setCasesData({
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value,
    });
  }

  useEffect(() => {
    fetchCountryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchNumberOfCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountryIndex]);

  // eslint-disable-next-line react/prop-types
  const FormattedNumber = ({ value, wrapper: Wrapper, style }) => (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator
      renderText={formatted => <Wrapper style={style}>{formatted}</Wrapper>}
    />
  );

  return (
    <Container>
      <Upper>
        <FormattedNumber value={casesData.confirmed} wrapper={ConfirmedCases} />
        <Location>Confirmed cases in {selectedCountry || 'the world'}</Location>
      </Upper>
      <Lower>
        <CasesContainer>
          <Cases>
            <FormattedNumber
              value={casesData.recovered}
              wrapper={CasesNumber}
              style={{ color: recoveredTextColor }}
            />
            <CasesName>Recovered</CasesName>
          </Cases>
          <Cases>
            <FormattedNumber
              value={casesData.deaths}
              wrapper={CasesNumber}
              style={{ color: deathsTextColor }}
            />
            <CasesName>Deaths</CasesName>
          </Cases>
        </CasesContainer>
        <PickerContainer>
          <PickerWrapper>
            <PickerText>Select a country</PickerText>
            <Picker
              style={{ width: '100%', maxWidth: 300, height: 40 }}
              mode="dropdown"
              onValueChange={value => setSelectedCountryIndex(value)}
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
