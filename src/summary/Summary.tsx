import React, { useContext, useState } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { SummaryAllTab } from './SummaryAllTab';
import { useWindowDimensions } from 'react-native';
import { SummaryYearTab } from './SummaryYearTab';
import { ThemeContext } from '../theme';

const renderScene = SceneMap({
  all: SummaryAllTab,
  year: SummaryYearTab,
  // month: SummaryMonthTab, // coming later
});

export function Summary() {
  const { theme } = useContext(ThemeContext);
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const routes = [
    // { key: 'month', title: 'Month' },
    { key: 'year', title: 'Year' },
    { key: 'all', title: 'All' },
  ];

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={{ backgroundColor: theme.colors.card }}
      labelStyle={{ color: theme.colors.text }}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      pressOpacity={0.5}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}
