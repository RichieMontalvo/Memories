import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';



import JournalItems from '../../js/components/JournalItems';
import JournalItemInput from '../../js/components/JournalItemInput';



import Store from '../../js/Store';

export default class Appscreen extends Component {
  state = { items: [] };

  componentWillMount() {
    this._refreshItems();
  }

  _refreshItems = async () => {
    const items = await Store.loadItems();
    this.setState({ items });
  };

  _getSectionTitleFromDate(date) {
    const dateObj = new Date();
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
  
    const n = weekday[dateObj.getDay()];
    return `${n} ${day}.${month}.${year}`;
  }

  _getItemsWithSections(items) {
    if (items.length === 0) return [];

    // Datenstruktur fÃ¼r Sections mit Eintrag initialisieren
    let sectionTitle = this._getSectionTitleFromDate(items[0].date);
    let sections = [{ data: [], title: sectionTitle }];
    items.forEach(item => {
      sectionTitle = this._getSectionTitleFromDate(item.date);
      let lastSection = sections[sections.length - 1];

      // trage item in section data ein, falls item am gleichen Tag
      if (lastSection.title == sectionTitle) {
        lastSection.data.push(item);
      } else {
        // neue Section anhÃ¤ngen, falls item an anderem Tag
        sections.push({ data: [item], title: sectionTitle });
      }
    });
    return sections;
  }

  _addItem(text, photo) {
    let { items } = this.state;
    // Neuen Eintrag am Anfang der Liste eintragen und speichern
    const newItem = { text, photo, date: Date.now() };
    items = [newItem, ...items];
    this.setState({ items: items });
    Store.saveItems(items);
  }

  _deleteItem(item) {
    let { items } = this.state;
    const index = items.findIndex(i => i.date === item.date);
    // Eintrag aus Liste entfernen
    items.splice(index, 1);
    this.setState({ items: items });
    Store.saveItems(items);
  }

  render() {
      
    const sections = this._getItemsWithSections(this.state.items);
    return (
    
      <View style={styles.container}>
         
        <JournalItems items={sections} 
        deleteItem={(item)=> this._deleteItem(item)}/>
       
        <JournalItemInput
          onSubmit={(text, photo) => this._addItem(text, photo)}
          refresh={() => this.setState({ items: [] })}
          deleteItem={(item)=> this._deleteItem(item)}
        />
      </View>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor: '#262626', 
    color:'white'
  }
});
