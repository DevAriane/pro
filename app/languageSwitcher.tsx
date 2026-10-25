import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const getCurrentValue = () => {
    if (i18n.language === 'en') return '2';
    if (i18n.language === 'de') return '3';
    return '1'; 
  };

  const [value, setValue] = useState(getCurrentValue());

  const data = [
    { label: t('French'), value: '1', lang: 'fr', image: require('../assets/images/FR.png') },
    { label: t('English'), value: '2', lang: 'en', image: require('../assets/images/GB.png') }, 
    { label: t('German'), value: '3', lang: 'de', image: require('../assets/images/DE.png') },
  ];

  const handleLanguageChange = (item: any) => {
    setValue(item.value);
    i18n.changeLanguage(item.lang); 
  };

  const currentImage = data.find(item => item.value === value)?.image;

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={t('selectLanguage')}
        value={value}
        onChange={handleLanguageChange}
        renderLeftIcon={() => 
          currentImage ? <Image source={currentImage} style={styles.selectedImageStyle} /> : null
        }
        renderItem={(item) => (
          <View style={styles.item}>
             <Image source={item.image} style={styles.imageStyle} />
            <Text style={styles.textItem}>{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150, 
  },
  dropdown: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dropdownContainer: {
    borderRadius: 8,
    borderColor: '#E5E7EB',
  },
  selectedImageStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6, 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  imageStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  textItem: {
    fontSize: 14,
    color: '#1F2937',
  },
});