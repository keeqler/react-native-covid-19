import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import NumberFormat from 'react-number-format';

import { Picker } from '@react-native-community/picker';

import api from '~/services/api';

import {
  confirmedText as confirmedTextColor,
  recoveredText as recoveredTextColor,
  deathsText as deathsTextColor,
  text as textColor,
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
  PickerWrapper,
  PickerText,
} from './styles';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [countryOptions, setCountryOptions] = useState([]);
  const [casesData, setCasesData] = useState({});
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  const chartData = [
    {
      name: 'Infected',
      population: casesData.confirmed - casesData.recovered - casesData.deaths,
      color: confirmedTextColor,
      legendFontColor: textColor,
      legendFontSize: 15,
    },
    {
      name: 'Recovered',
      population: casesData.recovered,
      color: recoveredTextColor,
      legendFontColor: textColor,
      legendFontSize: 15,
    },
    {
      name: 'Deaths',
      population: casesData.deaths,
      color: deathsTextColor,
      legendFontColor: textColor,
      legendFontSize: 15,
    },
  ];

  async function fetchCountryData() {
    const countryData = (await api.get('countries')).data.countries;

    setCountryOptions([
      { name: 'Global', code: '' },
      ...countryData.map(({ name, iso2: code }) => ({ name, code })),
    ]);
  }

  async function fetchNumberOfCases(countryCode) {
    const { confirmed, recovered, deaths } = (
      await api.get(countryCode ? `countries/${countryCode}` : '')
    ).data;

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
    (async () => {
      await fetchNumberOfCases(selectedCountryCode);

      setLoading(false);
    })();
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
        <Location>
          Confirmed cases in{' '}
          {(!selectedCountryIndex && 'the world') || selectedCountry}
        </Location>
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
        {!loading && (
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
          />
        )}
        <PickerWrapper>
          <PickerText>Select a country</PickerText>
          <Picker
            style={{ width: '100%', maxWidth: 300, height: 40 }}
            mode="dropdown"
            onValueChange={index => {
              setSelectedCountryIndex(index);
              setSelectedCountry(countryOptions[index].name);
              setSelectedCountryCode(countryOptions[index].code);
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
      </Lower>
    </Container>
  );
}
