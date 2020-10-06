import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

import JournalItemRow from "./JournalItemRow";

export default class JournalItems extends React.Component {
  render() {
    if (this.props.items.length === 0)
      return (
        <View style={styles.noItems}>
          <Text style={styles.infoText}>No entries</Text>
        </View>
      );

    return (
      <SectionList
        bounces={false}
        style={styles.list}
        sections={this.props.items}
        renderItem={({ item }) => (
          <JournalItemRow
            item={item}
            deleteItem={() => this.props.deleteItem(item)}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.listHeader}>{section.title}</Text>
        )}
        keyExtractor={(item) => item.date}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 24,
  },
  listHeader: {
    backgroundColor: "#424242",
    color: "white",
    textAlign: "center",
    borderColor: "aqua",
    borderRadius: 2,
    borderWidth: 1,
    height: 30,
    padding: 5,
  },
  noItems: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: "aquamarine",
    fontSize: 22,
    fontWeight: "300",
  },
  listSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "gray",
    color: "black",
  },
  journalText: {
    backgroundColor: "black",
    color: "lightgray",
  },
});
