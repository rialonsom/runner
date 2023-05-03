import React, { useState } from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import { SummaryAllTab } from './SummaryAllTab';
import { useWindowDimensions } from 'react-native';
import { SummaryYearTab } from './SummaryYearTab';

const renderScene = SceneMap({
  all: SummaryAllTab,
  year: SummaryYearTab,
  // month: SummaryMonthTab, // coming later
});

export function Summary() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const routes = [
    // { key: 'month', title: 'Month' },
    { key: 'year', title: 'Year' },
    { key: 'all', title: 'All' },
  ];

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
