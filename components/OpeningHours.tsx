import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface OpeningHoursProps {
  openingHours: {
    [key: string]: { open: string; close: string }
  }
  style?: object;
}

export function OpeningHours({ openingHours, style }: OpeningHoursProps) {
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = days[new Date().getDay()];
    setCurrentDay(today);
  }, []);

  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  // Group days with the same opening hours
  const groupedHours = () => {
    // Define the order of days for consistent display
    const orderedDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    const groups: { days: string[]; hours: { open: string; close: string } }[] = [];
    let currentGroup: { days: string[]; hours: { open: string; close: string } } | null = null;

    orderedDays.forEach((day) => {
      const hours = openingHours[day];
      
      // If we don't have a current group or the hours don't match, start a new group
      if (!currentGroup || 
          currentGroup.hours.open !== hours.open || 
          currentGroup.hours.close !== hours.close) {
        
        // Add the previous group to our results if it exists
        if (currentGroup) {
          groups.push(currentGroup);
        }
        
        // Start a new group
        currentGroup = {
          days: [day],
          hours
        };
      } else {
        // Add to the current group if hours match
        currentGroup.days.push(day);
      }
    });

    // Add the last group
    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  };

  // Format a group of days (e.g., "Monday - Thursday" or just "Monday")
  const formatDayGroup = (days: string[]) => {
    if (days.length === 1) {
      return formatDay(days[0]);
    }
    
    if (days.length === 2) {
      return `${formatDay(days[0])} & ${formatDay(days[1])}`;
    }
    
    return `${formatDay(days[0])} - ${formatDay(days[days.length - 1])}`;
  };

  // Check if the current day is in a group
  const isCurrentDayInGroup = (days: string[]) => {
    return days.includes(currentDay);
  };

  const groups = groupedHours();

  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardHeader}>
        {/* <View style={styles.titleContainer}>
          <Feather name="clock" size={20} color="#000" style={styles.icon} />
          <Text style={styles.title}>Opening Hours</Text>
        </View> */}
        <Text style={styles.description}>Nous sommes ouverts tous les jours</Text>
      </View>
      <View style={styles.cardContent}>
        {groups.map((group, index) => {
          const isCurrentGroup = isCurrentDayInGroup(group.days);
          return (
            <View 
              key={index}
              style={[
                styles.row,
                isCurrentGroup && styles.currentDayRow
              ]}
            >
              <Text style={[
                styles.dayText,
                isCurrentGroup && styles.currentDayText
              ]}>
                {formatDayGroup(group.days)}
              </Text>
              <Text style={styles.hoursText}>
                {group.hours.open} - {group.hours.close}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 5,
    marginVertical: 8,
    //marginHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    //marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  cardContent: {
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    //marginBottom: 6,
  },
  currentDayRow: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  currentDayText: {
    color: '#4F46E5',
    fontWeight: '500',
  },
  hoursText: {
    fontSize: 14,
    fontWeight: '500',
  },
});